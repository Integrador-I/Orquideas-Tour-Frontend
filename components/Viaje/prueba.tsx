"use client";
import { useState, useEffect } from "react";
import { CalendarDays, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LocationSelect from "@/components/ui/LocationSelect";
import { fetchRutas } from "@/lib/axios";
import { Viajes, Rutas, Conductores, Bus } from "@/lib/interfacesViajes";
import { SeatModal } from "./SeatModal";

export default function TravelSearch() {
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
  const [dateOption, setDateOption] = useState<"today" | "tomorrow">("today");
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
        const rutas = await fetchRutas();
        setAllRoutes(rutas);
      } catch (error) {
        console.error("Error loading routes:", error);
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
    if (!origin || !destination ) {
      setError("Por favor seleccione origen y destino");
      return;
    }
    // Lógica de búsqueda...
  };

  return (
    <div className="flex flex-col items-center py-6 md:py-10 px-4">
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
                {dateOption === "today" ? "Hoy" : "Mañana"}
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

          {/* Selector de fecha rápida (hoy/mañana) */}
          <div className="w-full md:w-auto md:flex-1">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 md:bg-transparent md:p-0">
              <CalendarDays className="w-4 h-4 text-gray-500" />
              <select
                value={dateOption}
                onChange={(e) => setDateOption(e.target.value as "today" | "tomorrow")}
                className="bg-transparent focus:outline-none font-semibold w-full"
              >
                <option value="today">Hoy ({today.toLocaleDateString("es-PE", { day: "numeric", month: "short" })})</option>
                <option value="tomorrow">Mañana ({tomorrow.toLocaleDateString("es-PE", { day: "numeric", month: "short" })})</option>
              </select>
            </div>
          </div>

          {/* Selector de fecha personalizada */}
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
          {new Date(dateOption === "today" ? todayStr : tomorrowStr).toLocaleDateString("es-PE", {
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

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Aquí puedes manejar la navegación a detalles
                        console.log("Ver detalles:", SeatModal);
                      }}
                    >
                      Ver detalles
                    </Button>
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
