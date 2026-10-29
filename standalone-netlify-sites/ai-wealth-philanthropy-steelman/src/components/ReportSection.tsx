import type { ReactNode } from "react";

export function ReportSection({
  eyebrow,
  title,
  children
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="report-section">
      <p className="kicker">{eyebrow}</p>
      <h2>{title}</h2>
      <div className="prose">{children}</div>
    </article>
  );
}
