import cornerSvg from "../assets/images/Corner.svg";

const positions = ["top-left", "bottom-left", "top-right", "bottom-right"];

export function FrameCorners() {
  return positions.map((position) => (
    <img
      key={position}
      src={cornerSvg}
      alt=""
      aria-hidden="true"
      draggable="false"
      className={`frame-corner frame-corner--${position}`}
    />
  ));
}
