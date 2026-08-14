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

function App() {
  const [activeVideo, setActiveVideo] = useState(fountainVideo);

  return (
    <div className="app-wrapper">
      {/* WALLPAPER CORNERS */}
      <img src={WCorner} alt="" className="wallpaper-corner corner-tl" />
      <img src={WCorner} alt="" className="wallpaper-corner corner-bl" />
      <img src={WCorner} alt="" className="wallpaper-corner corner-tr" />
      <img src={WCorner} alt="" className="wallpaper-corner corner-br" />

      {/* 1. Logo */}
      <Link to="/" className="logo-container">
        <img src={logoIcon} alt="Romoz.JS Icon" className="logo-image" />
        <img src={logoText} alt="ROMOZ JS" className="logo-image" />
      </Link>

      {/* 2. Radar */}
      <div className="radar-container">
        <video src={radarVideo} autoPlay loop muted className="radar-video" />
      </div>

      {/* 3. THE OUTLET (Injects Home.jsx or FeaturedProjects.jsx here) */}
      <Outlet context={{ activeVideo }} />

      {/* 4. Menu Items */}
      <div className="menu-container">
        <MenuItem
          text="About"
          to="/about"
          onMouseEnter={() => setActiveVideo(fountainVideo)}
        />
        <MenuItem
          text="Featured Project"
          to="/featured-projects"
          onMouseEnter={() => setActiveVideo(towerVideo)}
        />
        <MenuItem
          text="Contributions & Experiences"
          to="/contributions"
          onMouseEnter={() => setActiveVideo(globeVideo)}
        />
        <MenuItem
          text="Contacts"
          to="/contacts"
          onMouseEnter={() => setActiveVideo(cornicheVideo)}
        />
        <MenuItem
          text="Services"
          to="/services"
          onMouseEnter={() => setActiveVideo(flagVideo)}
        />
      </div>
    </div>
  );
}

export default App;
