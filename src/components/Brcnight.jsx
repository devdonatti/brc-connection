import React, { useState, useEffect } from "react";

const images = [
  "./fotos/brc1.jpg",
  "./fotos/brc2.jpg",
  "./fotos/brc3.jpg",
  "./fotos/brc3.jpg",
  "./fotos/brc3.jpg",
];

export default function Carousel3D() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const getVisibleImages = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    const nextIndex = (currentIndex + 1) % images.length;
    return [prevIndex, currentIndex, nextIndex];
  };

  const visibleImages = getVisibleImages();

  return (
    <div className="flex flex-col items-center justify-center mt-24">
      <div className="flex items-center justify-center relative w-full max-w-[900px]">
        {/* Flecha izquierda */}
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80 transition"
        >
          ◀
        </button>

        {/* Imágenes */}
        <div className="flex items-center justify-center gap-6">
          {visibleImages.map((imgIndex, i) => (
            <div
              key={imgIndex}
              className={`transition-transform duration-700 transform ${
                i === 1
                  ? "scale-125 z-20"
                  : "scale-90 z-10 opacity-60 -rotate-y-6"
              }`}
            >
              <img
                src={images[imgIndex]}
                alt={`img-${imgIndex}`}
                className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>
          ))}
        </div>

        {/* Flecha derecha */}
        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80 transition"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
