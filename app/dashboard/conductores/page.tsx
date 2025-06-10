"use client";

import { FormConductor } from "@/components/Dashboard/conductores/formDrive";
import { TableConductor } from "@/components/Dashboard/conductores/tableConductor";
import { Conductor } from "@/components/Dashboard/conductores/typeConductor";
import { useState } from "react";

export default function Conductores(){
      const [conductores, setConductores] = useState<Conductor[]>([]);
     return (
    <div className="min-h-screen px-4 py-8 bg-white">
      <div className="flex flex-col lg:flex-row justify-center items-start gap-8">
        <div className="flex flex-col w-full max-w-md">
          <h1 className="text-4xl font-semibold mb-8">Administración de Conductores</h1>
          <div className="p-6 rounded-lg shadow-md">
            <FormConductor setConductores={setConductores} />
          </div>
        </div>
        <div className="w-full flex-1 max-w-4xl pt-19">
          <TableConductor conductores={conductores} setConductores={setConductores} />
        </div>
      </div>
    </div>
  );
} 