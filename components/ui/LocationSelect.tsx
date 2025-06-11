"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, MapPin } from "lucide-react";
import { fetchRutas } from "@/lib/axios";
import { Rutas } from "@/lib/interfacesViajes";

interface LocationSelectProps {
  label: string;
  selected: string;
  onSelect: (location: string) => void;
  filter?: string[];
  disabled?: boolean;
}

export default function LocationSelect({
  label,
  selected,
  onSelect,
  filter,
  disabled = false
}: LocationSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState<Rutas[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        setLoading(true);
        setError(null);
        const rutas = await fetchRutas();
        setLocations(rutas);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setError("Error al cargar ubicaciones");
      } finally {
        setLoading(false);
      }
    };

    loadLocations();
  }, []);

  const filteredLocations = locations
    .filter(l => filter ? filter.includes(l.origin) : true)
    .filter(l => l.origin.toLowerCase().includes(search.toLowerCase()))
    .filter((l, i, arr) => arr.findIndex(t => t.origin === l.origin) === i); 

  return (
    <div className="relative w-60">
      <button
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={cn(
          "flex items-center justify-between border-2 rounded-full px-4 py-2 w-full",
          "focus:outline-none",
          open ? "border-yellow-400" : "border-gray-200",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-yellow-500" />
          <span className="text-sm truncate">
            {selected || (loading ? "Cargando..." : label)}
          </span>
        </span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {open && (
        <div className="absolute z-10 bg-white mt-2 w-full rounded-xl shadow-xl max-h-72 overflow-auto">
          <input
            className="w-full px-4 py-2 border-b outline-none text-sm"
            placeholder="Buscar ciudad..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          
          {loading ? (
            <div className="px-4 py-2 text-sm text-gray-500">Cargando...</div>
          ) : error ? (
            <div className="px-4 py-2 text-sm text-red-500">{error}</div>
          ) : filteredLocations.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-500">No se encontraron resultados</div>
          ) : (
            filteredLocations.map((loc) => (
              <div
                key={`${loc.id}-${loc.origin}`}
                onClick={() => {
                  onSelect(loc.origin);
                  setOpen(false);
                  setSearch("");
                }}
                className={cn(
                  "px-4 py-2 cursor-pointer text-sm flex items-center gap-2 hover:bg-gray-100",
                  loc.origin === selected ? "bg-gray-100 font-semibold" : ""
                )}
              >
                <MapPin className="w-4 h-4 text-gray-400" />
                {loc.origin}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
/*
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, MapPin } from "lucide-react";

const locations = [
  "Ica",
  "Arequipa",
  "Cusco",
  "Paracas",
  "Puno",
  "Nasca",
  "Juliaca",
  "Chala",
  "Camaná",
  "Omate"
];

interface LocationSelectProps {
  label: string;
  selected: string;
  onSelect: (location: string) => void;
}

export default function LocationSelect({
  label,
  selected,
  onSelect,
}: LocationSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = locations.filter((l) =>
    l.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-60">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center justify-between border-2 rounded-full px-4 py-2 w-full",
          "focus:outline-none",
          open ? "border-yellow-400" : "border-gray-200"
        )}
      >
        <span className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-yellow-500" />
          <span className="text-sm">{selected || label}</span>
        </span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {open && (
        <div className="absolute z-10 bg-white mt-2 w-full rounded-xl shadow-xl max-h-72 overflow-auto">
          <input
            className="w-full px-4 py-2 border-b outline-none text-sm"
            placeholder="Buscar ciudad..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {filtered.map((loc) => (
            <div
              key={loc}
              onClick={() => {
                onSelect(loc);
                setOpen(false);
                setSearch("");
              }}
              className={cn(
                "px-4 py-2 cursor-pointer text-sm flex items-center gap-2 hover:bg-gray-100",
                loc === selected ? "bg-gray-100 font-semibold" : ""
              )}
            >
              <MapPin className="w-4 h-4 text-gray-400" />
              {loc}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-2 text-sm text-gray-500">No encontrado</div>
          )}
        </div>
      )}
    </div>
  );
}
*/