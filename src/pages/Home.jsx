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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      {/* Logo y Header */}
      <Logo />
      <Header />

      {/* Contenedor principal */}
      <div className="w-full flex justify-center px-2">
        <div className="w-full max-w-[1200px] bg-gray-300/80 backdrop-blur-sm shadow-lg p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,240px)_1fr_minmax(0,200px)] gap-6">
            {/* Sidebar izquierdo */}
            <div className="hidden lg:block">
              <SidebarLeft />
            </div>

            {/* Main */}
            <main className="order-2 lg:order-1">
              <Hero image="/portada.jpg" />

              {/* Barra de enlaces entre Hero y Destacados */}
              <div className="mt-4 mb-6 flex justify-center gap-4 bg-black/30 p-2 rounded shadow text-sm text-white/90">
                <a
                  href="#contacto"
                  className="px-3 py-1 rounded hover:bg-white/10 transition"
                >
                  Contacto
                </a>
                <a
                  href="#chat"
                  className="px-3 py-1 rounded hover:bg-white/10 transition"
                >
                  Chat
                </a>
              </div>

              {/* Sección Destacados */}
              <div className="rounded p-4 bg-black/30">
                <h2 className="text-lg font-semibold mb-3">Destacados</h2>
                <FeaturedGrid items={banners} />
              </div>

              {/* Imagen de boliches */}
              <div className="mt-6">
                <img
                  className="w-full h-auto rounded shadow"
                  src="/bolichesbrc.jpg"
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
    </div>
  );
}
