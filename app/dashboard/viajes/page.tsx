"use client"
import { FormViaje } from "@/components/Dashboard/viajes/formViaje";
import { TableViaje } from "@/components/Dashboard/viajes/tableViaje";
import { ViajeDTO } from "@/components/Dashboard/viajes/typeViaje";
import {useState } from "react";

export default function ViajesPage()
{
    const [viajes, setViajes] = useState<ViajeDTO[]>([]);


    return(
        <div className="min-h-screen px-4 py-8 bg-white">
              <div className="flex flex-col lg:flex-row justify-center items-start gap-8">
                <div className="flex flex-col w-full max-w-md">
                  <h1 className="text-4xl font-semibold mb-8">Administración de Viajes</h1>
                  <div className="p-6 rounded-lg shadow-md">
                    <FormViaje setViajes={setViajes} />
                  </div>
                </div>
                <div className="w-full flex-1 max-w-4xl pt-19">
                    <TableViaje viajes={viajes} setViajes={setViajes}/>
                </div>
              </div>
            </div>
    )
} 