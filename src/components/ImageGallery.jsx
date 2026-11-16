import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const pad = (value) => String(value).padStart(2, "0");
const counterText = (index, total) => `IMG: ${pad(index + 1)} / ${pad(total)}`;
const SWIPE_THRESHOLD = 40;

/**
 * Inline screenshot viewer with a fullscreen lightbox.
 * One source of truth for image navigation: arrows, swipe, keyboard, counter.
 */
export default function ImageGallery({ images, title }) {
  const [index, setIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const touchStartX = useRef(null);
  const closeRef = useRef(null);
  const multiple = images.length > 1;

  const step = useCallback(
    (direction) => setIndex((current) => (current + direction + images.length) % images.length),
    [images.length],
  );

  // Lightbox: escape closes, arrows navigate, background scroll is locked.
  useEffect(() => {
    if (!isLightboxOpen) return;

    const onKeyDown = (event) => {
      if (!["Escape", "ArrowRight", "ArrowLeft"].includes(event.key)) return;
      event.stopPropagation();
      if (event.key === "Escape") setIsLightboxOpen(false);
      else step(event.key === "ArrowRight" ? 1 : -1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown, true);
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = previousOverflow;
    };
  }, [isLightboxOpen, step]);

  const swipe = {
    onTouchStart: (event) => {
      touchStartX.current = event.touches[0].clientX;
    },
    onTouchEnd: (event) => {
      if (touchStartX.current === null || !multiple) return;
      const delta = event.changedTouches[0].clientX - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(delta) < SWIPE_THRESHOLD) return;
      step(delta < 0 ? 1 : -1);
    },
    onTouchCancel: () => {
      touchStartX.current = null;
    },
  };

  const arrows = (modifier = "") =>
    multiple && (
      <>
        <button
          type="button"
          className={`carousel-btn carousel-btn-left ${modifier}`.trim()}
          onClick={(event) => {
            event.stopPropagation();
            step(-1);
          }}
          aria-label="Previous image"
        >
          {"<"}
        </button>
        <button
          type="button"
          className={`carousel-btn carousel-btn-right ${modifier}`.trim()}
          onClick={(event) => {
            event.stopPropagation();
            step(1);
          }}
          aria-label="Next image"
        >
          {">"}
        </button>
      </>
    );

  return (
    <>
      <div className="carousel-container" {...swipe}>
        <div className="carousel-frame">
          <button
            type="button"
            className="expand-btn"
            onClick={() => setIsLightboxOpen(true)}
            title="Fullscreen mode"
          >
            [+] EXPAND
          </button>

          {arrows()}

          <img
            key={images[index]}
            src={images[index]}
            alt={`${title} screenshot ${index + 1}`}
            className="carousel-image"
            onDoubleClick={() => setIsLightboxOpen(true)}
            draggable="false"
          />
        </div>

        <div className="carousel-bar">
          {multiple ? (
            <div className="carousel-dots" aria-hidden="true">
              {images.map((image, position) => (
                <button
                  key={image}
                  type="button"
                  tabIndex={-1}
                  className="carousel-dot"
                  data-active={position === index ? "true" : "false"}
                  onClick={() => setIndex(position)}
                />
              ))}
            </div>
          ) : (
            <span className="carousel-dots" aria-hidden="true" />
          )}

          <span className="image-counter" aria-hidden="true">
            {counterText(index, images.length)}
          </span>
        </div>
      </div>

      {isLightboxOpen &&
        createPortal(
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} screenshots`}
            onClick={() => setIsLightboxOpen(false)}
            {...swipe}
          >
            <button
              type="button"
              ref={closeRef}
              className="lightbox-close"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close fullscreen"
            >
              X
            </button>

            {arrows()}

            <img
              key={images[index]}
              src={images[index]}
              alt={`${title} fullscreen screenshot ${index + 1}`}
              className="lightbox-img"
              onClick={(event) => event.stopPropagation()}
              draggable="false"
            />

            <div className="image-counter lightbox-counter" aria-hidden="true">
              {counterText(index, images.length)}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
