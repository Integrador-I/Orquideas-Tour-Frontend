export default function CategoriasAyuda() {
    const categorias = [
      {
        id: 1,
        title: "Boletos de Viaje",
        icon: "🚌",
        color: "bg-blue-200",
        items: [
          "Cómo comprar un boleto",
          "Cancelación y reembolsos",
          "Cambio de fecha/hora",
          "Política de equipaje",
          "Descuentos y promociones"
        ]
      },
      {
        id: 2,
        title: "Encomiendas",
        icon: "📦",
        color: "bg-blue-300",
        items: [
          "Cómo enviar un paquete",
          "Tarifas y tamaños permitidos",
          "Rastreo de encomiendas",
          "Reclamos por daños",
          "Tiempos de entrega"
        ]
      },
      {
        id: 3,
        title: "Pagos y Facturación",
        icon: "💳",
        color: "bg-blue-400",
        items: [
          "Métodos de pago aceptados",
          "Problemas con el pago",
          "Factura electrónica",
          "Reembolsos",
          "Promociones de pago"
        ]
      },
      {
        id: 4,
        title: "Atención al Cliente",
        icon: "📞",
        color: "bg-blue-500",
        items: [
          "Horarios de atención",
          "Centros de servicio",
          "Quejas y sugerencias",
          "Pérdida de objetos",
          "Accesibilidad"
        ]
      }
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {categorias.map((categoria) => (
          <div key={categoria.id} className={`${categoria.color} rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow hover:translate-y-[-4px]`}>
            <div className="p-6">
              <div className="text-4xl mb-4">{categoria.icon}</div>
              <h3 className="text-xl font-bold text-blue-800 mb-4">{categoria.title}</h3>
              <ul className="space-y-2">
                {categoria.items.map((item, index) => (
                  <li key={index} className="text-blue-700 hover:text-blue-900">
                    <a href="#" className="flex items-center">
                      <span className="mr-2">•</span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  }