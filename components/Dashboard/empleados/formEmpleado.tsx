"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Empleado } from "./typeEmpleado";

export const FormEmpleado = ({
  setEmpleados: setEmpleados,
}: {
  setEmpleados: React.Dispatch<React.SetStateAction<Empleado[]>>;
}) => {
  const [formData, setFormData] = useState({
    nombreE: "",
    nombre2E: "",
    apellidoE: "",
    apellido2E: "",
    dniE: "",
    telefonoE: "",
    emailE: "",
    contraseñaE: "",
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
      const res = await axios.post("http://localhost:8080/empleados", {
        ...formData,
      });

      setFormData({
        nombreE: "",
        nombre2E: "",
        apellidoE: "",
        apellido2E: "",
        dniE: "",
        telefonoE: "",
        emailE: "",
        contraseñaE: "",
      });

      setEmpleados(prev => [...prev, res.data]);

      setDialog({
        open: true,
        title: "Éxito",
        message: "Empleado agregado con éxito.",
        success: true,
      });
    } catch (error: any) {
      setDialog({
        open: true,
        title: "Error",
        message: axios.isAxiosError(error)
          ? error.response?.data?.message || "No se pudo agregar el empleado."
          : "Ocurrió un error inesperado.",
        success: false,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="nombre">Nombre</Label>
          <Input type="text" name="nombreE" value={formData.nombreE} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="nombre2">Segundo Nombre</Label>
          <Input type="text" name="nombre2E" value={formData.nombre2E} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="apellidop">Apellido Paterno</Label>
          <Input type="text" name="apellidoE" value={formData.apellidoE} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="apellido2">Apellido Materno</Label>
          <Input type="text" name="apellido2E" value={formData.apellido2E} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="dni">DNI</Label>
          <Input type="text" name="dniE" value={formData.dniE} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="name">Telefono</Label>
          <Input type="text" name="telefonoE" value={formData.telefonoE} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="name">Email</Label>
          <Input type="text" name="emailE" value={formData.emailE} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="name">Contraseña</Label>
          <Input type="text" name="contraseñaE" value={formData.contraseñaE} onChange={handleChange} required />
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
