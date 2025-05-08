import React from "react";

interface BotonPaquetesProps {
  onClick: () => void;
}

export const BotonPaquetes: React.FC<BotonPaquetesProps> = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick}>Cambiar Paquete</button>
    </div>
  );
};
