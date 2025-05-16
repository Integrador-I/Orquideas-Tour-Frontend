import { EntradaEncomienda } from "@/components/Encomiendas/entrada";

export default function encomiendas() {
  return (
    <section
      className="relative z-40 overflow-hidden py-16 sm:py-24 lg:py-28 min-h-screen flex items-center bg-blue-600 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/imagenFondo.jpg')" }}>
      <EntradaEncomienda />
    </section>


  )
}
