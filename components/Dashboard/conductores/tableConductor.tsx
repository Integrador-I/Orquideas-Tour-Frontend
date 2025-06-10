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
import { Conductor } from "./typeConductor";

interface Props {
  conductores: Conductor[];
  setConductores: React.Dispatch<React.SetStateAction<Conductor[]>>;
}

export const TableConductor = ({ conductores, setConductores }: Props) => {
  const [editConductor, setEditConductor] = useState<Conductor | null>(null);
  const [editData, setEditData] = useState({
    name: "",
    lastname: "",
    dni: "",
    phone: "",
    email: "",
    license: "",
    expiration: "",
    income: "",
    state: "activo",
  });

  useEffect(() => {
    const fetchConductores = async () => {
      try {
        const res = await axios.get("http://localhost:8080/conductores");
        setConductores(res.data);
      } catch (err) {
        console.error("Error al obtener conductores", err);
      }
    };

    fetchConductores();
  }, [setConductores]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/conductores/${id}`);
      setConductores(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error("Error al eliminar conductor", err);
    }
  };

  const openEditModal = (conductor: Conductor) => {
    setEditConductor(conductor);
    setEditData({
      name: conductor.name,
      lastname: conductor.lastname,
      dni: conductor.dni,
      phone: conductor.phone,
      email: conductor.email,
      license: conductor.license,
      expiration: conductor.expiration,
      income: conductor.income,
      state: conductor.state,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    if (!editConductor) return;

    try {
      await axios.put(`http://localhost:8080/conductores/${editConductor.id}`, {
        ...editData,
      });

      setConductores(prev =>
        prev.map(c => (c.id === editConductor.id ? { ...c, ...editData } : c))
      );
      setEditConductor(null);
    } catch (err) {
      console.error("Error al actualizar conductor", err);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Apellido</th>
            <th className="px-4 py-2">DNI</th>
            <th className="px-4 py-2">Teléfono</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Licencia</th>
            <th className="px-4 py-2">Expira</th>
            <th className="px-4 py-2">Ingreso</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {conductores.map(c => (
            <tr key={c.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-4 py-2">{c.id}</td>
              <td className="px-4 py-2">{c.name}</td>
              <td className="px-4 py-2">{c.lastname}</td>
              <td className="px-4 py-2">{c.dni}</td>
              <td className="px-4 py-2">{c.phone}</td>
              <td className="px-4 py-2">{c.email}</td>
              <td className="px-4 py-2">{c.license}</td>
              <td className="px-4 py-2">{c.expiration}</td>
              <td className="px-4 py-2">{c.income}</td>
              <td className="px-4 py-2">{c.state}</td>
              <td className="px-4 py-2 space-x-2">
                <button onClick={() => openEditModal(c)} className="text-blue-600 hover:underline">Editar</button>
                <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:underline">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={!!editConductor} onOpenChange={() => setEditConductor(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Conductor</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input name="name" value={editData.name} onChange={handleChange} placeholder="Nombre" />
            <Input name="lastname" value={editData.lastname} onChange={handleChange} placeholder="Apellido" />
            <Input name="dni" value={editData.dni} onChange={handleChange} placeholder="DNI" />
            <Input name="phone" value={editData.phone} onChange={handleChange} placeholder="Teléfono" />
            <Input name="email" value={editData.email} onChange={handleChange} placeholder="Email" />
            <Input name="license" value={editData.license} onChange={handleChange} placeholder="Licencia" />
            <Input name="expiration" type="date" value={editData.expiration} onChange={handleChange} />
            <Input name="income" type="date" value={editData.income} onChange={handleChange} />
            <select
              name="state"
              value={editData.state}
              onChange={handleChange}
              className="w-full rounded border p-2 text-sm"
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
          <DialogFooter>
            <Button onClick={handleEditSubmit}>Guardar</Button>
            <Button variant="outline" onClick={() => setEditConductor(null)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
