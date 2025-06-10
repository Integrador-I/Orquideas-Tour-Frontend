"use client";

import { useState } from "react";
import { FormBus } from "@/components/Dashboard/buses/form";
import { TableBus } from "@/components/Dashboard/buses/tableBus";
import { Bus } from "@/components/Dashboard/buses/types";

export default function Buses() {
  const [buses, setBuses] = useState<Bus[]>([]);

  return (
    <div className="min-h-screen px-4 py-8 flex flex-col items-center bg-white">
      <h1 className="text-2xl font-semibold mb-6">Administración de Buses</h1>

      <div className="w-full max-w-md p-6 rounded-lg">
        <FormBus setBuses={setBuses} />
      </div>

      <div className="w-full max-w-4xl">
        <TableBus buses={buses} setBuses={setBuses} />
      </div>
    </div>
  );
}
