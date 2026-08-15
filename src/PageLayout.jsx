export default function PageLayout({
  title,
  accent,
  description,
  action,
  children,
  contentClassName,
}) {
  return (
    <>
      <header className="cta-container">
        <h2 className="cta-heading">
          {title} <span className="cta-heading-accent">{accent}</span>
        </h2>
        <p className="cta-text">{description}</p>
        {action}
      </header>

      <main className={contentClassName}>{children}</main>
    </>
  );
}