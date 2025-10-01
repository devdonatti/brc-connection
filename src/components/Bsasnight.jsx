import React, { useState, useEffect } from "react";

const images = [
  "/fotos/boliches/brc/boliche1.jpg",
  "/fotos/boliches/brc/boliche4.jpg",
  "/fotos/boliches/brc/travel.jpg",
  "/fotos/boliches/brc/cerebro.jpg",
  "/fotos/boliches/brc/boliche2.jpg",
  "/fotos/boliches/brc/boliche8.jpg",
];

export default function Carousel3D() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false); // Para overlay de Play

  // Auto-slide cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cargar script de TikTok al renderizar
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
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
    <div className="flex flex-col items-center justify-center mt-24 px-4">
      {/* Carrusel 3D */}
      <div className="flex items-center justify-center relative w-full max-w-[900px]">
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
          aria-label="Anterior"
        >
          ◀
        </button>

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
                className="
                  w-64 h-64
                  md:w-72 md:h-72
                  lg:w-80 lg:h-80
                  xl:w-80 xl:h-80
                  object-cover
                  rounded-xl
                  shadow-2xl
                  mb-10
                "
              />
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
          aria-label="Siguiente"
        >
          ▶
        </button>
      </div>

      {/* Video de Facebook */}
      <div className="w-full max-w-[600px] mt-10 mb-10">
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
          <iframe
            title="Facebook Video"
            src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fwatch%2F?v=1302251373953487&show_text=false"
            className="absolute top-0 left-0 w-full h-full border-0"
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
          {!started && (
            <button
              onClick={() => setStarted(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/60 transition"
            >
              <div className="w-20 h-20 bg-gray-900/70 text-white rounded-full flex items-center justify-center text-3xl shadow-lg">
                ▶
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
