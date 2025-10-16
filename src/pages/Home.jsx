// src/pages/Home.jsx
import { useState } from "react";
import React from "react";
import Header from "../components/Layout/Header";
import SidebarLeft from "../components/Layout/SidebarLeft";
import SidebarRight from "../components/Layout/SidebarRight";
import Footer from "../components/Layout/Footer";
import Hero from "../components/Hero";
import FeaturedGrid from "../components/FeaturedGrid";
import { banners } from "../data/banners";
import Logo from "../components/Layout/Logo";
import MusicPlayer from "../components/MusicPlayer";
import BannerCard from "../components/BannerCard";
import { menuItems } from "../data/menu"; // para el drawer izquierdo mobile
import GroupRotator from "../components/GroupRotator";
import RotatingLogo from "../components/RotatingLogo";
export default function Home() {
  const videos = [
    "/videos/keops.mp4",
    "/videos/pueblo.mp4",
    "/videos/molino.mp4",
    "/videos/khalama.mp4",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // estado para drawer izquierdo (menu lateral reutilizado)
  const [menuOpen, setMenuOpen] = useState(false);

  // estado para el drawer del Header (menu de la derecha)
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);

  const handleVideoEnd = () => {
    // Avanzar al siguiente video o volver al primero si termina el último
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* CONTENEDOR UNIFICADO: ahora responsivo y más angosto en mobile */}
      <div className="w-full flex justify-center px-4">
        {/* ancho máximo por breakpoints */}
        <div className="w-full max-w-[360px] sm:max-w-[640px] md:max-w-[1100px] mx-auto">
          <div className="">
            <Logo />
          </div>

          {/* Pasamos el control del drawer del Header por props */}
          <Header
            mobileOpen={headerMenuOpen}
            setMobileOpen={setHeaderMenuOpen}
          />
        </div>
      </div>

      {/* ====== MENÚS HAMBURGUESA INLINE (solo mobile) ======
          - botón fijo top-left (abre drawer lateral con menuItems)
          - botón fijo top-right (abre drawer del Header)
          - ambos a la misma altura top-4 y visibles solo en mobile (lg:hidden)
      */}
      <div className="lg:hidden">
        {/* Botón hamburguesa izquierdo (abre drawer lateral con menuItems) */}
        <button
          onClick={() => setMenuOpen(true)}
          className="fixed top-4 left-4 z-[9999] p-3 bg-black text-white rounded-md shadow-md focus:outline-none"
          aria-label="Abrir menú izquierdo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Botón hamburguesa derecho (abre drawer del Header) */}
        <button
          onClick={() => setHeaderMenuOpen((s) => !s)}
          className="fixed top-4 right-4 z-[9999] p-3 bg-black text-white rounded-md shadow-md focus:outline-none"
          aria-label="Abrir menú derecho"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Overlay para el drawer izquierdo */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-[9998] bg-black/60"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Drawer lateral izquierdo (usa menuItems) */}
        <aside
          className={`fixed top-0 left-0 z-[9999] h-full w-72 max-w-[85vw] bg-black shadow-xl transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-hidden={!menuOpen}
        >
          <div className="p-4 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Navegación</h3>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                aria-label="Cerrar menú"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <input
              placeholder="Buscar..."
              className="px-3 py-2 mb-4 rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500"
            />

            <nav className="flex-1 overflow-y-auto">
              <ul className="flex flex-col gap-1">
                {menuItems.map((item, idx) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-2 rounded hover:bg-gray-100 transition"
                    >
                      {item.label}
                    </a>
                    {idx < menuItems.length - 1 && (
                      <hr className="border-t my-1" />
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-4">
              <BannerCard
                item={{
                  id: "mobile-bottom-banner",
                  img: "/fotos/publicidad/1 (4).jpeg",
                }}
              />
            </div>
          </div>
        </aside>
      </div>
      {/* ====== FIN MENÚS HAMBURGUESA MOBILE ====== */}

      {/* Contenedor principal del contenido (mismo max-w y centrado) */}
      <div className="w-full flex justify-center px-4">
        <div className="w-full max-w-[340px] sm:max-w-[300px] md:max-w-[1100px] mx-auto bg-white backdrop-blur-sm shadow-lg p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,240px)_1fr_minmax(0,200px)] gap-6">
            {/* Sidebar izquierdo: lo dejamos solo para desktop */}
            <div className="hidden lg:block">
              <SidebarLeft />
            </div>

            {/* Main */}
            <main className="order-2 lg:order-1">
              <Hero image="/fotos/publicidad/portada.jpg" />
              {/* Barra de enlaces entre Hero y Destacados */}
              <div className=" flex justify-center gap-4 bg-black/30 p-2 rounded shadow text-sm text-white/90">
                <a
                  href="#contacto"
                  className="px-3 py-1 rounded hover:bg-white/10 transition"
                >
                  Contacto
                </a>

                <a
                  href="#chat"
                  className="px-3 py-1 rounded hover:bg-white/10 transition border-l border-white/30 pl-4"
                >
                  Chat
                </a>
              </div>
              {/* Banners: 2/3 + 1/3 */}
              <div className="grid grid-cols-3 mt-2 gap-2 pb-2">
                <div className="col-span-3">
                  <video
                    key={currentIndex}
                    src={videos[currentIndex]}
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleVideoEnd}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>
              </div>
              <div className=" flex items-center justify-center gap-4 bg-white p-2 rounded shadow text-xl text-black">
                <h1>Lo esperaste durante tantos años</h1>
                <RotatingLogo src="/fotos/logoo.png" size="100px" />
              </div>
              {/* Sección Destacados */}
              <div className="rounded p-4 bg-black">
                <FeaturedGrid items={banners} />
              </div>
              <GroupRotator
                groups={[
                  {
                    id: "hoteles-brc",
                    logo: "/fotos/boliches/brc/travel.jpg",
                    title: "Hoteles",
                    altPrefix: "Hotel",
                    link: "/hospedajes",
                    images: [
                      "/fotos/alojamientos/brc/travel/travel1.jpg",
                      "/fotos/alojamientos/brc/travel/travel2.jpg",
                      "/fotos/alojamientos/brc/travel/travel3.jpg",
                      "/fotos/alojamientos/brc/travel/travel4.jpg",
                      "/fotos/alojamientos/brc/travel/travel4.jpg",
                      "/fotos/alojamientos/brc/travel/travel5.jpg",
                      "/fotos/alojamientos/brc/travel/travel6.jpg",
                      "/fotos/alojamientos/brc/travel/travel7.jpg",
                      "/fotos/alojamientos/brc/travel/travel8.jpg",
                      "/fotos/alojamientos/brc/travel/travel9.jpg",
                      "/fotos/alojamientos/brc/travel/travel10.jpg",
                      "/fotos/alojamientos/brc/travel/travel11.jpg",
                      "/fotos/alojamientos/brc/travel/travel12.jpg",
                      "/fotos/alojamientos/brc/travel/travel13.jpg",
                      "/fotos/alojamientos/brc/travel/travel14.jpg",
                      "/fotos/alojamientos/brc/travel/travel15.jpg",
                      "/fotos/alojamientos/brc/travel/travel16.jpg",
                    ],
                  },
                  {
                    id: "restos-fellini",
                    logo: "/fotos/restos/fellini/fellini1.jpg",
                    title: "Restaurantes - Fellini",
                    altPrefix: "Restaurante",
                    link: "/restos",
                    images: [
                      "/fotos/restos/fellini/fellini2.jpg",
                      "/fotos/restos/fellini/fellini3.jpg",
                      "/fotos/restos/fellini/fellini4.jpg",
                      "/fotos/restos/fellini/fellini5.jpg",
                    ],
                  },
                  {
                    id: "restos-sport",
                    logo: "/fotos/restos/sport/sport1.jpg",
                    title: "Restaurante - Paso Sport",
                    altPrefix: "Restaurante",
                    link: "/restos",
                    images: [
                      "/fotos/restos/sport/sport1.jpg",
                      "/fotos/restos/sport/sport2.jpg",
                      "/fotos/restos/sport/sport3.jpg",
                      "/fotos/restos/sport/sport4.jpg",
                    ],
                  },
                  {
                    id: "boliches-brc",
                    logo: "/fotos/boliches/brc/travel.jpg",
                    title: "Boliches",
                    altPrefix: "Boliche",
                    link: "/brcnight",
                    images: [
                      "/fotos/boliches/brc/genux1.jpg",
                      "/fotos/boliches/brc/grisu1.jpg",
                      "/fotos/boliches/brc/bypass1.jpg",
                      "/fotos/boliches/brc/rocket2.jpg",
                      "/fotos/boliches/brc/cerebro2.jpg",
                    ],
                  },
                ]}
                imageInterval={3000}
                cyclesPerGroup={1}
                pauseOnHover={true}
                showControls={true}
              />

              <div className="col-span-2">
                <BannerCard
                  item={{
                    id: "banner-grande",
                    img: "/fotos/publicidad/youtube.jpg",
                  }}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Repetición de banners debajo */}
              <div className="grid grid-cols-3 mt-2 gap-2 pb-2">
                <div className="col-span-2">
                  <BannerCard
                    item={{
                      id: "banner-grande",
                      img: "/fotos/boliches/brc/travel2.jpg",
                    }}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="col-span-1">
                  <BannerCard
                    item={{
                      id: "banner-chico",
                      img: "/fotos/publicidad/facebook.jpg",
                    }}
                  />
                </div>
              </div>
              <div className=" flex justify-center gap-4 bg-black/30 p-2 rounded shadow text-sm text-white/90">
                <h1>Bariloche At Night</h1>
              </div>
              {/* Imagen de boliches */}
              <div>
                <img
                  className="w-full h-auto rounded shadow object-cover"
                  src="/fotos/boliches/bolichesbrc.jpg"
                  alt="Discotecas de Bariloche"
                />
              </div>

              {/* MusicPlayer en mobile */}
              <div className="mt-6 lg:hidden">
                <MusicPlayer />
              </div>
            </main>

            {/* Sidebar derecho */}
            <aside className="flex flex-col order-3 space-y-4 mt-6 lg:mt-0">
              <SidebarRight />
              <div className="hidden lg:block">
                <MusicPlayer />
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />

      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/1170618004"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 bg-green-500 rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
      >
        <img
          src="/fotos/publicidad/wplogo.jpg"
          alt="WhatsApp"
          className="w-10 h-10"
        />
      </a>
    </div>
  );
}
