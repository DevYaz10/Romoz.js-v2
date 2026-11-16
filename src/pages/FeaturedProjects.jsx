import { useEffect, useMemo, useRef, useState } from "react";
import PageLayout from "../PageLayout";
import CommandButton from "../components/CommandButton";
import ImageGallery from "../components/ImageGallery";
import { preloadProject, projects } from "../data/projects";

const metaFields = ["status", "client", "date"];

function ProjectMeta({ project, withFileId = false }) {
  const fields = withFileId ? [...metaFields, "id"] : metaFields;

  return fields.map((field) => (
    <p key={field} className="stat-row">
      <span className="accent-label">{field === "id" ? "FILE_ID:" : `${field.toUpperCase()}:`}</span>
      <span>{field === "id" ? project.id.toUpperCase() : project[field]}</span>
    </p>
  ));
}

function ExpandedProject({ project, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <article className="expanded-card panel panel--glass">
      <button type="button" className="back-btn" onClick={onClose}>
        {"< "}CLOSE_FILE
        <span className="back-button-cursor" aria-hidden="true">
          _
        </span>
      </button>

      <div className="expanded-grid">
        <section className="expanded-box">
          <h2 className="expanded-title">{project.title}</h2>
          <div className="project-meta project-meta--expanded">
            <ProjectMeta project={project} withFileId />
          </div>
        </section>

        <ImageGallery images={project.images} title={project.title} />

        <section className="expanded-box expanded-box--wide">
          <p className="expanded-description">{project.description}</p>

          <footer className="expanded-links">
            {project.live_link && (
              <a
                href={project.live_link}
                target="_blank"
                rel="noreferrer"
                className="link-button"
              >
                {"> "}INITIALIZE_LIVE_PREVIEW_
              </a>
            )}
            {project.repo_link && (
              <a href={project.repo_link} target="_blank" rel="noreferrer" className="link-button">
                {"> "}ACCESS_SOURCE_CODE_
              </a>
            )}
          </footer>
        </section>
      </div>
    </article>
  );
}

export default function FeaturedProjects() {
  const [selectedId, setSelectedId] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef(null);

  const selectedProject = projects.find((project) => project.id === selectedId) ?? null;

  useEffect(() => {
    if (!isSearching) return;

    searchInputRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setIsSearching(false);
      setQuery("");
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isSearching]);

  const visibleProjects = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return projects;

    return projects.filter((project) =>
      [project.title, project.client, project.status, project.date, project.description].some(
        (value) => value.toLowerCase().includes(needle),
      ),
    );
  }, [query]);

  const databaseAction = isSearching ? (
    <div className="search-wrapper">
      <input
        ref={searchInputRef}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onBlur={() => {
          if (!query.trim()) setIsSearching(false);
        }}
        placeholder="> ENTER_QUERY_"
        className="search-input"
        aria-label="Search projects database"
      />
    </div>
  ) : (
    <CommandButton
      onClick={() => {
        setSelectedId(null);
        setIsSearching(true);
      }}
    >
      {"> "}Query_Database
      <span className="command-cursor" aria-hidden="true">
        _
      </span>
    </CommandButton>
  );

  return (
    <PageLayout
      title="Project"
      accent="Database"
      description="Accessing classified featured records. Select a directory to view project specifications."
      action={databaseAction}
    >
      {selectedProject ? (
        <ExpandedProject project={selectedProject} onClose={() => setSelectedId(null)} />
      ) : (
        <div className="projects-grid">
          {visibleProjects.map((project, position) => (
            <article
              key={project.id}
              className="project-card panel panel--interactive anim-rise"
              style={{ "--delay": `${Math.min(position, 8) * 55 + 120}ms` }}
              onMouseEnter={() => preloadProject(project)}
            >
              <div className="project-img-wrapper">
                <div
                  className="project-img"
                  style={{ backgroundImage: `url('${project.images[0]}')` }}
                  role="img"
                  aria-label={`${project.title} preview`}
                />
              </div>

              <h3 className="project-title">{project.title}</h3>

              <div className="project-details">
                <ProjectMeta project={project} />
              </div>

              <span className="project-button">{"> "}ACCESS FILE_</span>

              <button
                type="button"
                className="project-card-hit"
                aria-label={`Open file: ${project.title}`}
                onClick={() => setSelectedId(project.id)}
                onFocus={() => preloadProject(project)}
              />
            </article>
          ))}

          {visibleProjects.length === 0 && (
            <div className="no-results panel">
              <p className="no-results-title">[ NO_RECORDS_FOUND ]</p>
              <p className="no-results-text">Adjust your query parameters and try again.</p>
            </div>
          )}
        </div>
      )}
    </PageLayout>
  );
}
