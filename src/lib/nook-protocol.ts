import { pagePath, type Locale } from "./i18n.ts";

export interface NookHostMessage {
  type: "nook:set-locale";
  version: 1;
  locale: Locale;
}
export interface NookMessage {
  type: "nook:ready" | "nook:locale-changed";
  version: 1;
  locale: Locale;
}
export function isNookLocale(value: unknown): value is Locale {
  return value === "zh" || value === "en" || value === "ja";
}
export function acceptsNookMessage(
  event: { origin: string; source: unknown; data: unknown },
  source: unknown,
  origin: string,
): event is { origin: string; source: unknown; data: NookMessage } {
  if (
    origin === "null" ||
    !source ||
    event.origin !== origin ||
    event.source !== source
  )
    return false;
  if (!event.data || typeof event.data !== "object") return false;
  const data = event.data as Partial<NookMessage>;
  return (
    data.version === 1 &&
    isNookLocale(data.locale) &&
    (data.type === "nook:ready" || data.type === "nook:locale-changed")
  );
}
export function nookLocaleFromPath(path: string): Locale | undefined {
  return path === pagePath("en", "projects/nook")
    ? "en"
    : path === pagePath("zh", "projects/nook")
      ? "zh"
      : path === pagePath("ja", "projects/nook")
        ? "ja"
        : undefined;
}
export function nookLocaleUrl(href: string, locale: Locale): URL {
  const url = new URL(href);
  url.pathname = pagePath(locale, "projects/nook");
  url.searchParams.set("lang", locale);
  return url;
}

// Use the file explicitly: Astro dev does not resolve public directory indexes.
export function nookEmbedUrl(source: string, locale: Locale, origin: string): URL {
  const url = new URL(source, origin);
  if (url.pathname.endsWith("/")) url.pathname += "index.html";
  url.searchParams.set("embed", "1");
  url.searchParams.set("lang", locale);
  return url;
}

// This state machine knows only the public wire protocol, not iframe DOM or Angular.
export function createNookBridge(options: {
  origin: string;
  source: () => unknown;
  initialLocale: Locale;
  send: (message: NookHostMessage, origin: string) => void;
  onReady: () => void;
  onApplied: (locale: Locale) => void;
}) {
  let desired = options.initialLocale;
  let ready = false;
  const send = () => {
    if (ready)
      options.send(
        { type: "nook:set-locale", version: 1, locale: desired },
        options.origin,
      );
  };
  return {
    setLocale(locale: Locale) {
      desired = locale;
      send();
    },
    reset() {
      ready = false;
    },
    receive(event: { origin: string; source: unknown; data: unknown }) {
      if (!acceptsNookMessage(event, options.source(), options.origin)) return;
      if (event.data.type === "nook:ready") {
        ready = true;
        options.onReady();
        send();
      } else if (ready && event.data.locale === desired) {
        options.onApplied(event.data.locale);
      }
    },
  };
}
