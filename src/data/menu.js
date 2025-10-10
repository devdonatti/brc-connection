export const menuItems = [
  { id: 1, label: "Home", href: "#" },
  { id: 2, label: "Galería de Fotos", href: "#" },
  { id: 3, label: "BRC Eventos", href: "#" },
  { id: 4, label: "Centros Turísticos", href: "#" },
  { id: 5, label: "Datos de Interés", href: "#" },
  { id: 6, label: "Contacto", href: "#" },

  // Hospedaje con submenus
  {
    id: 7,
    label: "Hospedaje",
    href: "/hospedajes",
    submenu: [
      { id: 71, label: "Buenos Aires", href: "/hospedaje/buenos-aires" },
      { id: 72, label: "Bariloche", href: "/hospedaje/bariloche" },
      { id: 73, label: "Rosario", href: "/hospedaje/rosario" },
    ],
  },

  { id: 8, label: "Eventos Especiales", href: "#" },
  { id: 9, label: "Excursiones", href: "#" },
  { id: 10, label: "Argentina at Night", href: "#" },
  { id: 11, label: "Bariloche at night", href: "#" },
  { id: 12, label: "Villa Carlos Paz at night", href: "#" },
  { id: 13, label: "Rosario at night", href: "#" },
  { id: 14, label: "Brc Contactos", href: "#" },
  { id: 15, label: "Agencia de Viajes", href: "#" },
  { id: 16, label: "Restaurantes and restó", href: "#" },
  { id: 17, label: "Brc Contactos", href: "#" },
];
