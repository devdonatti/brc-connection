import React from "react";

export default function BannerCard({ item }) {
  return (
    <div className="bg-black/50 rounded overflow-hidden shadow-md">
      <img
        src={item.img}
        alt={item.title}
        className="w-full h-28 object-cover"
      />
      <div className="p-3">
        <h3 className="text-sm font-semibold">{item.title}</h3>
        <p className="text-xs text-white/60">{item.text}</p>
      </div>
    </div>
  );
}
