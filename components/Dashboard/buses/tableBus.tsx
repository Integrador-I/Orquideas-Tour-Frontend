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

interface TableBusProps {
  buses: any[];
  setBuses: React.Dispatch<React.SetStateAction<any[]>>;
}

export const TableBus = ({ buses, setBuses }: TableBusProps) => {
  const [editBus, setEditBus] = useState<any | null>(null);
  const [editData, setEditData] = useState({
    plate: "",
    type: "",
    capacity: "",
    state: "activo",
  });

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get("http://localhost:8080/bus");
        setBuses(response.data);
      } catch (error) {
        console.error("Error al obtener buses:", error);
      }
    };

    fetchBuses();
  }, [setBuses]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/bus/${id}`);
      setBuses((prev) => prev.filter((bus) => bus.id !== id));
    } catch (error) {
      console.error("Error al eliminar el bus:", error);
    }
  };

  const openEditModal = (bus: any) => {
    setEditBus(bus);
    setEditData({
      plate: bus.plate,
      type: bus.type,
      capacity: bus.capacity.toString(),
      state: bus.state,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    if (!editBus) return;

    try {
      const updated = {
        ...editData,
        capacity: parseInt(editData.capacity),
      };

      await axios.put(`http://localhost:8080/bus/${editBus.id}`, updated);

      setBuses((prev) =>
        prev.map((bus) => (bus.id === editBus.id ? { ...bus, ...updated } : bus))
      );

      setEditBus(null);
    } catch (error) {
      console.error("Error al actualizar bus:", error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Plate</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">Capacity</th>
            <th className="px-6 py-3">State</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr
              key={bus.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{bus.id}</td>
              <td className="px-6 py-4">{bus.plate}</td>
              <td className="px-6 py-4">{bus.type}</td>
              <td className="px-6 py-4">{bus.capacity}</td>
              <td className="px-6 py-4">{bus.state}</td>
              <td className="px-6 py-4 flex gap-2">
                <button
                  onClick={() => openEditModal(bus)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(bus.id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edición */}
      <Dialog open={!!editBus} onOpenChange={() => setEditBus(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Bus</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="plate">Plate</Label>
              <Input
                name="plate"
                value={editData.plate}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Input
                name="type"
                value={editData.type}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                name="capacity"
                type="number"
                value={editData.capacity}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <select
                name="state"
                value={editData.state}
                onChange={handleEditChange}
                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
              >
                <option value="activo">Activo</option>
                <option value="mantenimiento">Mantenimiento</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEditSubmit}>Guardar</Button>
            <Button variant="outline" onClick={() => setEditBus(null)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
