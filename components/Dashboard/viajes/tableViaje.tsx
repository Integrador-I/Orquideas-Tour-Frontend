// components/Dashboard/viajes/TableViaje.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ViajeDTO } from "./typeViaje";

interface TableViajeProps {
  viajes: ViajeDTO[];
  setViajes: React.Dispatch<React.SetStateAction<ViajeDTO[]>>;
}

export const TableViaje = ({ viajes, setViajes }: TableViajeProps) => {
  const [editViaje, setEditViaje] = useState<ViajeDTO | null>(null);
  const [editData, setEditData] = useState({
    salida: "",
    llegada: "",
  });

  useEffect(() => {
    const fetchViajes = async () => {
      try {
        const res = await axios.get("http://localhost:8080/viajes/table");
        setViajes(res.data);
      } catch (error) {
        console.error("Error al obtener viajes:", error);
      }
    };

    fetchViajes();
  }, [setViajes]);

  const openEditModal = (viaje: ViajeDTO) => {
    setEditViaje(viaje);
    setEditData({
      salida: viaje.salida,
      llegada: viaje.llegada,
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/viajes/${id}`);
      setViajes((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error("Error al eliminar viaje:", error);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    if (!editViaje) return;

    try {
      const updated = {
        ...editViaje,
        salida: editData.salida,
        llegada: editData.llegada,
      };

      await axios.put(`http://localhost:8080/viajes/${editViaje.id}`, updated);

      setViajes((prev) =>
        prev.map((v) => (v.id === editViaje.id ? { ...v, ...updated } : v))
      );

      setEditViaje(null);
    } catch (error) {
      console.error("Error al actualizar viaje:", error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Salida</th>
            <th className="px-6 py-3">Llegada</th>
            <th className="px-6 py-3">Placa</th>
            <th className="px-6 py-3">Origen</th>
            <th className="px-6 py-3">Destino</th>
            <th className="px-6 py-3">Conductor</th>
            <th className="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {viajes.map((v) => (
            <tr key={v.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">{v.id}</td>
              <td className="px-6 py-4">{v.salida}</td>
              <td className="px-6 py-4">{v.llegada}</td>
              <td className="px-6 py-4">{v.plate}</td>
              <td className="px-6 py-4">{v.origin}</td>
              <td className="px-6 py-4">{v.destination}</td>
              <td className="px-6 py-4">{v.name} {v.lastname}</td>
              <td className="px-6 py-4 flex gap-2">
                <button
                  onClick={() => openEditModal(v)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(v.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edición */}
      <Dialog open={!!editViaje} onOpenChange={() => setEditViaje(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Viaje</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="salida">Salida</Label>
              <Input
                type="date"
                name="salida"
                value={editData.salida}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <Label htmlFor="llegada">Llegada</Label>
              <Input
                type="date"
                name="llegada"
                value={editData.llegada}
                onChange={handleEditChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEditSubmit}>Guardar</Button>
            <Button variant="outline" onClick={() => setEditViaje(null)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
