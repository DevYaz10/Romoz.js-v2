import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import PageLayout from "../PageLayout";
import rawProjectsData from "../data/projects.json";
import CommandButton from "../components/CommandButton";
import { PanelCorners } from "../components/CornerMarks";

const projectsData = rawProjectsData.map(proj => ({
  ...proj,
  images: proj.images.map(img => proj.images_folder ? `${proj.images_folder}${img}` : img)
}));

const projectFields = ["status", "client", "date"];

function ProjectMeta({ project, includeId = false }) {
  const fields = includeId ? [...projectFields, "id"] : projectFields;

  return fields.map((field) => (
    <p key={field}>
      <span className="accent-label">{field === "id" ? "FILE_ID" : field.toUpperCase()}:</span>{" "}
      {field === "id" ? project.id.toUpperCase() : project[field]}
    </p>
  ));
}

// --- SUB-COMPONENT: EXPANDED VIEW WITH CAROUSEL ---
function ExpandedProject({ project, onClose }) {
  const [imgIndex, setImgIndex] = useState(0);
  const touchStartX = useRef(null);
  
  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Carousel Logic
  const nextImage = () => {
    setImgIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };
  const prevImage = () => {
    setImgIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null || project.images.length < 2) return;

    const touchDeltaX = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(touchDeltaX) < 40) return;
    if (touchDeltaX < 0) {
      nextImage();
    } else {
      prevImage();
    }
  };

  return (
    <article className="expanded-card">
      <PanelCorners />

      {/* Back Button */}
      <button onClick={onClose} className="back-btn">
        &lt; CLOSE_FILE
        <span className="back-button-cursor" aria-hidden="true">_</span>
      </button>

      {/* CSS GRID CONTAINER */}
      <div className="expanded-grid">
        
        {/* === BOX 1: TITLE & FILE DATA === */}
        <section className="expanded-box">
          <header>
            <h2 className="expanded-title">
              {project.title}
            </h2>
          </header>

          <div className="project-meta project-meta--expanded">
            <ProjectMeta project={project} includeId />
          </div>
        </section>

        {/* === BOX 2: IMAGE CAROUSEL === */}
        <div
          className="carousel-container"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => { touchStartX.current = null; }}
        >
          
          {/* Expand Button */}
          <button 
            onClick={() => setIsFullscreen(true)} 
            className="expand-btn"
            title="Fullscreen Mode"
          >
            [+] EXPAND
          </button>

          {project.images.length > 1 && (
            <>
              <button onClick={prevImage} className="carousel-btn carousel-btn-left" aria-label="Previous Image">&lt;</button>
              <button onClick={nextImage} className="carousel-btn carousel-btn-right" aria-label="Next Image">&gt;</button>
            </>
          )}

          <img
            src={project.images[imgIndex]}
            alt={`${project.title} screenshot ${imgIndex + 1}`}
            onDoubleClick={() => setIsFullscreen(true)}
            className="carousel-image"
          />

          {/* Image Counter HUD */}
          <div className="image-counter" aria-hidden="true">
            IMG: 0{imgIndex + 1} / 0{project.images.length}
          </div>
        </div>

        {/* === BOX 3: DESCRIPTION & LINKS === */}
        <section className="expanded-box expanded-box--wide">
          <p className="expanded-description">
            {project.description}
          </p>

          <footer className="expanded-links">
            {project.live_link && (
              <a href={project.live_link} target="_blank" rel="noreferrer" className="link-button">
                &gt; INITIALIZE_LIVE_PREVIEW_
              </a>
            )}
            {project.repo_link && (
              <a href={project.repo_link} target="_blank" rel="noreferrer" className="link-button">
                &gt; ACCESS_SOURCE_CODE_
              </a>
            )}
          </footer>
        </section>

      </div>

      {/* === FULLSCREEN MODAL (USING A PORTAL) === */}
      {isFullscreen && createPortal(
        <div 
          className="fullscreen-overlay" 
          onClick={() => setIsFullscreen(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => { touchStartX.current = null; }}
        >
          {/* Top Right 'X' Button */}
          <button
            className="fullscreen-close"
            onClick={() => setIsFullscreen(false)}
            aria-label="Close Fullscreen"
          >
            X
          </button>

          {/* Shared Navigation Logic */}
          {project.images.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }} 
                className="carousel-btn carousel-btn-left carousel-btn--fullscreen"
                aria-label="Previous Image"
              >
                &lt;
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }} 
                className="carousel-btn carousel-btn-right carousel-btn--fullscreen"
                aria-label="Next Image"
              >
                &gt;
              </button>
            </>
          )}

          <img
            src={project.images[imgIndex]}
            alt={`${project.title} fullscreen screenshot ${imgIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="fullscreen-img"
          />

          <div className="image-counter image-counter--fullscreen" aria-hidden="true">
            IMG: 0{imgIndex + 1} / 0{project.images.length}
          </div>
        </div>,
        document.body
      )}
    </article>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchActive]);

  const filteredProjects = projectsData.filter((project) => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.date.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const dbButton = isSearchActive ? (
    <div className="search-wrapper">
      <input
        ref={searchInputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onBlur={() => {
          if (searchQuery.trim() === "") {
            setIsSearchActive(false);
          }
        }}
        placeholder="> ENTER_QUERY_"
        className="search-input"
        aria-label="Search Projects Database"
      />
    </div>
  ) : (
    <CommandButton
      onClick={() => {
        setSelectedProject(null);
        setIsSearchActive(true);
      }}
    >
      &gt; Query_Database<span className="command-cursor" aria-hidden="true">_</span>
    </CommandButton>
  );

  return (
    <PageLayout
      title="Project"
      accent="Database"
      description="Accessing classified featured records. Select a directory to view project specifications."
      action={dbButton}
      contentClassName="projects-container"
    >
      {/* Hide the grid if a project is selected */}
      <div className={`projects-grid${selectedProject ? " projects-grid--hidden" : ""}`}>
        
        {filteredProjects.map((project) => (
          <article key={project.id} className="project-card">
            <PanelCorners />

            <div className="project-img-wrapper">
              <div
                className="project-img"
                style={{ backgroundImage: `url('${project.images[0]}')` }}
                role="img"
                aria-label={project.title}
              ></div>
            </div>

            <h3 className="project-title">{project.title}</h3>

            <div className="project-details">
              <ProjectMeta project={project} />
            </div>

            <button
              className="project-button"
              onClick={() => setSelectedProject(project)}
            >
              &gt; ACCESS FILE_
            </button>
          </article>
        ))}

        {/* Display a "No Results" message if the search yields nothing */}
        {filteredProjects.length === 0 && (
          <div className="no-results">
            <p className="no-results-title">
              [ NO_RECORDS_FOUND ]
            </p>
            <p className="no-results-text">
              Adjust your query parameters and try again.
            </p>
          </div>
        )}
      </div>

      {/* EXPANDED VIEW */}
      {selectedProject && (
        <ExpandedProject
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* INVISIBLE PRELOADER */}
      <div className="project-preloader" aria-hidden="true">
        {projectsData.map((proj) =>
          proj.images.map((imgUrl) => (
            <img key={imgUrl} src={imgUrl} alt="" />
          )),
        )}
      </div>
    </PageLayout>
  );
}