import { Link } from "react-router";

export default function CommandButton({ children, to, className = "", ...props }) {
  const Component = to ? Link : "button";
  const componentProps = to ? { to, prefetch: "intent" } : { type: "button" };

  return (
    <Component
      {...componentProps}
      {...props}
      className={`command-button ${className}`.trim()}
    >
      {children}
    </Component>
  );
}