
interface EstadoDePedidoProps {
  status: 'confirmed' | 'paid' | 'shipped' | 'delivered';
}
export const estadoEncomienda = [
  {
    key: 'confirmed',
    title: 'Orden Confirmada',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    key: 'paid',
    title: 'Pago Confirmado',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5 1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    key: 'shipped',
    title: 'En Camino',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        <path fillRule="evenodd" d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zm11 3a1 1 0 011-1h1a1 1 0 011 1v8a1 1 0 01-1 1h-1.05a2.5 2.5 0 00-4.9 0H13a1 1 0 01-1-1V7z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    key: 'delivered',
    title: 'Llegó a Destino',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    )
  }
];
export const EstadoDePedidoRecomendado: React.FC<EstadoDePedidoProps> = ({ status }) => {
  const currentIndex = estadoEncomienda.findIndex(s => s.key === status);

  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex items-center w-full max-w-4xl">
        {estadoEncomienda.map((status, index) => {
          const isActive = index <= currentIndex;
          return (
            <div key={status.key} className="flex items-center w-full relative">
              <div className="flex flex-col items-center z-10">
                <div
                  className={`group relative cursor-pointer transition-colors duration-300 
                    ${isActive ? 'text-blue-500' : 'text-gray-300'}`}
                >
                  <div className="p-2 rounded-full bg-white border-2 border-current">
                    {status.icon}
                  </div>
                  <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {status.title}
                  </span>
                </div>
              </div>

              {index < estadoEncomienda.length - 1 && (
                <div className="flex-1 h-1 mx-2">
                  <div className={`w-full h-full rounded-full transition-colors duration-300 ${
                    index < currentIndex ? 'bg-blue-500' : 'bg-gray-200'
                  }`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
