import { Link } from "react-router";
import { FrameCorners } from "./CornerMarks";

export default function MenuItem({ text, onMouseEnter, to }) {
  return (
    <li>
      <Link
        to={to}
        className="menu-item"
        onMouseEnter={onMouseEnter}
        prefetch="intent"
      >
        <FrameCorners hoverOnly />
        <div className="menu-hover-box">
          <span className="menu-text">
            <span className="menu-arrow" aria-hidden="true">{">"}</span>
            {text}
          </span>
        </div>
      </Link>
    </li>
  );
}