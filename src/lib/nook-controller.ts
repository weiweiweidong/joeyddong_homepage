import {
  htmlLanguages,
  languageNames,
  messages,
  pagePath,
  type Locale,
} from "./i18n";
import { rememberLocale } from "./locale-preference";
import { nookCopy, type NookCopy } from "./nook-copy";
import { projects } from "./projects";
import { navigation, site } from "./site";
import {
  createNookBridge,
  isNookLocale,
  nookEmbedUrl,
  nookLocaleFromPath,
  nookLocaleUrl,
} from "./nook-protocol";

export function initNookPage() {
  const root = document.querySelector<HTMLElement>("[data-nook-page]");
  const frame = root?.querySelector<HTMLIFrameElement>("#nook-demo");
  if (!root || !frame || root.dataset.initialized) return;
  root.dataset.initialized = "true";
  let locale: Locale = isNookLocale(root.dataset.locale)
    ? root.dataset.locale
    : "en";
  let phase: "loading" | "failed" | "ready" = "loading";
  let timeout: ReturnType<typeof setTimeout>;
  const overlay = root.querySelector<HTMLElement>("[data-nook-status]")!;
  const statusText = root.querySelector<HTMLElement>(
    "[data-nook-status-text]",
  )!;
  const retry = root.querySelector<HTMLButtonElement>("[data-nook-retry]")!;
  const workbench = root.querySelector<HTMLElement>("[data-nook-workbench]")!;
  const text = (selector: string, value: string) =>
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      el.textContent = value;
    });
  const attr = (selector: string, name: string, value: string) =>
    document
      .querySelectorAll(selector)
      .forEach((el) => el.setAttribute(name, value));
  const renderStatus = () => {
    overlay.hidden = phase === "ready";
    retry.hidden = phase !== "failed";
    statusText.textContent =
      phase === "failed" ? nookCopy[locale].failed : nookCopy[locale].loading;
    retry.textContent = nookCopy[locale].retry;
    workbench.setAttribute("aria-busy", String(phase === "loading"));
  };
  const bridge = createNookBridge({
    origin: location.origin,
    initialLocale: locale,
    source: () => frame.contentWindow,
    send: (message, origin) =>
      frame.contentWindow?.postMessage(message, origin),
    onReady: () => {
      clearTimeout(timeout);
      phase = "ready";
      renderStatus();
      root.dataset.ready = "true";
    },
    onApplied: (value) => {
      root.dataset.appliedLocale = value;
    },
  });
  const applyLocale = (value: Locale, push: boolean) => {
    if (push && value !== locale)
      history.pushState(history.state, "", nookLocaleUrl(location.href, value));
    locale = value;
    root.dataset.locale = value;
    const copy = nookCopy[value];
    root.querySelectorAll<HTMLElement>("[data-nook-copy]").forEach((el) => {
      const key = el.dataset.nookCopy as keyof NookCopy;
      if (key in copy) el.textContent = copy[key];
    });
    text("[data-nook-back-label]", projects[value].backToProjects);
    attr("[data-nook-back]", "href", pagePath(value, "projects"));
    attr(".nook-tags", "aria-label", projects[value].tagsLabel);
    frame.title = copy.frameTitle;
    workbench.setAttribute("aria-label", copy.frameTitle);
    const html = document.documentElement;
    html.lang = htmlLanguages[value];
    html.dataset.locale = value;
    document.title = `${copy.name} — ${site.name}`;
    attr('meta[name="description"]', "content", copy.description);
    attr(
      'link[rel="canonical"]',
      "href",
      new URL(pagePath(value, "projects/nook"), site.url).href,
    );
    text("[data-site-skip]", messages[value].skip);
    attr("[data-site-home]", "href", pagePath(value));
    attr(
      "[data-site-home]",
      "aria-label",
      `${site.name} — ${messages[value].navigation.home}`,
    );
    attr("[data-site-nav]", "aria-label", messages[value].mainNavigation);
    for (const item of navigation(value)) {
      const selector = `[data-site-nav-item="${item.key}"]`;
      text(selector, messages[value].navigation[item.key]);
      attr(selector, "href", item.href);
    }
    text("[data-site-menu-label]", messages[value].menu);
    attr("[data-site-menu]", "aria-label", messages[value].menu);
    text("[data-site-footer-note]", messages[value].footer.note);
    text("[data-site-footer-top]", `${messages[value].footer.top} ↑`);
    text("[data-language-current]", languageNames[value]);
    const optionNames = { en: "English", zh: "中文", ja: "日本語" };
    attr(
      ".language-toggle",
      "aria-label",
      `${messages[value].chooseLanguage}: ${optionNames[value]}`,
    );
    attr(".language-options", "aria-label", messages[value].chooseLanguage);
    document
      .querySelectorAll<HTMLAnchorElement>("[data-language]")
      .forEach((link) => {
        const language = link.dataset.language;
        if (!isNookLocale(language)) return;
        link.href = `${pagePath(language, "projects/nook")}?lang=${language}`;
        if (language === value) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
        const check = link.querySelector("[data-language-check]");
        if (check) check.textContent = language === value ? "✓" : "";
      });
    renderStatus();
    rememberLocale(value);
    bridge.setLocale(value);
  };
  const receive = (event: MessageEvent) => bridge.receive(event);
  window.addEventListener("message", receive);
  document.addEventListener("site:locale-request", ((
    event: CustomEvent<{ locale: unknown }>,
  ) => {
    if (isNookLocale(event.detail?.locale))
      applyLocale(event.detail.locale, true);
  }) as EventListener);
  window.addEventListener("popstate", () => {
    const value = nookLocaleFromPath(location.pathname);
    if (value) applyLocale(value, false);
  });
  const load = () => {
    clearTimeout(timeout);
    bridge.reset();
    phase = "loading";
    delete root.dataset.ready;
    delete root.dataset.appliedLocale;
    renderStatus();
    const url = nookEmbedUrl(frame.dataset.src!, locale, location.origin);
    timeout = setTimeout(() => {
      phase = "failed";
      renderStatus();
    }, 15_000);
    frame.src = url.href;
  };
  retry.addEventListener("click", load);
  applyLocale(locale, false);
  document.documentElement.dataset.nookLocaleReady = "true";
  load();
}
