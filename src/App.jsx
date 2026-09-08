import { useState } from "react";
import { Outlet, Link } from "react-router";
import MenuItem from "./components/MenuItem";
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

function App() {
  const [activeVideo, setActiveVideo] = useState(fountainVideo);

  return (
    <div className="app-wrapper">
      {wallpaperCorners.map((position) => (
        <img
          key={position}
          src={WCorner}
          alt=""
          aria-hidden="true"
          className={`wallpaper-corner wallpaper-corner--${position}`}
        />
      ))}

      {/* 1. Logo */}
      <header className="app-header">
        <Link to="/" className="logo-container" aria-label="Romoz.JS Home">
          <img src={logoIcon} alt="Romoz.JS Logo Icon" className="logo-image" />
          <img src={logoText} alt="ROMOZ JS Branding Text" className="logo-image" />
        </Link>
      </header>

      {/* 2. Radar */}
      <div className="radar-container" aria-hidden="true">
        <video src={radarVideo} autoPlay loop muted className="radar-video" />
      </div>

      {/* 3. THE OUTLET */}
      <main className="app-main">
        <Outlet context={{ activeVideo }} />
      </main>

      {/* 4. Semantic Navigation Bar */}
      <nav className="menu-container" aria-label="Main Navigation">
        <ul>
          {menuItems.map((item) => (
            <MenuItem
              key={item.to}
              text={item.text}
              to={item.to}
              onMouseEnter={() => setActiveVideo(item.video)}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default App;