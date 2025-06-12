"use client";


import { FormEmpleado } from "@/components/Dashboard/empleados/formEmpleado";
import { TableEmpleado } from "@/components/Dashboard/empleados/tableEmpleado";
import { useState } from "react";
import { Empleado } from '../../../components/Dashboard/empleados/typeEmpleado';


export default function Empleados(){
    const [empleados, setEmpleados] = useState<Empleado[]>([])

    return (
        <div className="min-h-screen px-4 py-8 bg-white">
          <div className="flex flex-col lg:flex-row justify-center items-start gap-8">
            <div className="flex flex-col w-full max-w-md">
              <h1 className="text-4xl font-semibold mb-8">Administración de Empleado</h1>
              <div className="p-6 rounded-lg shadow-md">
                <FormEmpleado setEmpleados={setEmpleados} />
              </div>
            </div>
            <div className="w-full flex-1 max-w-4xl pt-19">
              <TableEmpleado empleados={empleados} setEmpleados={setEmpleados} />
            </div>
          </div>
        </div>
      );
} 
