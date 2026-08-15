import { Link } from "react-router";
import { FrameCorners } from "./CornerMarks";

export default function MenuItem({ text, onMouseEnter, to }) {
  return (
    <Link
      to={to}
      className="menu-item"
      onMouseEnter={onMouseEnter}
      prefetch="intent"
    >
      <FrameCorners hoverOnly />
      <div className="menu-hover-box">
        <div className="menu-text">
          <span className="menu-arrow">{">"}</span>
          {text}
        </div>
      </div>
    </Link>
  );
}