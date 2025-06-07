"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trip } from "./TravelSearch";
import { BusFront } from "lucide-react";

interface DetallesModal {
  open: boolean;
  onClose: () => void;
  trip: Trip | null;
}

export default function DetallesModal({ open, onClose, trip }: DetallesModal) {
  if (!trip) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Detalles del viaje</DialogTitle>
        </DialogHeader>

        <div className="text-sm text-gray-700 mt-4">
          <div className="flex justify-between font-semibold border-b pb-2 mb-4">
            <div>Sale: {new Date(trip.date).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })}</div>
            <div>{trip.duration}</div>
            <div>Llega: {trip.date}</div>
          </div>

          <h3 className="text-md font-semibold mb-2">Itinerario</h3>
          <div className="flex gap-4 items-start mb-4">
            <div className="text-center text-xs">
              <div>13:00</div>
              <BusFront className="mx-auto text-blue-600 w-4 h-4 my-1" />
              <div className="text-xs">+4</div>
              <div>09:00</div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="border p-2 rounded">
                <strong>Lima</strong>
                <p className="text-xs text-gray-500">Sale de: Lima [Plaza Norte]</p>
                <a href="#" className="text-blue-500 text-xs underline">Ver ubicación</a>
              </div>
              <div className="border p-2 rounded">
                <strong>Arequipa</strong>
                <p className="text-xs text-gray-500">Llega a: Arequipa</p>
                <a href="#" className="text-blue-500 text-xs underline">Ver ubicación</a>
              </div>
            </div>
          </div>

          <h3 className="text-md font-semibold mb-2">Amenidades y servicios</h3>
          <div className="flex gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span>❄️</span> Aire acondicionado
            </div>
            <div className="flex items-center gap-1">
              <span>🚻</span> Baños
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
