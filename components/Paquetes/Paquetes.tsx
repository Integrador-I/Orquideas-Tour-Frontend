"use client";

import React, { useState } from "react";
import { BotonPaquetes } from "./botonPaquetes";
import Image from "next/image";

export const Paquetes = () => {
  const [indiceActual, setIndiceActual] = useState(0);

  const paquetes = [
    {
      talla: "Sobre A4",
      detalle: `Documentos simples en sobre manila: <br><br>Tamaño<br><strong>A4</strong>`,
      imagen: "/images/foto.png"
    },
    {
      talla: "Caja S",
      detalle: `Las dimensiones del paquete deben estar dentro del rango de: <br><br>10 x 20 x 15 cm<br><strong>Peso máx. 2 kg</strong>`,
      imagen: "/images/foto.png"
    },
    {
      talla: "Caja M",
      detalle: `Las dimensiones del paquete deben estar dentro del rango de: <br><br>24 x 30 x 20 cm<br><strong>Peso máx. 5 kg</strong>`,
      imagen: "/images/foto.png"
    },
    {
      talla: "Caja XL",
      detalle: `Las dimensiones del paquete deben estar dentro del rango de: <br><br>40 x 50 x 30 cm<br><strong>Peso máx. 10 kg</strong>`,
      imagen: "/images/foto.png"
    },
    {
      talla: "Caja XXL",
      detalle: `Las dimensiones del paquete deben estar dentro del rango de: <br><br>50 x 60 x 40 cm<br><strong>Peso máx. 15 kg</strong>`,
      imagen: "/images/foto.png"
    }
  ];

  const CambiarPaquete = () => {
    setIndiceActual((indiceActual + 1) % paquetes.length);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-7xl px-4 py-6">
      {/* Encabezado */}
      <div className="text-center mb-6">
        <h1 className="text-4xl text-amber-600 font-bold mb-2">
          ¿Qué tipo de producto deseas enviar?
        </h1>
        <p className="font-bold text-[#838383]">Elige un paquete</p>
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {/* Tarjeta 1 */}
        <div className="p-5 bg-white text-black rounded-[20px] overflow-hidden flex flex-col shadow-md">
          <h3 className="font-light opacity-90">Elija el paquete</h3>
          <h2 className="font-bold">Producto a enviar</h2>
          <h2 className="font-bold">{paquetes[indiceActual].talla}</h2>
          <div
            className="mt-4 opacity-90"
            dangerouslySetInnerHTML={{ __html: paquetes[indiceActual].detalle }}
          />
          <Image
            src={paquetes[indiceActual].imagen}
            alt="Imagen Paquete"
            width={500}
            height={300}
            className="w-full h-auto object-contain mt-4"
          />
          <BotonPaquetes onClick={CambiarPaquete} />
        </div>

        {/* Tarjeta 2 */}
        <div className="p-5 bg-white text-black rounded-[20px] overflow-hidden flex flex-col shadow-md">
          <h3 className="font-light opacity-90">¿Quién realiza el envío?</h3>
          <div className="mt-4 opacity-90 space-y-4">
            {["DNI", "Nombre completo", "Apellido Paterno", "Apellido Materno", "Celular"].map(
              (placeholder, i) => (
                <div key={i}>
                  <strong>{placeholder}</strong>
                  <input
                    type={placeholder === "Celular" || placeholder === "DNI" ? "number" : "text"}
                    placeholder={placeholder}
                    className="w-full p-2 border rounded mt-1"
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Tarjeta 3 */}
        <div className="p-5 bg-white text-black rounded-[20px] overflow-hidden flex flex-col shadow-md">
          <h3 className="font-light opacity-90">¿Quién recibe el envío?</h3>
          <div className="mt-4 opacity-90 space-y-4">
            {["DNI", "Nombre completo", "Apellido Paterno", "Apellido Materno", "Celular"].map(
              (placeholder, i) => (
                <div key={i}>
                  <strong>{placeholder}</strong>
                  <input
                    type={placeholder === "Celular" || placeholder === "DNI" ? "number" : "text"}
                    placeholder={placeholder}
                    className="w-full p-2 border rounded mt-1"
                  />
                </div>
              )
            )}

            <button className="w-full bg-[#3b5998] text-white py-3 px-4 rounded-[10px] text-base font-bold transition-all duration-200 hover:scale-[1.02]">
              Continuar
            </button>

            <div
              id="registroMensaje"
              className="hidden mt-4 font-bold text-white text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#3b5998] py-5 px-10 rounded-[10px] shadow-[0_0_20px_rgba(0,0,0,0.3)] text-xl z-[999] w-auto min-w-[250px] max-w-[500px]"
            >
              Se ha registrado correctamente
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
