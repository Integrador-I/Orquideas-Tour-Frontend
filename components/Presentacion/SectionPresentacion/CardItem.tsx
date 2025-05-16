import { CardPresentation } from "./CardPresentation";

const cardItems = [
  {
    id: 1,
    title: "Arequipa",
    image: "/images/imageCardArequipa.jpg",
    description:
      "En tu ruta por Arequipa, maravíllate con la arquitectura de sillar bajo la sombra del Misti",
  },
  {
    id: 2,
    title: "Omate",
    image: "/images/omate.jpg",
    description:
      "En tu ruta por Omate, descubre paisajes volcánicos únicos y sumérgete en la riqueza de sus tradiciones ancestrales",
  },
  {
    id: 3,
    title: "Quinistaquillas",
    image: "/images/Quinistaquillas.jpg",
    description:
      "En tu ruta por Quinistaquillas, adéntrate en un paisaje donde la naturaleza ha esculpido formaciones rocosas sorprendentes y cañones misteriosos",
  },
];

export const CardItem = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent py-10 px-4">
      <h2 className="text-5xl font-bold mb-8 text-white ">Explora las rutas</h2>
      <div className="flex flex-wrap justify-center gap-6 max-w-7xl">
        {cardItems.map((item) => (
          <div key={item.id} className="w-full sm:w-80 md:w-72 lg:w-64 xl:w-64">
            <CardPresentation {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};
