import rawProjects from "./projects.json";

/**
 * Resolves each filename against its folder so components never rebuild paths.
 */
export const projects = rawProjects.map((project) => ({
  ...project,
  images: project.images.map((file) =>
    project.images_folder ? `${project.images_folder}${file}` : file,
  ),
}));

const preloaded = new Set();

/** Warms the cache for a file's screenshots (call on hover / before opening). */
export function preloadProject(project) {
  project.images.forEach((src) => {
    if (preloaded.has(src)) return;
    preloaded.add(src);
    const img = new Image();
    img.src = src;
  });
}
