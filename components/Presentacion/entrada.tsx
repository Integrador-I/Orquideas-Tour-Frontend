import BuscadorViaje from "../BuscarViajes/buscardoViaje"
export const EntradaPage = () => {
    return (
        <section
            id="inicio"
            className="relative z-40 overflow-hidden h-screen flex items-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/PortadaArequipa.webp')" }}
        >
            <div className="absolute inset-0 bg-black/40 z-0" />
            <div className="relative z-10 px-4 mx-auto max-w-7xl w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
                    <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
                        <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-white pb-3">
                            TRANSPORTE SEGURO<br />
                            <span className="text-amber-300">ENCOMIENDAS SEGURAS</span>
                        </h2>
                    </div>
                </div>
                <BuscadorViaje />
            </div>
        </section>
    )
}
