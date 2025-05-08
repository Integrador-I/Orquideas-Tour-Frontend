import Image from 'next/image';

import LoginForm from '@/components/autenticacion/login/logiform';
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-4xl flex">
        <div className="hidden md:block w-1/2 relative">
          <Image 
            src={"/images/log.jpg"}
            alt="Camión de transportes"
            layout="fill"
            objectFit="cover"
            className="rounded-l-xl"
          />
          <div className="absolute inset-0 bg-blue-800 opacity-20 rounded-l-xl"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h2 className="text-2xl font-bold">Orquideas Tour</h2>
            <p className="text-blue-100">Un viaje seguro</p>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-800">Iniciar Sesión</h1>
            <p className="text-blue-600 mt-2">Accede a tu panel de control</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}