// src/components/Argentinanight.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Argentinanight — Versión reducida que muestra **solo** Córdoba
 * - Cambié el título a "Cordoba At Night"
 * - Eliminé todas las regiones que no sean Córdoba
 * - Conservé la UI, el modal y el carrusel de destacados
 *
 * Requisitos: Tailwind CSS en tu proyecto.
 */

const cordobaClubs = [
  {
    name: "Molino Rojo",
    logo: "/fotos/boliches/cba/logomr.jpg",
    photos: [
      "/fotos/boliches/cba/molinorojo1.jpg",
      "/fotos/boliches/cba/molinorojo2.jpg",
      "/fotos/boliches/cba/molinorojo3.jpg",
      "/fotos/boliches/cba/molinorojo4.jpg",
      "/fotos/boliches/cba/molinorojo5.jpg",
    ],
  },
  {
    name: "Keops",
    logo: "/fotos/boliches/cba/logokeops.jpg",
    photos: [
      "/fotos/boliches/cba/keops1.jpg",
      "/fotos/boliches/cba/keops2.jpg",
      "/fotos/boliches/cba/keops3.jpg",
      "/fotos/boliches/cba/keops4.jpg",
      "/fotos/boliches/cba/keops5.jpg",
    ],
  },
  {
    name: "Khalama",
    logo: "/fotos/boliches/cba/logokhalama.jpg",
    photos: [
      "/fotos/boliches/cba/khalama1.jpg",
      "/fotos/boliches/cba/khalama2.jpg",
      "/fotos/boliches/cba/khalama3.jpg",
      "/fotos/boliches/cba/khalama4.jpg",
      "/fotos/boliches/cba/khalama5.jpg",
    ],
  },
];

