"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { EstadoDePedido } from "./estado"

export const EntradaEncomienda = () => {
    const [searchPressed, setSearchPressed] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        setMounted(true) 
    }, [])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setSearchPressed(true)
    }

    return (
        <section className="relative z-40 overflow-hidden py-16 sm:py-24 lg:py-28 bg-amber-50 min-h-screen flex items-center">
            <div className="px-4 mx-auto max-w-7xl w-full">
                <div className={`text-center mb-10 transition-all duration-700 ${mounted ? "animate-fadeIn" : "opacity-0"}`}>
                    <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
                        BUSCA Y CONSULTA EL <br />
                        <span className="text-amber-800">ESTADO</span><br />
                        DE TU ENCOMIENDA
                    </h2>
                </div>
                <form
                    className={`max-w-2xl mx-auto mb-12 transition-all duration-700 ${mounted ? "animate-fadeIn" : "opacity-0"}`}
                    onSubmit={handleSearch}
                >
                    <div className="relative flex shadow-lg rounded-lg overflow-hidden">
                        <input
                            type="search"
                            id="codigo-encomienda"
                            className="flex-1 p-4 pl-10 text-base text-gray-700 border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-l-lg"
                            placeholder="Ingresa el código de tu encomienda"
                            required
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                            </svg>
                        </div>
                        <button
                            type="submit"
                            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 transition duration-200 rounded-r-lg"
                        >
                            Buscar
                        </button>
                    </div>
                </form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <EstadoDePedido estadoActual={"confirmed"} />

                    <div className={`text-gray-700 text-center md:text-left transition-all duration-500 ${searchPressed ? "animate-pop" : ""}`}>
                        {searchPressed
                            ? <p className="text-lg font-medium">Tu pedido se encuentra en tránsito y será entregado pronto.</p>
                            : <p className="text-gray-500">Aquí se mostrará el estado de tu pedido</p>
                        }
                    </div>
                    <div
                        className={`relative aspect-square w-full max-w-sm mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-xl 
        transition-all duration-1000 ease-out 
        ${searchPressed ? "animate-pop" : mounted ? "animate-fadeIn" : "opacity-0"}`}
                    >
                        <Image
                            key={searchPressed ? "cerrada" : "abierta"}
                            src={searchPressed ? "/images/CajaCerrada.avif" : "/images/CajaAbierta.avif"}
                            fill
                            alt={searchPressed ? "Encomienda en tránsito" : "Encomienda lista para enviar"}
                            className="object-cover"
                            priority
                        />
                    </div>

                </div>
            </div>
        </section>
    )
}
