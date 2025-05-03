import BuscadorViaje from "../BuscarViajes/buscardoViaje"

export const EntradaPage = () => {
    return (
        <section id="home" className="relative z-40 overflow-hidden py-20 sm:py-28 lg:py-32 bg-amber-300">
            <div className="px-4 mx-auto max-w-7xl">
                <BuscadorViaje/>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

                    <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
                        <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                            FORGET ABOUT WRITING AND<br />
                            <span className="text-amber-800">START INNOVATING</span><br />
                            YOUR COMPANY
                        </h2>
                        <p className="text-lg sm:text-xl opacity-90 text-[#79808a] text-justify">
                            We offer incredible digitalization of sales and inventory processes to
                            avoid losses. You can also track, guide, and receive notifications about
                            your products to avoid the fatigue of counting everything again.
                        </p>
                    </div>


                    <div className="w-full lg:w-1/2">
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
