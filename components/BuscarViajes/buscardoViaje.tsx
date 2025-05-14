"use client";

import { CalendarioFecha } from "./CalendarioFecha";

import { SelectDemo } from "./selectionRuta";



export default function BuscadorViaje() {
    return (
        <div className="flex flex-wrap items-center justify-between gap-2 bg-white rounded-full shadow-lg p-4 ">
            <div className="flex items-center gap-2">
                <i className="text-gray-500 text-2xl">🚌</i>
                <div>
                    <p className="text-xs text-gray-500">Desde</p>
                    <SelectDemo/>
                </div>
            </div>

            <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                <i className="text-gray-500 text-2xl">🚌</i>
                <div>
                    <p className="text-xs text-gray-500">Hasta</p>
                    <SelectDemo/>
                </div>
            </div>
            <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                <div>
                    <p className="text-xs text-gray-500">Fecha de ida</p>
                    <CalendarioFecha label="Fecha de ida" />
                </div>
            </div>
            <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                <div>
                    <p className="text-xs text-gray-500">Fecha de vuelta</p>
                    <CalendarioFecha label="Fecha de vuelta" optional />
                </div>
            </div>
            <button className="bg-red-500 text-white font-bold px-6 py-2 rounded-full hover:bg-red-600 transition cursor-pointer">
                BUSCAR
            </button>
        </div>
    );
}
