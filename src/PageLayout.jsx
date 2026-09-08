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
        <h1 className="cta-heading">
          {title} <span className="cta-heading-accent">{accent}</span>
        </h1>
        <p className="cta-text">{description}</p>
        {action}
      </header>

      <main className={contentClassName}>{children}</main>
    </>
  );
}