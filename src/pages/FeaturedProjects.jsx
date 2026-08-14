import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import PageLayout from "../PageLayout";
import rawProjectsData from "../data/projects.json";

const projectsData = rawProjectsData.map(proj => ({
  ...proj,
  images: proj.images.map(img => proj.images_folder ? `${proj.images_folder}${img}` : img)
}));

// --- SUB-COMPONENT: EXPANDED VIEW WITH CAROUSEL ---
function ExpandedProject({ project, onClose }) {
  const [imgIndex, setImgIndex] = useState(0);
  
  // NEW: Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Carousel Logic
  const nextImage = () => {
    setImgIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };
  const prevImage = () => {
    setImgIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  return (
    <div className="expanded-card">
      <div className="card-corner-tl"></div>
      <div className="card-corner-br"></div>

      {/* Back Button */}
      <button onClick={onClose} className="back-btn group">
        &lt; CLOSE_FILE
        <span className="animate-pulse opacity-0 group-hover:opacity-100">_</span>
      </button>

      {/* CSS GRID CONTAINER */}
      <div className="expanded-grid">
        
        {/* === BOX 1: TITLE & FILE DATA === */}
        <div className="expanded-box">
          <h2 className="text-green-500 font-goldman text-3xl mb-6">
            {project.title}
          </h2>

          <div className="flex flex-col gap-2 font-teko text-xl text-gray-300">
            <p><span className="project-label">STATUS:</span> {project.status}</p>
            <p><span className="project-label">CLIENT:</span> {project.client}</p>
            <p><span className="project-label">DATE:</span> {project.date}</p>
            <p><span className="project-label">FILE_ID:</span> {project.id.toUpperCase()}</p>
          </div>
        </div>

        {/* === BOX 2: IMAGE CAROUSEL === */}
        <div className="carousel-container group">
          
          {/* NEW: Expand Button */}
          <button 
            onClick={() => setIsFullscreen(true)} 
            className="expand-btn"
            title="Fullscreen Mode"
          >
            [+] EXPAND
          </button>

          {project.images.length > 1 && (
            <>
              <button onClick={prevImage} className="carousel-btn carousel-btn-left">&lt;</button>
              <button onClick={nextImage} className="carousel-btn carousel-btn-right">&gt;</button>
            </>
          )}

          <img
            src={project.images[imgIndex]}
            alt={project.title}
            // Added onDoubleClick and cursor-zoom-in pointer
            onDoubleClick={() => setIsFullscreen(true)}
            className="w-full h-auto max-h-100 object-contain mx-auto cursor-zoom-in"
          />

          {/* Image Counter HUD */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 border border-green-500/50 px-4 py-1 text-green-500 font-goldman text-xs tracking-widest">
            IMG: 0{imgIndex + 1} / 0{project.images.length}
          </div>
        </div>

        {/* === BOX 3: DESCRIPTION & LINKS === */}
        <div className="expanded-box lg:col-span-2">
          <p className="text-gray-400 font-teko text-2xl leading-snug mb-6">
            {project.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            {project.live_link && (
              <a href={project.live_link} target="_blank" rel="noreferrer" className="link-btn sm:w-auto px-8">
                &gt; INITIALIZE_LIVE_PREVIEW_
              </a>
            )}
            {project.repo_link && (
              <a href={project.repo_link} target="_blank" rel="noreferrer" className="link-btn sm:w-auto px-8">
                &gt; ACCESS_SOURCE_CODE_
              </a>
            )}
          </div>
        </div>

      </div>

      {/* === FULLSCREEN MODAL (NOW USING A PORTAL) === */}
      {isFullscreen && createPortal(
        <div 
          className="fullscreen-overlay group" 
          onClick={() => setIsFullscreen(false)}
        >
          {/* Top Right 'X' Button */}
          <button className="fullscreen-close">
            X
          </button>

          {/* Shared Navigation Logic */}
          {project.images.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }} 
                className="carousel-btn carousel-btn-left !fixed md:!left-12 z-[110]"
              >
                &lt;
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }} 
                className="carousel-btn carousel-btn-right !fixed md:!right-12 z-[110]"
              >
                &gt;
              </button>
            </>
          )}

          <img
            src={project.images[imgIndex]}
            alt={project.title}
            className="fullscreen-img"
          />

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 border border-green-500/50 px-6 py-2 text-green-500 font-goldman tracking-widest z-[110]">
            IMG: 0{imgIndex + 1} / 0{project.images.length}
          </div>
        </div>,
        document.body // <-- THIS TELLS REACT TO RENDER OVER EVERYTHING
      )}
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState(null);
  
  // NEW: Search States & Refs
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  // NEW: Focus the input automatically when the search bar appears
  useEffect(() => {
    if (isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchActive]);

  // NEW: Filter the data based on the query
  const filteredProjects = projectsData.filter((project) => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.date.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  // NEW: The Dynamic Button/Search Component
  const dbButton = isSearchActive ? (
    <div className="relative mt-6 self-start w-full sm:w-80">
      <span className="btn-bracket-tl"></span>
      <span className="btn-bracket-br"></span>
      <input
        ref={searchInputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onBlur={() => {
          // If the user clicks away and the box is empty, turn it back into a button
          if (searchQuery.trim() === "") {
            setIsSearchActive(false);
          }
        }}
        placeholder="> ENTER_QUERY_"
        className="w-full px-8 py-3 bg-[#0A2E06] border border-green-500 text-green-500 font-goldman font-bold tracking-widest text-sm uppercase outline-none focus:shadow-[0_0_20px_rgba(16,154,0,0.6)] transition-all placeholder:text-green-700"
      />
    </div>
  ) : (
    <button
      className="cta-button group"
      onClick={() => {
        setSelectedProject(null);
        setIsSearchActive(true);
      }}
    >
      <span className="btn-bracket-tl"></span>
      <span className="btn-bracket-br"></span>
      &gt; Query_Database<span className="animate-pulse">_</span>
    </button>
  );

  return (
    <PageLayout
      wText="Project"
      gText="Database"
      paragraph="Accessing classified featured records. Select a directory to view project specifications."
      button={dbButton}
      classes="projects-container"
    >
      {/* Hide the grid if a project is selected */}
      <div className={`projects-grid ${selectedProject ? "hidden" : ""}`}>
        
        {/* Render the FILTERED projects instead of all of them */}
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card group">
            <div className="card-corner-tl"></div>
            <div className="card-corner-br"></div>

            <div className="project-img-wrapper">
              <div
                className="project-img"
                style={{ backgroundImage: `url('${project.images[0]}')` }}
              ></div>
            </div>

            <h3 className="project-title">{project.title}</h3>

            <div className="project-details">
              <p>
                <span className="project-label">STATUS:</span> {project.status}
              </p>
              <p>
                <span className="project-label">CLIENT:</span> {project.client}
              </p>
              <p>
                <span className="project-label">DATE:</span> {project.date}
              </p>
            </div>

            <button
              className="project-btn"
              onClick={() => setSelectedProject(project)}
            >
              &gt; ACCESS FILE_
            </button>
          </div>
        ))}

        {/* Display a "No Results" message if the search yields nothing */}
        {filteredProjects.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 border border-green-500/30 bg-black/60">
            <p className="text-green-500 font-goldman text-xl tracking-widest animate-pulse">
              [ NO_RECORDS_FOUND ]
            </p>
            <p className="text-gray-400 font-teko text-lg mt-2">
              Adjust your query parameters and try again.
            </p>
          </div>
        )}
      </div>

      {/* EXPANDED VIEW: Renders seamlessly over the hidden grid */}
      {selectedProject && (
        <ExpandedProject
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* INVISIBLE PRELOADER */}
      <div className="hidden">
        {projectsData.map((proj) =>
          proj.images.map((imgUrl) => (
            <img key={imgUrl} src={imgUrl} alt="preload" />
          )),
        )}
      </div>
    </PageLayout>
  );
}