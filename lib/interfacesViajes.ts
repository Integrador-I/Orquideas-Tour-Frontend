export interface Bus {
  id: number;
  plate: string;
  type: string;
  capacity: number;
  state: string;
}

export interface Conductores {
  id: number;
  name: string;
  lastname: string;
  dni: string;
  phone: string;
  email: string;
  license: string;
  expiration: string;
  state: string;
  income: string;
}

export interface Rutas {
  id: number;
  origin: string;
  destination: string;
  duration: string; 
  distance: number; 
}

export interface Viajes {
  id: number;
  rutas: Rutas;
  salida: string; 
  llegada: string; 
  conductores: Conductores;
  bus: Bus;
  price: number;
}

