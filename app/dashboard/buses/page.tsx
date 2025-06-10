"use client";

import { useState } from "react";
import { FormBus } from "@/components/Dashboard/buses/form";
import { TableBus } from "@/components/Dashboard/buses/tableBus";
import { Bus } from "@/components/Dashboard/buses/types";

export default function Buses() {
  const [buses, setBuses] = useState<Bus[]>([]);

  return (
    <div className="min-h-screen px-4 py-8 bg-white">
      <div className="flex flex-col lg:flex-row justify-center items-start gap-8">
        <div className="flex flex-col w-full max-w-md">
          <h1 className="text-4xl font-semibold mb-8">Administración de Buses</h1>
          <div className="p-6 rounded-lg shadow-md">
            <FormBus setBuses={setBuses} />
          </div>
        </div>
        <div className="w-full flex-1 max-w-4xl pt-19">
          <TableBus buses={buses} setBuses={setBuses} />
        </div>
      </div>
    </div>
  );
}