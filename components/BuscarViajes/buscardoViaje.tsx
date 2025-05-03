"use client";

import { CalendarioFecha } from "./CalendarioFecha";



export default function BuscadorViaje() {
    return (
        <div className="flex flex-wrap items-center justify-between gap-2 bg-white rounded-full shadow-lg p-4">
            <div className="flex items-center gap-2">
                <i className="text-gray-500">🚌</i>
                <div>
                    <p className="text-xs text-gray-500">Desde</p>
                    <p className="font-semibold">Arequipa (Todos)</p>
                </div>
            </div>

            <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                <i className="text-gray-500">🚌</i>
                <div>
                    <p className="text-xs text-gray-500">Hasta</p>
                    <p className="font-semibold">Terminal Terrestre De Abancay</p>
                    <p className="text-xs text-gray-400">Abancay</p>
                </div>
            </div>
            <div className="h-13 border-l border-gray-200 mx-2" />
            <CalendarioFecha label="Fecha de ida" />
            <div className="h-13 border-l border-gray-200 mx-2" />
            <CalendarioFecha label="Fecha de vuelta" optional />


            <button className="bg-red-500 text-white font-bold px-6 py-2 rounded-full hover:bg-red-600 transition">
                BUSCAR
            </button>
        </div>
    );
}
