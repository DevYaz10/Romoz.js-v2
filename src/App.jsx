import { useState } from "react";
import { Link, Outlet } from "react-router";
import NavItem from "./components/NavItem";
import logoIcon from "./assets/images/Logo.png";
import logoText from "./assets/images/Title4.webp";
import WCorner from "./assets/images/Wallpaper Corner.svg";
import radarVideo from "./assets/videos/Radar video edited2.webm";

import fountainVideo from "./assets/videos/CCTV/CCTV Footage - Jeddah Fountain.webm";
import towerVideo from "./assets/videos/CCTV/CCTV Footage - Jeddah Headquarters Tower.webm";
import globeVideo from "./assets/videos/CCTV/CCTV Footage - Globe Roundabout.webm";
import cornicheVideo from "./assets/videos/CCTV/CCTV Footage - Corniche.webm";
import flagVideo from "./assets/videos/CCTV/CCTV Footage - Jeddah's Big flag.webm";

const wallpaperCorners = ["top-left", "bottom-left", "top-right", "bottom-right"];

const menuItems = [
  { text: "About", to: "/about", video: fountainVideo },
  { text: "Featured Project", to: "/featured-projects", video: towerVideo },
  { text: "Contributions & Experiences", to: "/contributions", video: globeVideo },
  { text: "Contacts", to: "/contacts", video: cornicheVideo },
  { text: "Services", to: "/services", video: flagVideo },
];

export default function App() {
  const [activeVideo, setActiveVideo] = useState(fountainVideo);

  return (
    <div className="app-wrapper">
      {/* atmospheric layers */}
      <div className="hud-layer hud-layer--vignette" aria-hidden="true" />
      <div className="hud-layer hud-layer--grid" aria-hidden="true" />
      <div className="hud-layer hud-layer--scanlines" aria-hidden="true" />

      {wallpaperCorners.map((position) => (
        <img
          key={position}
          src={WCorner}
          alt=""
          aria-hidden="true"
          draggable="false"
          className={`wallpaper-corner wallpaper-corner--${position}`}
        />
      ))}

      <header className="app-header">
        <Link to="/" className="logo-container" aria-label="Romoz.JS Home">
          <img src={logoIcon} alt="Romoz.JS Logo Icon" className="logo-image" />
          <img src={logoText} alt="ROMOZ JS Branding Text" className="logo-image" />
        </Link>
      </header>

      <div className="radar-container" aria-hidden="true">
        <div className="radar-shell">
          <video src={radarVideo} autoPlay loop muted playsInline className="radar-video" />
        </div>
      </div>

      <nav
        className="menu-container no-scrollbar anim-fade"
        aria-label="Main Navigation"
        style={{ "--delay": "60ms" }}
      >
        {menuItems.map((item) => (
          <NavItem
            key={item.to}
            text={item.text}
            to={item.to}
            onHover={() => setActiveVideo(item.video)}
          />
        ))}
      </nav>

      <div className="app-main">
        <Outlet context={{ activeVideo }} />
      </div>
    </div>
  );
}