export default function Argentinanight() {
  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalClub, setModalClub] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  // featured index simple auto-scroll
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredTimer = useRef(null);

  // touch refs for modal swipe
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);

  // featured clubs: solo Córdoba
  const featuredClubs = cordobaClubs.slice(0, 6);

  // autoplay featured subtle
  useEffect(() => {
    featuredTimer.current = setInterval(() => {
      setFeaturedIndex((i) => (i + 1) % featuredClubs.length);
    }, 4000);
    return () => clearInterval(featuredTimer.current);
  }, [featuredClubs.length]);

  // modal open/close
  const openModal = (club) => {
    setModalClub(club);
    setPhotoIndex(0);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalClub(null);
    document.body.style.overflow = "";
  };

  // modal photo navigation
  const nextPhoto = () => {
    if (!modalClub) return;
    setPhotoIndex((p) => (p + 1) % modalClub.photos.length);
  };
  const prevPhoto = () => {
    if (!modalClub) return;
    setPhotoIndex(
      (p) => (p - 1 + modalClub.photos.length) % modalClub.photos.length
    );
  };

  // modal swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const handleTouchMove = (e) => {
    if (touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const handleTouchEnd = () => {
    const delta = touchDeltaX.current || 0;
    const threshold = 50;
    if (delta > threshold) prevPhoto();
    else if (delta < -threshold) nextPhoto();
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  // keyboard nav for modal
  useEffect(() => {
    const handler = (e) => {
      if (!modalOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalOpen, modalClub]);

  // helper: lazy image component simple
  const Img = ({ src, alt, className = "", ...props }) => (
    <img
      src={src}
      alt={alt}
      className={`block ${className}`}
      loading="lazy"
      {...props}
    />
  );

  return (
    <div className="px-6 py-8 max-w-[1400px] mx-auto">
      <Link to="/">
        <div className="flex justify-center md:justify-start items-center mx-auto md:mx-2 mt-4 md:mt-0">
          <img
            className="h-12 w-auto md:h-16"
            src="/fotos/logoo.png"
            alt="logo principal"
          />
          <img
            className="h-8 w-auto -ml-1 md:h-14"
            src="/fotos/conectt.png"
            alt="texto logo"
          />
        </div>
      </Link>

      {/* HERO */}
      <div className="relative rounded-lg overflow-hidden mb-10">
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        <div
          className="h-56 md:h-72 lg:h-96 bg-center bg-cover flex items-center justify-center"
          style={{ backgroundImage: `url('/fotos/portada/hero-cba.jpg')` }}
        >
          <div className="relative z-10 text-center px-2">
            <h1 className="text-3xl md:text-5xl text-white font-extrabold drop-shadow-lg">
              Cordoba At Night
            </h1>
            <p className="mt-2 text-sm md:text-base text-gray-200/90">
              Guía visual de boliches, fotos y experiencias nocturnas en
              Córdoba.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  const el = document.querySelector(
                    "[data-region='Cordoba At Night']"
                  );
                  if (el)
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="bg-white text-gray-900 px-4 py-2 rounded-md font-medium shadow"
              >
                Ver Córdoba
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED ROW (carrusel horizontal simple) */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Destacados</h2>
          <div className="text-sm text-gray-500">
            Recomendados por la comunidad
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-700"
              style={{
                transform: `translateX(-${
                  featuredIndex * (100 / Math.min(featuredClubs.length, 3))
                }%)`,
                width: `${
                  featuredClubs.length *
                  (100 / Math.min(featuredClubs.length, 3))
                }%`,
              }}
            >
              {featuredClubs.map((club, i) => (
                <div
                  key={club.name}
                  className="w-full md:w-1/3 p-3"
                  style={{
                    minWidth: `${100 / Math.min(featuredClubs.length, 3)}%`,
                  }}
                >
                  <div
                    className="relative bg-gradient-to-b from-black/60 to-transparent rounded-lg overflow-hidden shadow-md cursor-pointer"
                    onClick={() => openModal(club)}
                  >
                    <Img
                      src={club.photos[0]}
                      alt={club.name}
                      className="w-full h-48 md:h-56 object-cover"
                    />
                    <div className="absolute inset-0 flex items-end">
                      <div className="p-4 w-full">
                        <div className="flex items-center gap-3">
                          <Img
                            src={club.logo}
                            alt={`${club.name} logo`}
                            className="h-12 w-12 object-contain rounded bg-white/5 p-1"
                          />
                          <div>
                            <div className="text-white font-semibold">
                              {club.name}
                            </div>
                            <div className="text-xs text-gray-200/80">
                              Experiencias nocturnas
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CÓRDOBA: filas horizontales centradas con snap — grid en pantallas grandes */}
      <section data-region="Cordoba At Night" className="mb-12">
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="text-2xl font-semibold">Cordoba At Night</h3>
          <div className="text-sm text-gray-500">
            Explorá {cordobaClubs.length} boliches
          </div>
        </div>

        {/* Mobile / small: horizontal scroll snap */}
        <div className="lg:hidden">
          <div
            className="flex gap-6 overflow-x-auto py-4 px-4 snap-x snap-mandatory justify-start"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {cordobaClubs.map((club, idx) => (
              <article
                key={`${club.name}-${idx}`}
                className="snap-center min-w-[260px] sm:min-w-[300px] flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg transform hover:scale-[1.01] transition"
              >
                <div
                  className="relative w-full h-56 sm:h-64 cursor-pointer"
                  onClick={() => openModal(club)}
                >
                  <Img
                    src={club.logo}
                    alt={`${club.name} logo`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <div className="backdrop-blur-sm bg-black/30 rounded-md px-3 py-2 inline-block">
                      <div className="text-white font-bold text-lg">
                        {club.name}
                      </div>
                      <div className="text-xs text-gray-200/70">
                        Tocá para ver fotos
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-white/10 text-white text-xs px-2 py-1 rounded">
                    CBA
                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-900 flex items-center justify-between">
                  <div className="text-sm text-gray-200">
                    {club.photos.length} fotos
                  </div>
                  <button
                    onClick={() => openModal(club)}
                    className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded"
                  >
                    Ver fotos
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Desktop / large: grid to show all cards */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-8">
            {cordobaClubs.map((club, idx) => (
              <article
                key={`${club.name}-${idx}`}
                className="rounded-xl overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg transform hover:scale-[1.01] transition"
              >
                <div
                  className="relative w-full h-72 cursor-pointer"
                  onClick={() => openModal(club)}
                >
                  <Img
                    src={club.logo}
                    alt={`${club.name} logo`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <div className="backdrop-blur-sm bg-black/30 rounded-md px-3 py-2 inline-block">
                      <div className="text-white font-bold text-lg">
                        {club.name}
                      </div>
                      <div className="text-xs text-gray-200/70">
                        Tocá para ver fotos
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-white/10 text-white text-xs px-2 py-1 rounded">
                    CBA
                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-900 flex items-center justify-between">
                  <div className="text-sm text-gray-200">
                    {club.photos.length} fotos
                  </div>
                  <button
                    onClick={() => openModal(club)}
                    className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded"
                  >
                    Ver fotos
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL: solo las fotos del boliche seleccionado */}
      {modalOpen && modalClub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-[1100px] h-full md:h-[82vh] bg-transparent rounded overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center"
              aria-label="Cerrar"
            >
              ×
            </button>

            <div
              className="h-full flex items-center justify-center relative bg-black"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <button
                onClick={prevPhoto}
                className="absolute left-4 z-40 bg-black/30 hover:bg-black/60 text-white rounded-full p-3 opacity-80"
                aria-label="Anterior foto"
              >
                ◀
              </button>

              <div className="w-full flex items-center justify-center p-4">
                <div
                  className="relative w-full"
                  style={{ maxHeight: "75vh", aspectRatio: "16/10" }}
                >
                  <img
                    src={modalClub.photos[photoIndex]}
                    alt={`${modalClub.name} ${photoIndex + 1}`}
                    className="absolute inset-0 m-auto block w-full h-full object-contain rounded"
                    style={{ imageRendering: "auto", backgroundColor: "#000" }}
                    draggable={false}
                  />
                </div>
              </div>

              <button
                onClick={nextPhoto}
                className="absolute right-4 z-40 bg-black/30 hover:bg-black/60 text-white rounded-full p-3 opacity-80"
                aria-label="Siguiente foto"
              >
                ▶
              </button>

              <div className="absolute left-6 top-6 bg-black/40 text-white text-xs px-2 py-1 rounded">
                {photoIndex + 1}/{modalClub.photos.length}
              </div>
            </div>

            <div className="bg-gray-900 p-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-white font-semibold">{modalClub.name}</div>
                <div className="text-xs text-gray-400">
                  {modalClub.photos[photoIndex]?.split("/").pop()}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={modalClub.photos[photoIndex]}
                  download
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-white text-sm"
                >
                  Descargar
                </a>
                <button
                  onClick={() =>
                    navigator.share
                      ? navigator.share({
                          title: modalClub.name,
                          url: modalClub.photos[photoIndex],
                        })
                      : alert("Compartir no soportado")
                  }
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-white text-sm"
                >
                  Compartir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
