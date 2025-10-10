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

export default function Home() {
  const videos = [
    "/videos/keops.mp4",
    "/videos/pueblo.mp4",
    "/videos/molino.mp4",
    "/videos/khalama.mp4",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleVideoEnd = () => {
    // Avanzar al siguiente video o volver al primero si termina el último
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* CONTENEDOR UNIFICADO: ahora responsivo y más angosto en mobile */}
      <div className="w-full flex justify-center px-4">
        {/* Aquí definimos el ancho máximo según breakpoints:
            - móvil: max-w-[360px]  (genera gutters para ver el fondo)
            - sm:     max-w-[640px]
            - md+:    max-w-[1000px] (tu ancho de escritorio)
        */}
        <div className="w-full max-w-[360px] sm:max-w-[640px] md:max-w-[1100px] mx-auto">
          {/* Logo y Header ahora comparten el mismo ancho / padding */}
          <div className="">
            <Logo />
          </div>
          <Header />
        </div>
      </div>

      {/* Contenedor principal del contenido (mismo max-w y centrado) */}
      <div className="w-full flex justify-center px-4">
        <div className="w-full max-w-[340px] sm:max-w-[300px] md:max-w-[1100px] mx-auto bg-white backdrop-blur-sm shadow-lg p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,240px)_1fr_minmax(0,200px)] gap-6">
            {/* Sidebar izquierdo */}
            <div className="hidden lg:block">
              <SidebarLeft />
            </div>

            {/* Main */}
            <main className="order-2 lg:order-1">
              {/* Asegurate que tu componente Hero haga la imagen responsive.
                  Si no, reemplaza o ajusta Hero para que la <img> tenga: w-full h-auto object-cover */}
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
                  className="px-3 py-1 rounded  hover:bg-white/10 transition border-l border-white/30 pl-4"
                >
                  Chat
                </a>
              </div>

              {/* Banners: 2/3 + 1/3 */}
              <div className="grid grid-cols-3 mt-2 gap-2 pb-2">
                <div className="col-span-3">
                  <video
                    key={currentIndex} // Fuerza el reinicio al cambiar de video
                    src={videos[currentIndex]}
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleVideoEnd}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>
              </div>

              <div className=" flex items-center justify-center gap-4 bg-white p-2 rounded shadow text-sm text-black">
                <h1>Lo esperaste durante tantos años</h1>
                <img className="h-16 w-16" src="fotos/logoo.png" alt="" />
              </div>

              {/* Sección Destacados */}
              <div className="rounded p-4 bg-black">
                <FeaturedGrid items={banners} />
              </div>
              <div className="col-span-2">
                <BannerCard
                  item={{
                    id: "banner-grande",
                    img: "/fotos/publicidad/youtube.jpg",
                  }}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Repetición de banners debajo (igual comportamiento) */}
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

              {/* Imagen de boliches (asegurate que esta <img> sea responsive) */}
              <div className="">
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
              {/* MusicPlayer solo en desktop */}
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
