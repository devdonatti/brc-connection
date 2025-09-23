import React from "react";

export default function SidebarRight() {
  const ads = [
    "/assets/banner3.jpg",
    "/assets/banner1.jpg",
    "/assets/banner2.jpg",
  ];
  return (
    <aside className="hidden lg:block">
      <div className="space-y-4">
        {ads.map((src, i) => (
          <a
            key={i}
            href="#"
            className="block overflow-hidden rounded bg-black/60"
          >
            <img
              src={src}
              alt={`ad-${i}`}
              className="w-full h-36 object-cover"
            />
          </a>
        ))}
      </div>
    </aside>
  );
}
