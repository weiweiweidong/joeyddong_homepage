import { test } from "node:test";
import assert from "node:assert/strict";
import {
  acceptsNookMessage,
  createNookBridge,
  nookEmbedUrl,
  nookLocaleFromPath,
  nookLocaleUrl,
} from "../src/lib/nook-protocol.ts";
const origin = "https://joeyddong.top";
const frame = {};
const event = (data, overrides = {}) => ({
  origin,
  source: frame,
  data,
  ...overrides,
});
const message = (type = "nook:ready", locale = "zh", version = 1) => ({
  type,
  locale,
  version,
});

function setup() {
  const sends = [],
    applied = [];
  let ready = 0;
  const bridge = createNookBridge({
    origin,
    source: () => frame,
    initialLocale: "zh",
    send: (data, destination) => sends.push({ data, destination }),
    onReady: () => ready++,
    onApplied: (locale) => applied.push(locale),
  });
  return { bridge, sends, applied, ready: () => ready };
}

test("accepts only same-origin current iframe, v1, supported locale and known reply type", () => {
  assert.equal(acceptsNookMessage(event(message()), frame, origin), true);
  for (const data of [
    null,
    "ready",
    [],
    message("other"),
    message("nook:ready", "fr"),
    message("nook:ready", "zh", 2),
    message("nook:ready", "en", "1"),
  ]) {
    assert.equal(acceptsNookMessage(event(data), frame, origin), false);
  }
  assert.equal(
    acceptsNookMessage(
      event(message(), { origin: "https://evil.example" }),
      frame,
      origin,
    ),
    false,
  );
  assert.equal(
    acceptsNookMessage(event(message(), { source: {} }), frame, origin),
    false,
  );
  assert.equal(
    acceptsNookMessage(event(message(), { source: null }), null, origin),
    false,
  );
  assert.equal(
    acceptsNookMessage(event(message(), { origin: "null" }), frame, "null"),
    false,
  );
});

test("queues only the latest locale until ready and sends to the explicit origin", () => {
  const s = setup();
  s.bridge.setLocale("en");
  s.bridge.setLocale("ja");
  assert.equal(s.sends.length, 0);
  s.bridge.receive(event(message()));
  assert.equal(s.ready(), 1);
  assert.deepEqual(s.sends, [
    { data: message("nook:set-locale", "ja"), destination: origin },
  ]);
});

test("rapid updates ignore stale acknowledgements and illegal messages", () => {
  const s = setup();
  s.bridge.receive(event(message("nook:locale-changed")));
  assert.equal(s.applied.length, 0);
  s.bridge.receive(event(message(), { source: {} }));
  assert.equal(s.ready(), 0);
  s.bridge.receive(event(message()));
  s.bridge.setLocale("en");
  s.bridge.setLocale("ja");
  s.bridge.receive(event(message("nook:locale-changed", "en")));
  s.bridge.receive(event(message("nook:locale-changed", "ja", 2)));
  assert.equal(s.applied.length, 0);
  s.bridge.receive(event(message("nook:locale-changed", "ja")));
  assert.deepEqual(s.applied, ["ja"]);
});

test("retry resets readiness, preserves latest locale and waits for new ready", () => {
  const s = setup();
  s.bridge.receive(event(message()));
  s.bridge.reset();
  s.bridge.setLocale("en");
  assert.equal(s.sends.length, 1);
  s.bridge.receive(event(message("nook:locale-changed", "en")));
  assert.equal(s.applied.length, 0);
  s.bridge.receive(event(message("nook:ready", "en")));
  assert.equal(s.sends.at(-1).data.locale, "en");
});

test("localized history URLs preserve other query parameters and the hash", () => {
  for (const locale of ["en", "zh", "ja"]) {
    const url = nookLocaleUrl(
      origin + "/zh/projects/nook/?lang=zh&ref=portfolio#demo",
      locale,
    );
    assert.equal(nookLocaleFromPath(url.pathname), locale);
    assert.equal(url.searchParams.get("lang"), locale);
    assert.equal(url.searchParams.get("ref"), "portfolio");
    assert.equal(url.hash, "#demo");
    assert.equal(url.origin, origin);
  }
  assert.equal(nookLocaleFromPath("/projects/"), undefined);
  assert.equal(nookLocaleFromPath("/en/projects/nook/"), undefined);
});

// Astro dev serves public files directly but does not resolve directory index pages.
test("iframe initialization and retry use an explicit HTML entry in dev and production", () => {
  for (const locale of ["zh", "en", "ja"]) {
    for (const source of ["/demos/nook/", "/demos/nook/index.html"]) {
      const url = nookEmbedUrl(source, locale, origin);
      assert.equal(url.origin, origin);
      assert.equal(url.pathname, "/demos/nook/index.html");
      assert.equal(url.searchParams.get("embed"), "1");
      assert.equal(url.searchParams.get("lang"), locale);
    }
  }
  const retry = nookEmbedUrl("/demos/nook/?embed=0&lang=en&ref=test", "ja", origin);
  assert.equal(retry.pathname, "/demos/nook/index.html");
  assert.equal(retry.searchParams.get("embed"), "1");
  assert.equal(retry.searchParams.get("lang"), "ja");
  assert.equal(retry.searchParams.get("ref"), "test");
});
