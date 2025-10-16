import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
export default function GroupRotator({
  groups = [],
  imageInterval = 3000,
  cyclesPerGroup = 1,
  pauseOnHover = true,
  showControls = true,
  className = "",
}) {
  const [groupIndex, setGroupIndex] = useState(0); // which group we're showing
  const [imageIndex, setImageIndex] = useState(0); // which image of current group
  const [cycleCount, setCycleCount] = useState(0); // how many full cycles of images have passed for current group
  const [paused, setPaused] = useState(false);

  const groupsRef = useRef(groups);
  groupsRef.current = groups;

  const timerRef = useRef(null);

  // Helper: advance image (and handle when we reach end of group's images)
  const advanceImage = () => {
    const g = groupsRef.current[groupIndex];
    if (!g || !g.images || g.images.length === 0) return;

    setImageIndex((prev) => {
      const next = prev + 1;
      if (next >= g.images.length) {
        // finished one loop of images for this group
        setCycleCount((c) => c + 1);
        return 0;
      }
      return next;
    });
  };

  // Advance group (to next group), reset indices
  const advanceGroup = (step = 1) => {
    const total = groupsRef.current.length;
    if (total === 0) return;
    setGroupIndex((gIdx) => {
      const nextGroup = (gIdx + step + total) % total;
      return nextGroup;
    });
    setImageIndex(0);
    setCycleCount(0);
  };

  // Effect: drives automatic image switching and group switching
  useEffect(() => {
    // No groups -> nothing
    if (!groups || groups.length === 0) return;

    // Clear any existing
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (paused) return; // do not run while paused

    timerRef.current = setInterval(() => {
      const currentGroup = groupsRef.current[groupIndex];
      if (!currentGroup || currentGroup.images.length === 0) {
        // if no images, skip to next group to avoid infinite loop
        advanceGroup(1);
        return;
      }

      // If we've completed the configured number of cycles for this group,
      // switch to the next group and reset counters.
      if (cycleCount >= cyclesPerGroup && imageIndex === 0 && cycleCount > 0) {
        advanceGroup(1);
        return;
      }

      advanceImage();
    }, imageInterval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // watch groupIndex, imageIndex, cycleCount, paused, imageInterval, cyclesPerGroup
  }, [
    groupIndex,
    imageIndex,
    cycleCount,
    paused,
    imageInterval,
    cyclesPerGroup,
    groups,
  ]);

  // Pause on hover handlers
  const onEnter = () => pauseOnHover && setPaused(true);
  const onLeave = () => pauseOnHover && setPaused(false);

  // Controls
  const prevImage = () => {
    const g = groups[groupIndex];
    if (!g || g.images.length === 0) return;
    setImageIndex((i) => (i - 1 + g.images.length) % g.images.length);
  };
  const nextImage = () => {
    const g = groups[groupIndex];
    if (!g || g.images.length === 0) return;
    setImageIndex((i) => {
      const ni = (i + 1) % g.images.length;
      if (ni === 0) setCycleCount((c) => c + 1);
      return ni;
    });
  };

  const prevGroup = () => advanceGroup(-1);
  const nextGroup = () => advanceGroup(1);

  // Avoid rendering when no groups
  if (!groups || groups.length === 0) return null;

  const currentGroup = groups[groupIndex];
  const currentImage =
    (currentGroup.images && currentGroup.images[imageIndex]) || "";

  return (
    <div
      className={`grid grid-cols-3 gap-2 mt-2 pb-2 ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Left: fixed logo */}
      {/* Left: fixed logo */}
      <div className="col-span-1 flex items-center justify-center bg-white rounded shadow-sm">
        <Link to={currentGroup.link ?? "#"}>
          <img
            src={currentGroup.logo}
            alt={`${currentGroup.id} logo`}
            className="object-contain w-full h-full max-h-44 md:max-h-56 lg:max-h-44 p-2 transition-transform duration-300 hover:scale-105"
            style={{ aspectRatio: "1 / 1" }}
            loading="lazy"
          />
        </Link>
      </div>

      {/* Right: image area */}
      <div className="col-span-2 relative bg-gray-50 rounded overflow-hidden shadow-sm">
        {/* Image */}
        {currentImage ? (
          <img
            src={currentImage}
            alt={`${currentGroup.altPrefix ?? currentGroup.id} ${
              imageIndex + 1
            }`}
            className="w-full h-44 md:h-56 lg:h-44 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-44 md:h-56 lg:h-44 flex items-center justify-center text-gray-500">
            No images
          </div>
        )}

        {/* Group label (optional) */}
        {currentGroup.title && (
          <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {currentGroup.title}
          </div>
        )}

        {/* Controls */}
        {showControls && (
          <>
            <button
              aria-label="Previous image"
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
            >
              ‹
            </button>
            <button
              aria-label="Next image"
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
            >
              ›
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
              {currentGroup.images.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to image ${i + 1}`}
                  onClick={() => setImageIndex(i)}
                  className={`w-2 h-2 rounded-full ${
                    i === imageIndex ? "bg-white" : "bg-white/60"
                  }`}
                />
              ))}
            </div>

            {/* Group prev/next */}
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                aria-label="Previous group"
                onClick={prevGroup}
                className="bg-black/40 text-white p-1 rounded hover:bg-black/60"
              >
                ◂
              </button>
              <button
                aria-label="Next group"
                onClick={nextGroup}
                className="bg-black/40 text-white p-1 rounded hover:bg-black/60"
              >
                ▸
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
