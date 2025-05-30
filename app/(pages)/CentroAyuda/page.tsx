import CategoriasAyuda from '@/components/CentroDeAyuda/CategoriasAyuda';
import PreguntasFrecuentes from '@/components/CentroDeAyuda/PreguntasFrecuentes';
import ContactoEmergencia from '@/components/CentroDeAyuda/ContactoEmergencia';
import ChatBox from '@/components/CentroDeAyuda/ChatBox';
import ContactoModal from '@/components/CentroDeAyuda/ContactoModal';
import Button from '@/components/CentroDeAyuda/Button';


export const metadata = {
  title: "Centro de Ayuda | Transportes Del Norte",
  description: "Encuentra ayuda sobre boletos y encomiendas",
};

export default function CentroAyuda() {

  return (
    <div className="bg-blue-50 min-h-screen">
      {/* Hero Section */}

      <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Centro de Ayuda</h1>
          <p className="text-xl mb-8 text-blue-100">¿En qué podemos ayudarte hoy?</p>
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Buscar en ayuda (ej: 'cancelar boleto', 'rastrear encomienda')"
              className="w-full py-4 px-6 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md"
            />
            <button className="absolute right-2 top-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-12">
        <CategoriasAyuda />

        <div className="my-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-700">Preguntas Frecuentes</h2>
          <PreguntasFrecuentes />
        </div>

        <div className="bg-blue-100 rounded-xl p-8 my-16 border border-blue-200">
          <ContactoEmergencia />
        </div>

        <ChatBox/>
        {/* Banner de asistencia */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-lg">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">¿No encontraste lo que buscabas?</h3>
            <p className="text-blue-100">Nuestro equipo está disponible para ayudarte</p>
          </div>
          <Button/>
        </div>
      </div>
    </div>
  );
}
