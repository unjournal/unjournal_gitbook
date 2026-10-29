import { useEffect, useRef } from "react";

export type NavigationLink = { label: string; href: string };
export type NavigationGroup = { label: string; links: NavigationLink[] };

const relatedModels: NavigationLink[] = [
  { label: "AIS/EA funding", href: "/" },
  { label: "Global health & development", href: "/global-development/" },
  { label: "Animal welfare funding", href: "/animal-welfare/" },
  { label: "Compare other models", href: "/model-comparison/" }
];

export function SiteNavigation({ brand, home, groups }: {
  brand: string;
  home: string;
  groups: NavigationGroup[];
}) {
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    const close = () => nav.current?.querySelectorAll("details[open]").forEach((item) => item.removeAttribute("open"));
    const outside = (event: PointerEvent) => {
      if (!nav.current?.contains(event.target as Node)) close();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const active = document.activeElement?.closest("details");
      close();
      active?.querySelector("summary")?.focus();
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  return (
    <header className="topbar grouped-topbar">
      <a className="brand" href={home}>{brand}</a>
      <nav ref={nav} className="grouped-nav" aria-label="Report navigation">
        <a href="#news">News</a>
        <a href="#tracker">Tracker</a>
        {[...groups, { label: "Other models", links: relatedModels }].map((group) => (
          <details className="nav-dropdown" key={group.label} onToggle={(event) => {
            if (!event.currentTarget.open) return;
            nav.current?.querySelectorAll("details[open]").forEach((item) => {
              if (item !== event.currentTarget) item.removeAttribute("open");
            });
          }}>
            <summary>{group.label}</summary>
            <div className="nav-dropdown__panel">
              {group.links.map((link) => (
                <a key={link.href} href={link.href} onClick={(event) => {
                  const disclosure = event.currentTarget.closest("details");
                  disclosure?.removeAttribute("open");
                }}>{link.label}</a>
              ))}
            </div>
          </details>
        ))}
        <a href="#sources">Sources</a>
      </nav>
    </header>
  );
}
