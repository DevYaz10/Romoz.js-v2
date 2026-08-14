import { Link } from "react-router";
import cornerSvg from "../assets/images/Corner.svg";

export default function MenuItem({ text, onMouseEnter, to }) {
  return (
    <Link
      to={to}
      className="group relative flex flex-col h-full w-full"
      onMouseEnter={onMouseEnter}
      prefetch="intent"
    >
      <img src={cornerSvg} className="corner hidden group-hover:block left-0 top-0" />
      <img src={cornerSvg} className="corner hidden group-hover:block left-0 bottom-0 -rotate-90" />
      <img src={cornerSvg} className="corner hidden group-hover:block right-0 top-0 rotate-90" />
      <img src={cornerSvg} className="corner hidden group-hover:block right-0 bottom-0 -rotate-180" />

      <div className="menuHoverBox">
        <div className="menuTextContainer">
          <span className="menuArrow">{">"}</span>
          {text}
        </div>
      </div>
    </Link>
  );
}