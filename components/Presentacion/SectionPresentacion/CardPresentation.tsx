import Image, { StaticImageData } from "next/image";

interface Props {
  title: string;
  image: string | StaticImageData;
  description: string;
}

export const CardPresentation = ({ title, image, description }: Props) => {
  return (
    <div className="group relative h-96 w-full [perspective:1000px]">
      <div className="relative h-full w-full rounded-xl shadow-xl transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-xl overflow-hidden">
          <Image
            src={image}
            alt="Imagen de tarjeta"
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div className="absolute inset-0 h-full w-full rounded-xl bg-black px-6 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex min-h-full flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-sm">{description}</p>
            <button className="mt-4 rounded-md bg-neutral-800 px-4 py-2 text-sm font-semibold hover:bg-neutral-900 transition-colors cursor-pointer">
              Explorar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
