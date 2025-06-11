"use client";
import { useState, useEffect } from "react";
import { CalendarDays, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LocationSelect from "@/components/ui/LocationSelect";
import { fetchRutas, fetchViajes } from "@/lib/axios";
import { Viajes, Rutas } from "@/lib/interfacesViajes";
import BusSeatModal from "./BusSeatModal";

export default function TravelSearch() {
  //Asientos:
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  // Fechas iniciales
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Formatear fechas para inputs type="date"
  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const todayStr = formatDate(today);
  const tomorrowStr = formatDate(tomorrow);

  // Estado para las fechas
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [dateOption, setDateOption] = useState<"today" | "tomorrow" | "custom">("today");
  const [customDate, setCustomDate] = useState(todayStr);
  const [results, setResults] = useState<Viajes[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allRoutes, setAllRoutes] = useState<Rutas[]>([]);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  // Calcular fecha máxima para el selector personalizado (fin de mes)
  const maxCustomDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const maxCustomDateStr = formatDate(maxCustomDate);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [rutas, viajes] = await Promise.all([
          fetchRutas(),
          fetchViajes()
        ]);
        setAllRoutes(rutas);
        setResults(viajes); // Mostrar todos los viajes inicialmente
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Error al cargar datos iniciales");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getDestinationOptions = () => {
    if (!origin) return [];
    return Array.from(
      new Set(
        allRoutes
          .filter(r => r.origin === origin)
          .map(r => r.destination)
      )
    );
  };

  const handleSearch = async () => {
    if (!origin || !destination) {
      setError("Por favor seleccione origen y destino");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Obtener la fecha seleccionada
      let selectedDate = todayStr;
      if (dateOption === "tomorrow") {
        selectedDate = tomorrowStr;
      } else if (dateOption === "custom") {
        selectedDate = customDate;
      }

      // Obtener todos los viajes
      const allViajes = await fetchViajes();

      // Filtrar los viajes según los criterios
      const filteredViajes = allViajes.filter(viaje => {
        // Filtrar por ruta (origen y destino)
        const routeMatch = viaje.rutas.origin === origin &&
          viaje.rutas.destination === destination;

        if (!routeMatch) return false;

        // Filtrar por fecha
        const viajeDate = viaje.salida.split('T')[0];
        return viajeDate === selectedDate;
      });

      setResults(filteredViajes);

      if (filteredViajes.length === 0) {
        setError("No se encontraron viajes para los criterios seleccionados");
      }
    } catch (error) {
      console.error("Error searching trips:", error);
      setError("Error al buscar viajes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-6 md:py-30 px-4">
      {/* Versión móvil (compacta) */}
      <div className="md:hidden w-full mb-4">
        <div
          className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
          onClick={() => setIsMobileExpanded(!isMobileExpanded)}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{origin || "Origen"}</p>
              <p className="text-sm text-gray-500">a {destination || "Destino"}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {dateOption === "today"
                  ? "Hoy"
                  : dateOption === "tomorrow"
                    ? "Mañana"
                    : "Personalizada"}
              </span>
              {isMobileExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido expandible en móvil */}
      <div className={`${isMobileExpanded ? 'block' : 'hidden'} md:block w-full`}>
        <div className="bg-white shadow-md rounded-2xl md:rounded-full flex flex-col md:flex-row flex-wrap items-center gap-4 px-6 py-4 md:py-3 w-full max-w-5xl">
          <div className="w-full md:w-auto md:flex-1">
            <LocationSelect
              label="Desde"
              selected={origin}
              onSelect={(loc) => {
                setOrigin(loc);
                setDestination("");
              }}
            />
          </div>

          <span className="text-gray-300 hidden md:block">|</span>

          <div className="w-full md:w-auto md:flex-1">
            <LocationSelect
              label="Hacia"
              selected={destination}
              onSelect={setDestination}
              filter={origin ? getDestinationOptions() : undefined}
              disabled={!origin}
            />
          </div>

          <span className="text-gray-300 hidden md:block">|</span>

          {/* Selector de fecha rápida (hoy/mañana/personalizada) */}
          <div className="w-full md:w-auto md:flex-1">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 md:bg-transparent md:p-0">
              <CalendarDays className="w-4 h-4 text-gray-500" />
              <select
                value={dateOption}
                onChange={(e) => setDateOption(e.target.value as "today" | "tomorrow" | "custom")}
                className="bg-transparent focus:outline-none font-semibold w-full"
              >
                <option value="today">Hoy ({today.toLocaleDateString("es-PE", { day: "numeric", month: "short" })})</option>
                <option value="tomorrow">Mañana ({tomorrow.toLocaleDateString("es-PE", { day: "numeric", month: "short" })})</option>
                <option value="custom">Personalizada</option>
              </select>
            </div>
          </div>

          {/* Selector de fecha personalizada - solo visible si se selecciona "personalizada" */}
          {dateOption === "custom" && (
            <div className="w-full md:w-auto md:flex-1">
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 md:bg-transparent md:p-0">
                <CalendarDays className="w-4 h-4 text-gray-500" />
                <input
                  type="date"
                  value={customDate}
                  min={todayStr}
                  max={maxCustomDateStr}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="bg-transparent focus:outline-none font-semibold w-full"
                />
              </div>
            </div>
          )}

          <div className="w-full md:w-auto md:ml-auto">
            <Button
              onClick={handleSearch}
              className="w-full md:w-auto rounded-full flex items-center justify-center gap-1 text-white font-semibold py-2"
              disabled={loading || !origin || !destination}
              size="lg"
            >
              <Search className="w-4 h-4" />
              {loading ? "Buscando..." : "Buscar"}
            </Button>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="w-full max-w-5xl mt-6 md:mt-8">
        <h2 className="text-lg font-bold mb-4 text-center">
          {results.length > 0 ? "Resultados de búsqueda" : "Busca tu viaje"} -
          {dateOption === "today"
            ? today.toLocaleDateString("es-PE", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            })
            : dateOption === "tomorrow"
              ? tomorrow.toLocaleDateString("es-PE", {
                day: "2-digit",
                month: "short",
                year: "numeric"
              })
              : new Date(customDate).toLocaleDateString("es-PE", {
                day: "2-digit",
                month: "short",
                year: "numeric"
              })}
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-center">{error}</p>
        )}

        {loading && results.length === 0 ? (
          <p className="text-gray-500 italic">Buscando viajes...</p>
        ) : results.length === 0 ? (
          <p className="text-gray-500 italic">
            {origin && destination
              ? "No se encontraron viajes para la búsqueda."
              : "Seleccione origen y destino para buscar viajes."}
          </p>
        ) : (
          results.map((viajes) => {
            const departureTime = viajes.salida.includes('T')
              ? viajes.salida.split('T')[1].substring(0, 5)
              : '';

            const arrivalTime = viajes.llegada.includes('T')
              ? viajes.llegada.split('T')[1].substring(0, 5)
              : '';

            return (
              <Card key={viajes.id} className="mb-4 hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex flex-col items-center text-sm min-w-[80px]">
                      <span className="font-semibold">{viajes.bus.type}</span>
                      <span className="text-xs text-gray-500">{viajes.bus.plate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex flex-col font-semibold text-gray-800">
                        <span>{departureTime}</span>
                        <span className="text-xs text-gray-500">{viajes.rutas.origin}</span>
                      </div>

                      <span className="mx-1">&rarr;</span>

                      <div className="flex flex-col font-semibold text-gray-800">
                        <span>{arrivalTime}</span>
                        <span className="text-xs text-gray-500">{viajes.rutas.destination}</span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-500">
                      Duración: {viajes.rutas.duration}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-wrap justify-end">
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      Desde: <span className="font-bold">S/. {viajes.price.toFixed(2)}</span>
                    </span>

                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Seleccionar asientos
                    </button>

                    <BusSeatModal
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      onSeatsSelected={setSelectedSeats}
                      pricePerSeat={101}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}


/*
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
      <div className="bg-white shadow-md rounded-full flex items-center gap-6 px-10 py-3 w-full max-w-5xl">
        <LocationSelect label="Desde" selected={origin} onSelect={setOrigin} />
        <span className="text-gray-300">|</span>
        <LocationSelect label="Hacia" selected={destination} onSelect={setDestination} />
        <span className="text-gray-300">|</span>

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











//bait

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