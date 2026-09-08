import { useState, useEffect } from "react";
import { FrameCorners } from "./CornerMarks";

const formatTime = (date) =>
  [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");

export default function CCTVFrame({ children }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cctv-frame-wrapper">
      <FrameCorners />
      <div className="cctv-frame">
        <div className="cctv-content">{children}</div>
        <time className="live-time" dateTime={time.toISOString()}>{formatTime(time)}</time>
      </div>
    </div>
  );
}