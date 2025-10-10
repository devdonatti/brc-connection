import React, { useMemo, useState } from "react";
import data from "../data/hoteles.json"; // ajustá la ruta según tu estructura
import Logo from "./Layout/Logo";
import { Link } from "react-router-dom";

export default function HospedajesBRCConnection() {
  const provinces = data.provincias || [];
  const [selected, setSelected] = useState(provinces[0]?.key || "");

  // Map quick lookup: key -> provincia object
  const byKey = useMemo(() => {
    const map = {};
    provinces.forEach((p) => (map[p.key] = p));
    return map;
  }, [provinces]);

  const current = byKey[selected] || provinces[0] || { hoteles: [] };

  // Agrupar por estrellas (5..1)
  const grouped = useMemo(() => {
    const groups = { 1: [], 2: [], 3: [], 4: [], 5: [] };
    (current.hoteles || []).forEach((h) => {
      const s = Math.min(5, Math.max(1, Number(h.stars) || 1));
      groups[s].push(h);
    });
    return groups;
  }, [current]);

  return (
    <section className="max-w-7xl mx-auto p-4">
      <header className="mb-6">
        <Link to="/">
          <Logo />
        </Link>
        <p className="text-sm text-gray-500 mt-1">
          Seleccioná una provincia para ver los hoteles.
        </p>
      </header>

      <nav className="flex gap-2 mb-6 flex-wrap">
        {provinces.map((p) => (
          <button
            key={p.key}
            onClick={() => setSelected(p.key)}
            className={`px-4 py-2 rounded-2xl font-medium transition-shadow shadow-sm focus:outline-none whitespace-nowrap ${
              selected === p.key
                ? "bg-gray-900 text-white shadow-lg"
                : "bg-white text-gray-700 border border-gray-200 hover:shadow"
            }`}
          >
            {p.nombre}
          </button>
        ))}
      </nav>

      <div className="space-y-8">
        {[5, 4, 3, 2, 1].map((star) => {
          const hotels = grouped[star] || [];
          if (!hotels.length) return null;
          return (
            <div key={star}>
              <h3 className="text-lg font-semibold mb-3">
                {star} estrella{star > 1 ? "s" : ""}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {hotels.map((hotel) => (
                  <article
                    key={hotel.id}
                    className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
                  >
                    {/* clic en imagen abre url externa en nueva pestaña */}
                    <a
                      href={hotel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative h-44 md:h-36 lg:h-44 w-full bg-gray-100"
                    >
                      <img
                        src={hotel.img}
                        alt={hotel.name}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-black/70 text-white rounded-full px-3 py-1 text-sm">
                        {hotel.stars}★
                      </div>
                    </a>

                    <div className="p-4">
                      <h4 className="font-semibold text-sm truncate">
                        {hotel.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {hotel.short || `${hotel.stars} estrella(s)`}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: hotel.stars }).map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-4 h-4 text-yellow-500"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.839-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.044 9.393c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.966z" />
                            </svg>
                          ))}
                        </div>

                        <a
                          href={hotel.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50"
                        >
                          Ver detalle
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
