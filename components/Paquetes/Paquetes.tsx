"use client";

import React, { useState } from "react";
import styles from "./Paquetes.module.css";
import { BotonPaquetes } from "./botonPaquetes";


export const Paquetes = () => {
  const [indiceActual, setIndiceActual] = useState(0);

  const paquetes = [
    {
      talla: "Sobre A4",
      detalle: `Documentos simples en sobre manila: <br><br>Tamaño<br><strong>A4</strong>`,
      imagen: "/images/foto.png"
    },
    {
      talla: "Caja S",
      detalle: `Las dimensiones del paquete deben estar dentro del rango de: <br><br>10 x 20 x 15 cm<br><strong>Peso máx. 2 kg</strong>`,
      imagen: "/images/foto.png"
    },
    {
      talla: "Caja M",
      detalle: `Las dimensiones del paquete deben estar dentro del rango de: <br><br>24 x 30 x 20 cm<br><strong>Peso máx. 5 kg</strong>`,
      imagen: "/images/foto.png"
    },
    {
      talla: "Caja XL",
      detalle: `Las dimensiones del paquete deben estar dentro del rango de: <br><br>40 x 50 x 30 cm<br><strong>Peso máx. 10 kg</strong>`,
      imagen: "/images/foto.png"
    },
    {
      talla: "Caja XXL",
      detalle: `Las dimensiones del paquete deben estar dentro del rango de: <br><br>50 x 60 x 40 cm<br><strong>Peso máx. 15 kg</strong>`,
      imagen: "/images/foto.png"
    }
  ];

  const CambiarPaquete = () => {
    setIndiceActual((indiceActual + 1) % paquetes.length);
  };

  return (
    <div className={styles.pricingContainer}>
      <div className={styles.pricingTable}>
        <h1>¿Qué tipo de producto deseas enviar?</h1>
        <p className={styles.subtitle}>Elige un paquete</p>

        <div className={styles.priceList}>
          <div className={`${styles.priceCard} ${styles.active} ${styles.paqueteCiclo}`}>
            <h3>Elija el paquete</h3>
            <h2>Producto a enviar</h2>
            <h2 className={styles.talla}>{paquetes[indiceActual].talla}</h2>
            <p className={styles.detalle} dangerouslySetInnerHTML={{ __html: paquetes[indiceActual].detalle }} />
            <img src={paquetes[indiceActual].imagen} alt="Imagen Paquete" />

            {/* Botón para cambiar el paquete */}
            <BotonPaquetes onClick={CambiarPaquete} />
          </div>

          {/* Segunda tarjeta */}
          <div className={styles.priceCard}>
            <h3>¿Quién realiza el envio?</h3>
            <p className={styles.detalle}>
              <strong>Documento nacional de identidad</strong><br />
              <input type="number" placeholder="DNI" /><br /><br />

              <strong>Nombre Completo</strong><br />
              <input type="text" placeholder="Nombre completo" /><br /><br />

              <strong>Apellido Paterno</strong><br />
              <input type="text" placeholder="Apellido Paterno" /><br /><br />

              <strong>Apellido Materno</strong><br />
              <input type="text" placeholder="Apellido Materno" /><br /><br />

              <strong>Celular</strong><br />
              <input type="number" placeholder="Número de celular" /><br /><br />
            </p>
          </div>

          {/* Tercera tarjeta */}
          <div className={styles.priceCard}>
            <h3>¿Quién recibe el envio?</h3>
            <p className={styles.detalle}>
              <strong>Documento nacional de identidad</strong><br />
              <input type="number" placeholder="DNI" /><br /><br />

              <strong>Nombre Completo</strong><br />
              <input type="text" placeholder="Nombre completo" /><br /><br />

              <strong>Apellido Paterno</strong><br />
              <input type="text" placeholder="Apellido Paterno" /><br /><br />

              <strong>Apellido Materno</strong><br />
              <input type="text" placeholder="Apellido Materno" /><br /><br />

              <strong>Celular</strong><br />
              <input type="number" placeholder="Número de celular" /><br /><br />

              <button className={styles.continuar}>Continuar</button>
              <p id="registroMensaje" className={styles.mensaje} style={{ display: "none" }}>Se ha registrado correctamente</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
