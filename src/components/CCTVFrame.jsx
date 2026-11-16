import { useEffect, useState } from "react";
import { FrameCorners } from "./CornerMarks";

const formatTime = (date) =>
  [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");

export default function CCTVFrame({ children }) {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const tick = () => setTime(new Date());
    const interval = setInterval(tick, 1000);
    document.addEventListener("visibilitychange", tick);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);

  return (
    <div className="cctv-frame-wrapper">
      <FrameCorners />
      <div className="cctv-frame">
        <div className="cctv-content">
          {children}
          <span className="cctv-sweep" aria-hidden="true" />
        </div>
        <time className="live-time" dateTime={time.toISOString()}>
          <span className="live-dot" aria-hidden="true" />
          {formatTime(time)}
        </time>
      </div>
    </div>
  );
}
