"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Conductor } from "./typeConductor";

export const FormConductor = ({
  setConductores,
}: {
  setConductores: React.Dispatch<React.SetStateAction<Conductor[]>>;
}) => {
  const [formData, setFormData] = useState({
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

  const [dialog, setDialog] = useState({
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
      const res = await axios.post("http://localhost:8080/conductores", {
        ...formData,
        expiration: formData.expiration,
        income: formData.income,
      });

      setFormData({
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

      setConductores(prev => [...prev, res.data]);

      setDialog({
        open: true,
        title: "Éxito",
        message: "Conductor agregado con éxito.",
        success: true,
      });
    } catch (error: any) {
      setDialog({
        open: true,
        title: "Error",
        message: axios.isAxiosError(error)
          ? error.response?.data?.message || "No se pudo agregar el conductor."
          : "Ocurrió un error inesperado.",
        success: false,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="lastname">Apellido</Label>
          <Input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="dni">DNI</Label>
          <Input type="text" name="dni" value={formData.dni} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="phone">Teléfono</Label>
          <Input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="email">Correo</Label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="license">Licencia</Label>
          <Input type="text" name="license" value={formData.license} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="expiration">Vencimiento Licencia</Label>
          <Input type="date" name="expiration" value={formData.expiration} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="state">Estado</Label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
            required
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <div>
          <Label htmlFor="income">Fecha de Ingreso</Label>
          <Input type="date" name="income" value={formData.income} onChange={handleChange} required />
        </div>
        <Button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          Guardar
        </Button>
      </form>

      <Dialog open={dialog.open} onOpenChange={(open) => setDialog(prev => ({ ...prev, open }))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={dialog.success ? "text-green-600" : "text-red-600"}>
              {dialog.title}
            </DialogTitle>
            <DialogDescription>{dialog.message}</DialogDescription>
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
