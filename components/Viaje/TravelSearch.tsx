"use client";
import { useState, useRef } from "react";
import { CalendarDays, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LocationSelect from "@/components/ui/LocationSelect";
import DetallesModal from "./DetallesModal";
import { SeatModal } from "./SeatModal";


export interface Trip {
  id: number;
  suiteType: string;
  departureTime: string; // "20:30"
  arrivalTime: string; // "06:30"
  duration: string; // "10 horas"
  price: number; // 95
  origin: string;
  destination: string;
  date: string; // yyyy-mm-dd
}

const sampleTrips: Trip[] = [
  {
    id: 1,
    suiteType: "Suite 160°",
    departureTime: "20:30",
    arrivalTime: "06:30",
    duration: "10 horas",
    price: 95,
    origin: "Cusco",
    destination: "Arequipa",
    date: "2025-06-06",
  },
  {
    id: 2,
    suiteType: "Suite 160°",
    departureTime: "21:00",
    arrivalTime: "07:00",
    duration: "10 horas",
    price: 100,
    origin: "Cusco",
    destination: "Arequipa",
    date: "2025-06-06",
  },
  {
    id: 3,
    suiteType: "Suite 160°",
    departureTime: "21:30",
    arrivalTime: "07:30",
    duration: "10 horas",
    price: 100,
    origin: "Puno",
    destination: "Paracas",
    date: "2025-06-06",
  },
  {
    id: 4,
    suiteType: "Suite 160°",
    departureTime: "20:00",
    arrivalTime: "06:00",
    duration: "10 horas",
    price: 95,
    origin: "Arequipa",
    destination: "Cusco",
    date: "2025-06-10",
  },
];

export default function TravelSearch() {
  const today = new Date().toISOString().split("T")[0];
  const [origin, setOrigin] = useState("Cusco");
  const [destination, setDestination] = useState("Arequipa");
  const [date, setDate] = useState(today);
  const [results, setResults] = useState<Trip[]>([]);

  //ver detalles
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showModal, setShowModal] = useState(false);
  const seatRef = useRef<HTMLDivElement>(null);

  //asientos
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSeatSelection = (seatNumber: number) => {
    console.log('Asiento seleccionado:', seatNumber);
    // Lógica para guardar el asiento seleccionado
  };


  const handleSearch = () => {
    const found = sampleTrips.filter(
      (t) => t.origin === origin && t.destination === destination && t.date === date
    );
    setResults(found);
  };

  return (
    <div className="flex flex-col items-center py-10">
      {/* Barra de búsqueda */}
      <div className="bg-white shadow-md rounded-full flex items-center gap-6 px-10 py-3 w-full max-w-5xl">
        <LocationSelect label="Desde" selected={origin} onSelect={setOrigin} />
        <span className="text-gray-300">|</span>
        <LocationSelect label="Hacia" selected={destination} onSelect={setDestination} />
        <span className="text-gray-300">|</span>
        {/* Fecha */}
        <div className="flex items-center gap-1">
          <CalendarDays className="w-4 h-4 text-gray-500" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-transparent focus:outline-none font-semibold"
          />
        </div>
        <div className="ml-auto">
          <Button onClick={handleSearch} className="rounded-full flex items-center gap-1 text-white font-semibold">
            <Search className="w-4 h-4" />
            Buscar
          </Button>
        </div>
      </div>

      {/* Resultados */}
      <div className="w-full max-w-5xl mt-8">
        <h2 className="text-lg font-bold mb-4">
          Seleccionar horario de ida {new Date(date).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })}
        </h2>

        {results.length === 0 ? (
          <p className="text-gray-500 italic">No se encontraron viajes para la búsqueda.</p>
        ) : (
          results.map((trip) => (
            <Card key={trip.id} className="mb-4 hover:shadow-lg transition-shadow">
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center text-sm">
                    <span className="font-semibold">{trip.suiteType}</span>
                  </div>
                  <div className="flex flex-col font-semibold text-gray-800">
                    <span>{trip.departureTime}</span>
                    <span className="text-xs text-gray-500">{trip.origin}</span>
                  </div>
                  <span className="mx-2">&rarr;</span>
                  <div className="flex flex-col font-semibold text-gray-800">
                    <span>{trip.arrivalTime}</span>
                    <span className="text-xs text-gray-500">{trip.destination}</span>
                  </div>
                  <div className="ml-6 text-sm text-gray-500">{trip.duration}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    Desde: <span className="font-bold">S/. {trip.price}</span>
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedTrip(trip);
                      setShowModal(true);
                    }}
                  >
                    Ver detalles
                  </Button>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Ver asientos
                  </button>

                  <SeatModal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleSeatSelection}
                  />
                  <DetallesModal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    trip={selectedTrip}
                  />

                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}








/*
const Viaje = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <Buscador />
      <Horarios />
      <Asientos />
      <Itinerario />
      <Calendario />
    </div>
  );
};

export default Viaje;
*/