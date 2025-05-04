"use client";
import { useState, useEffect } from "react";

const statuses = [
  {
    key: "confirmed",
    titulo: "Orden Confirmada",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    key: "paid",
    titulo: "Pago Confirmado",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5 1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    key: "shipped",
    titulo: "En Camino",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        <path fillRule="evenodd" d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zm11 3a1 1 0 011-1h1a1 1 0 011 1v8a1 1 0 01-1 1h-1.05a2.5 2.5 0 00-4.9 0H13a1 1 0 01-1-1V7z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    key: "delivered",
    titulo: "Llegó a Destino",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    )
  }
];

export const EstadoDePedido = () => {
 
  const [currentStatus, setCurrentStatus] = useState("paid"); 

  const currentIndex = statuses.findIndex((s) => s.key === currentStatus);

  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative flex items-center justify-between w-full max-w-4xl">
        {statuses.map((status, index) => (
          <div key={status.key} className="flex flex-col items-center relative z-10 w-1/4">
            <div
              className={`group relative transition-colors duration-300 ${
                index <= currentIndex ? "text-blue-600" : "text-gray-300"
              }`}
            >
              <div
                className={`p-2 rounded-full bg-white border-2 border-current transition-opacity duration-700 ${
                  index <= currentIndex ? "opacity-100" : "opacity-30"
                }`}
              >
                {status.icon}
              </div>
              <span className="mt-2 text-sm text-center">{status.titulo}</span>
            </div>

            {index < statuses.length - 1 && (
              <div
                className={`absolute h-1 w-full top-1/2 -translate-y-1/2 left-1/2 -z-10 ${
                  index < currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
