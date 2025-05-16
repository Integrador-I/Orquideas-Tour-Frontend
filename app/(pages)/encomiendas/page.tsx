import { Paquetes } from "@/components/Paquetes/Paquetes";

export default function Encomiendas() {
    return (
        <section
            className="relative z-40 flex items-center justify-center min-h-screen bg-blue-600 bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: "url('/images/registroEncomienda.jpg')" }}>
            <Paquetes />
        </section>
    )
}
