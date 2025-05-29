export default function ContactoEmergencia() {
  const contactos = [
    {
      title: "Atención Telefónica",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      description: "Línea gratuita nacional",
      info: "1800-555-1234",
      extra: "24/7 - 365 días al año",
      bgColor: "bg-blue-200"
    },
    // ... (otros contactos)
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {contactos.map((contacto, index) => (
        <div key={index} className={`${contacto.bgColor} rounded-lg p-6 text-center shadow-lg transition-transform transform hover:scale-105`}>
          <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-sm">
            {contacto.icon}
          </div>
          <h3 className="text-xl font-bold text-blue-800 mb-2">{contacto.title}</h3>
          <p className="text-blue-700 mb-2">{contacto.description}</p>
          <p className="text-2xl font-bold text-blue-900 hover:text-blue-700">{contacto.info}</p>
          {contacto.extra && <p className="text-sm text-blue-600 mt-2">{contacto.extra}</p>}
        </div>
      ))}
    </div>
  );
}
