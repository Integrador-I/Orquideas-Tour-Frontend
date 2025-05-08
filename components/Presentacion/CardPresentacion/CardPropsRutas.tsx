import Image, { StaticImageData } from "next/image"
interface Props{
    title:string,
    image:string | StaticImageData,
    description:string;
}
export const CardPropsRutas = ({title, image, description}: Props) => {
    return (
      <div className="flex flex-col h-full bg-white rounded-xl shadow-lg dark:bg-gray-800">
        <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-xl">
          <Image 
            src={image}
            fill
            alt={title}
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
        </div>
        
        <div className="p-4 sm:p-6 flex-1">
          <h5 className="text-lg sm:text-xl font-semibold mb-3 text-center text-gray-800 dark:text-white">
            {title}
          </h5>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-justify leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    );
  };
