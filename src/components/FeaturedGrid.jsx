import React, { useState, useEffect } from "react";
import BannerCard from "./BannerCard";

export default function FeaturedGrid({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tiempo entre cambios (en ms)
  const intervalTime = 3000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [items.length]);

  // Selecciona los 3 ítems que se muestran al mismo tiempo
  const visibleItems = [
    items[currentIndex],
    items[(currentIndex + 1) % items.length],
    items[(currentIndex + 2) % items.length],
    items[(currentIndex + 3) % items.length],
    items[(currentIndex + 4) % items.length],
    items[(currentIndex + 5) % items.length],
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 transition-all duration-700 ease-in-out">
      {visibleItems.map((item, i) => (
        <BannerCard key={`${item.id}-${i}`} item={item} />
      ))}
    </div>
  );
}
