"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Empleado } from "./typeEmpleado";

interface Props {
  empleados: Empleado[];
  setEmpleados: React.Dispatch<React.SetStateAction<Empleado[]>>;
}

export const TableEmpleado = ({empleados, setEmpleados: setEmpleados }: Props) => {
  const [editEmpleado, setEditEmpleado] = useState<Empleado | null>(null);
  const [editData, setEditData] = useState({
    nombreE: "",
    nombre2E: "",
    apellidoE: "",
    apellido2E: "",
    dniE: "",
    telefonoE: "",
    emailE: "",
    contraseñaE: "",
  });

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const res = await axios.get("http://localhost:8080/empleados");
        setEmpleados(res.data);
      } catch (err) {
        console.error("Error al obtener empleados", err);
      }
    };

    fetchEmpleados();
  }, [setEmpleados]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/conductores/${id}`);
      setEmpleados(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error("Error al eliminar empleado", err);
    }
  };

  const openEditModal = (empleado: Empleado) => {
    setEditEmpleado(empleado);
    setEditData({
      nombreE: empleado.nombreE,
      nombre2E: empleado.nombre2E,
      apellidoE: empleado.apellidoE,
      apellido2E: empleado.apellido2E,
      dniE: empleado.dniE,
      telefonoE: empleado.telefonoE,
      emailE: empleado.emailE,
      contraseñaE: empleado.contraseñaE,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name: nombreE, value } = e.target;
    setEditData(prev => ({ ...prev, [nombreE]: value }));
  };

  const handleEditSubmit = async () => {
    if (!editEmpleado) return;

    try {
      await axios.put(`http://localhost:8080/conductores/${editEmpleado.id}`, {
        ...editData,
      });

      setEmpleados(prev =>
        prev.map(c => (c.id === editEmpleado.id ? { ...c, ...editData } : c))
      );
      setEditEmpleado(null);
    } catch (err) {
      console.error("Error al actualizar empleado", err);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Segundo Nombre</th>
            <th className="px-4 py-2">Apellido Paterno</th>
            <th className="px-4 py-2">Apellido Materno</th>
            <th className="px-4 py-2">DNI</th>
            <th className="px-4 py-2">Correo</th>
            <th className="px-4 py-2">Telefono</th>
            <th className="px-4 py-2">Contraseña</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map(c => (
            <tr key={c.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-4 py-2">{c.id}</td>
              <td className="px-4 py-2">{c.nombreE}</td>
              <td className="px-4 py-2">{c.nombre2E}</td>
              <td className="px-4 py-2">{c.apellidoE}</td>
              <td className="px-4 py-2">{c.apellido2E}</td>
              <td className="px-4 py-2">{c.dniE}</td>
              <td className="px-4 py-2">{c.contraseñaE}</td>
              <td className="px-4 py-2">{c.telefonoE}</td>
              <td className="px-4 py-2">{c.contraseñaE}</td>
              <td className="px-4 py-2 space-x-2">
                <button onClick={() => openEditModal(c)} className="text-blue-600 hover:underline">Editar</button>
                <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:underline">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={!!editEmpleado} onOpenChange={() => setEditEmpleado(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Conductor</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input name="nombre" value={editData.nombreE} onChange={handleChange} placeholder="Nombre" />
            <Input name="nombre2E" value={editData.nombre2E} onChange={handleChange} placeholder="Segundo Nombre" />
            <Input name="apellidoE" value={editData.apellidoE} onChange={handleChange} placeholder="Apellido Parterno" />
            <Input name="apellidoE2" value={editData.apellido2E} onChange={handleChange} placeholder="Apellido Materno" />
            <Input name="dniE" value={editData.dniE} onChange={handleChange} placeholder="DNI" />
            <Input name="telefonoE" value={editData.telefonoE} onChange={handleChange} placeholder="Telefono" />
            <Input name="emailE" value={editData.emailE} onChange={handleChange} placeholder="Correo" />
            <Input name="contraseñaE" value={editData.contraseñaE} onChange={handleChange} placeholder="Contraseña" />
            
          </div>
          <DialogFooter>
            <Button onClick={handleEditSubmit}>Guardar</Button>
            <Button variant="outline" onClick={() => setEditEmpleado(null)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
