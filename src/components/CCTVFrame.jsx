import { useState, useEffect } from "react";
import cornerSvg from "../assets/images/Corner.svg";

export default function CCTVFrame({ children }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 33);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    const hh = date.getHours().toString().padStart(2, "0");
    const mm = date.getMinutes().toString().padStart(2, "0");
    const ss = date.getSeconds().toString().padStart(2, "0");

    return `${hh}:${mm}:${ss}`;
  };


  return (
    <div className="relative w-full  bg-black/50">

      {/* --- FRAME CORNERS --- */}
      <img src={cornerSvg} alt="" className="corner left-0 top-0" />
      <img
        src={cornerSvg}
        alt=""
        className="corner left-0 bottom-0 -rotate-90"
      />
      <img
        src={cornerSvg}
        alt=""
        className="corner right-0 top-0 rotate-90"
      />
      <img
        src={cornerSvg}
        alt=""
        className="corner right-0 bottom-0 -rotate-180"
      />

      <div className="cctvFrame">
        {/* --- VIDEO CONTENT --- */}
        <div className="relative w-auto h-auto ">{children}</div>

        {/* --- LIVE TIME HUD --- */}
        <div className="liveTime ">
          {formatTime(time)}
        </div>
      </div>
    </div>
  );
}
