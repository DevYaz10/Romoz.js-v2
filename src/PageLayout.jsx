export default function PageLayout({ wText, gText, paragraph, button, children, classes }) {
    return (
      <>
        <div className="cta-container">
          <h2 className="cta-heading">
            {wText} <span className="text-green-500">{gText}</span>
          </h2>
          <p className="cta-text">
            {paragraph}
          </p>
          
          {button && button} 
        </div>
  
        <div className={classes}>
          {children}
        </div>
      </>
    );
  }