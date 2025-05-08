import { CardPropsRutas } from "./CardPropsRutas";


const cardItems =[
    {
        id:1,
        title:'Arequipa',
        image: "/images/imageCardArequipa.jpg",
        description:"En tu ruta por Arequipa, maravíllate con la arquitectura de sillar bajo la sombra del Misti"
    },
    {
        id:2,
        title:'Omate',
        image: "/images/omate.jpg",
        description:"En tu ruta por Omate, descubre paisajes volcánicos únicos y sumérgete en la riqueza de sus tradiciones ancestrales"
    },
    {
        id:3,
        title:'Quinistaquillas',
        image: "/images/Quinistaquillas.jpg",
        description:"En tu ruta por Quinistaquillas, adéntrate en un paisaje donde la naturaleza ha esculpido formaciones rocosas sorprendentes y cañones misteriosos"
    },
]

export const CardItemRutas = () => {
    const renderCards = () => {
        return cardItems.map((item) => (
          <div key={item.id} className="w-full sm:w-[80%] md:w-[45%] lg:w-[30%] xl:w-[23%] p-4 border border-white rounded-3xl shadow-lg mb-6 hover:scale-105 transition-transform duration-300"> 
            <CardPropsRutas {...item} /> 
          </div>
        ));
      };
    
      return (
  
          <div className="max-w-[1200px] mx-auto pb-28">  
          <h2 className="text-center pb-8 md:pb-12 text-2xl sm:text-3xl md:text-4xl text-[#111722] dark:text-white">WE OFFER THIS FOR YOU</h2>        
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 ">
              {renderCards()} 
            </div>
          </div>
      );
    };
