import React from "react";
import Header from "../components/Layout/Header";
import SidebarLeft from "../components/Layout/SidebarLeft";
import SidebarRight from "../components/Layout/SidebarRight";
import Footer from "../components/Layout/Footer";
import Hero from "../components/Hero";
import FeaturedGrid from "../components/FeaturedGrid";
import { banners } from "../data/banners";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Contenedor que empuja el contenido hacia abajo y centra todo */}
      <div className="w-full flex justify-center px-2">
        {/* Caja central semi-transparente que contiene la grilla principal */}
        <div className="w-full max-w-[1200px] bg-black/40 backdrop-blur-sm  shadow-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,240px)_1fr_minmax(0,200px)] gap-6">
            {/* Sidebar izquierdo: en mobile queda arriba del main por el orden */}
            <div className="hidden lg:block">
              <SidebarLeft />
            </div>

            {/* Main */}
            <main className="order-2 lg:order-1">
              <Hero
                image="/assets/hero.jpg"
                title="bariloche más cercano"
                subtitle="Lo esperaste durante tantos años"
              />

              <div className="mt-6">
                <div className="rounded p-4 bg-black/30">
                  <h2 className="text-lg font-semibold mb-3">Destacados</h2>
                  <FeaturedGrid items={banners} />
                </div>
              </div>
            </main>

            {/* Sidebar derecho */}
            <aside className="hidden lg:block order-3">
              <SidebarRight />
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
