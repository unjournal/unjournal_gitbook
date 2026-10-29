export function installHashNavigation() {
  let frame = 0;
  let nestedFrame = 0;
  let timer = 0;

  const jumpToElement = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const priorScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    const headerHeight = document.querySelector(".topbar")?.getBoundingClientRect().height ?? 0;
    const margin = Number.parseFloat(window.getComputedStyle(element).scrollMarginTop) || 0;
    const offset = Math.max(margin, headerHeight + 16);
    window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top - offset, behavior: "auto" });
    document.documentElement.style.scrollBehavior = priorScrollBehavior;
  };

  const scrollToHash = () => {
    if (!window.location.hash) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    window.cancelAnimationFrame(frame);
    window.cancelAnimationFrame(nestedFrame);
    window.clearTimeout(timer);

    frame = window.requestAnimationFrame(() => {
      nestedFrame = window.requestAnimationFrame(() => {
        jumpToElement(id);
      });
    });

    // Chromium can restore its previous scroll position after a client-rendered
    // page mounts. Reapply once after that restoration window.
    timer = window.setTimeout(() => {
      jumpToElement(id);
    }, 150);
  };

  scrollToHash();
  window.addEventListener("hashchange", scrollToHash);
  window.addEventListener("load", scrollToHash, { once: true });

  return () => {
    window.removeEventListener("hashchange", scrollToHash);
    window.removeEventListener("load", scrollToHash);
    window.cancelAnimationFrame(frame);
    window.cancelAnimationFrame(nestedFrame);
    window.clearTimeout(timer);
  };
}
