import cornerSvg from "../assets/images/Corner.svg";

const cornerPositions = ["top-left", "bottom-left", "top-right", "bottom-right"];

export function FrameCorners({ hoverOnly = false }) {
  return cornerPositions.map((position) => (
    <img
      key={position}
      src={cornerSvg}
      alt=""
      className={`frame-corner frame-corner--${position}${hoverOnly ? " frame-corner--hover" : ""}`}
    />
  ));
}

export function PanelCorners() {
  return (
    <>
      <span className="panel-corner panel-corner--top-left" />
      <span className="panel-corner panel-corner--bottom-right" />
    </>
  );
}