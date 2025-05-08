import Image from 'next/image';
import Registro from '@/components/autenticacion/registro/registroForm';
import Link from 'next/link';
export default function RegistroPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-4xl flex flex-row-reverse">
        <div className="hidden md:block w-1/2 relative">
          <Image 
            src={"/images/log.jpg"}
            alt="Logística de transportes"
            layout="fill"
            objectFit="cover"
            className="rounded-r-xl"
          />
          <div className="absolute inset-0 bg-blue-800 opacity-20 rounded-r-xl"></div>
          <div className="absolute bottom-0 right-0 p-6 text-white text-right">
            <h2 className="text-2xl font-bold">Únete a nuestro equipo</h2>
            <p className="text-blue-100">Únete siii :3</p>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-800">Crear Cuenta</h1>
            <p className="text-blue-600 mt-2">Comineza a realizar envios y viajes espectaculares!!</p>
          </div>
          <Registro />
          <p className="mt-6 text-center text-sm text-blue-700">
            ¿Ya tienes cuenta?{' '}
            <Link href="/autenticacion/login" className="font-semibold text-blue-600 hover:text-blue-500">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}