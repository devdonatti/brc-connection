import React from "react";
import BannerCard from "./BannerCard";

export default function FeaturedGrid({ items }) {
  // Parche para evitar keys duplicadas: combinamos id + índice
  const uniqueItems = items.map((it, i) => ({
    ...it,
    uniqueKey: `${it.id}-${i}`,
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {uniqueItems.map((it) => (
        <BannerCard key={it.uniqueKey} item={it} />
      ))}
    </div>
  );
}
