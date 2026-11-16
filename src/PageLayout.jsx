export default function PageLayout({
  title,
  accent,
  description,
  action,
  children,
  contentClassName = "scroll-panel",
}) {
  return (
    <>
      <header className="cta-container">
        <h1 className="cta-heading anim-rise">
          {title} <span className="cta-heading-accent">{accent}</span>
        </h1>
        <div className="cta-rule anim-fade" style={{ "--delay": "120ms" }} aria-hidden="true" />
        <p className="cta-text anim-rise" style={{ "--delay": "170ms" }}>
          {description}
        </p>
        {action && (
          <div className="anim-rise flex" style={{ "--delay": "260ms" }}>
            {action}
          </div>
        )}
      </header>

      <main className={`${contentClassName} anim-rise`} style={{ "--delay": "200ms" }}>
        {children}
      </main>
    </>
  );
}
