"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export const FormBus = () => {
  const [formData, setFormData] = useState({
    plate: "",
    type: "",
    capacity: "",
    state: "activo",
  });

  const [dialog, setDialog] = useState<{
    open: boolean;
    title: string;
    message: string;
    success: boolean;
  }>({
    open: false,
    title: "",
    message: "",
    success: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/bus", {
        ...formData,
        capacity: parseInt(formData.capacity),
      });

      setFormData({ plate: "", type: "", capacity: "", state: "activo" });
      setDialog({
        open: true,
        title: "Éxito",
        message: "Bus agregado con éxito.",
        success: true,
      });
    } catch (error: any) {
      setDialog({
        open: true,
        title: "Error",
        message: axios.isAxiosError(error)
          ? error.response?.data?.message || "No se pudo agregar el bus."
          : "Ocurrió un error inesperado.",
        success: false,
      });
    }
  };

  return (
     <>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="plate">Plate</Label>
        <Input type="text" name="plate" id="plate" value={formData.plate} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <Input type="text" name="type" id="type" value={formData.type} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="capacity">Capacity</Label>
        <Input type="number" name="capacity" id="capacity" value={formData.capacity} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="state">State</Label>
        <select
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-black"
          required
        >
          <option value="activo">Activo</option>
          <option value="mantenimiento">Mantenimiento</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>
      <Button 
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        Submit
      </Button>
    </form>

    {/* Modal de respuesta */}
    <Dialog open={dialog.open} onOpenChange={(open) => setDialog(prev => ({ ...prev, open }))}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={dialog.success ? "text-green-600" : "text-red-600"}>
            {dialog.title}
          </DialogTitle>
          <DialogDescription>
            {dialog.message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setDialog(prev => ({ ...prev, open: false }))}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
  );
};
