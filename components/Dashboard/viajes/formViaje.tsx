"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Conductor } from "../conductores/typeConductor";
import { Bus } from "../buses/types";
import { ViajeDTO } from "./typeViaje";
import { Ruta } from "./typeRuta";


export const FormViaje = ({ setViajes }: { setViajes: any }) => {
    const [formData, setFormData] = useState({
        salida: "",
        llegada: "",
        rutaId: "",
        conductorId: "",
        busId: "",
    });

    const [rutas, setRutas] = useState<Ruta[]>([]);
    const [conductores, setConductores] = useState<Conductor[]>([]);
    const [buses, setBuses] = useState<Bus[]>([]);

    const [dialog, setDialog] = useState({
        open: false,
        title: "",
        message: "",
        success: false,
    });

    useEffect(() => {
        axios.get("http://localhost:8080/rutas").then(res => setRutas(res.data));
        axios.get("http://localhost:8080/conductores").then(res => setConductores(res.data));
        axios.get("http://localhost:8080/bus").then(res => setBuses(res.data));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // 1. Crear el viaje
            await axios.post("http://localhost:8080/viajes", {
                salida: formData.salida,
                llegada: formData.llegada,
                rutas: { id: Number(formData.rutaId) },
                conductores: { id: Number(formData.conductorId) },
                bus: { id: Number(formData.busId) },
            });

            // 2. RE‑FETCH: traer la lista mapeada a ViajeDTO
            const { data } = await axios.get("http://localhost:8080/viajes/table");
            setViajes(data);                                    //  <‑‑ aquí actualizas todo

            // 3. Limpieza y diálogo
            setFormData({ salida: "", llegada: "", rutaId: "", conductorId: "", busId: "" });
            setDialog({
                open: true,
                title: "Éxito",
                message: "Viaje creado correctamente.",
                success: true,
            });
        } catch (error: any) {
            setDialog({
                open: true,
                title: "Error",
                message: axios.isAxiosError(error)
                    ? error.response?.data?.message || "No se pudo crear el viaje."
                    : "Ocurrió un error inesperado.",
                success: false,
            });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="salida">Salida</Label>
                    <Input type="date" id="salida" name="salida" value={formData.salida} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="llegada">Llegada</Label>
                    <Input type="date" id="llegada" name="llegada" value={formData.llegada} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="rutaId">Ruta</Label>
                    <select
                        name="rutaId"
                        id="rutaId"
                        value={formData.rutaId}
                        onChange={handleChange}
                        required
                        className="w-full border border-input rounded px-3 py-2 text-sm shadow-sm"
                    >
                        <option value="">Selecciona una ruta</option>
                        {rutas.map(r => (
                            <option key={r.id} value={r.id}>
                                {r.origin} - {r.destination}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <Label htmlFor="conductorId">Conductor</Label>
                    <select
                        name="conductorId"
                        id="conductorId"
                        value={formData.conductorId}
                        onChange={handleChange}
                        required
                        className="w-full border border-input rounded px-3 py-2 text-sm shadow-sm"
                    >
                        <option value="">Selecciona un conductor</option>
                        {conductores.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.name} {c.lastname}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <Label htmlFor="busId">Bus</Label>
                    <select
                        name="busId"
                        id="busId"
                        value={formData.busId}
                        onChange={handleChange}
                        required
                        className="w-full border border-input rounded px-3 py-2 text-sm shadow-sm"
                    >
                        <option value="">Selecciona un bus</option>
                        {buses.map(b => (
                            <option key={b.id} value={b.id}>
                                {b.plate}
                            </option>
                        ))}
                    </select>
                </div>

                <Button type="submit" className="w-full bg-black text-white">
                    Crear Viaje
                </Button>
            </form>

            <Dialog open={dialog.open} onOpenChange={open => setDialog(prev => ({ ...prev, open }))}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className={dialog.success ? "text-green-600" : "text-red-600"}>
                            {dialog.title}
                        </DialogTitle>
                        <DialogDescription>{dialog.message}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setDialog(prev => ({ ...prev, open: false }))}>Cerrar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
