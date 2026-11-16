import { NavLink, useLocation } from "react-router";

export default function NavItem({ text, to, onHover }) {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <NavLink
      to={to}
      prefetch="intent"
      onMouseEnter={onHover}
      onFocus={onHover}
      className="menu-item"
      data-active={isActive ? "true" : "false"}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="menu-box">
        <span className="menu-text">
          <span className="menu-arrow" aria-hidden="true">
            {">"}
          </span>
          {text}
        </span>
      </span>
    </NavLink>
  );
}
