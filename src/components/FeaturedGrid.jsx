import React from "react";
import BannerCard from "./BannerCard";

export default function FeaturedGrid({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((it) => (
        <BannerCard key={it.id} item={it} />
      ))}
    </div>
  );
}
