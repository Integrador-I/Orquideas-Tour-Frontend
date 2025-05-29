'use client';
import { useState } from 'react';

export default function PreguntasFrecuentes() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Cómo puedo rastrear mi encomienda?",
      answer: "Puedes rastrear tu encomienda ingresando el código de seguimiento en nuestra página web o app. También recibirás actualizaciones por SMS o email.",
      category: "encomiendas"
    },
    {
      question: "¿Cómo puedo comprar mi boleto?",
      answer: "Puedes comprar tu boleto en el inicio mi king.",
      category: "boletos"
    },
    // ... (resto de las preguntas)
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-blue-200 rounded-lg overflow-hidden bg-white shadow-md">
            <button
              className={`w-full text-left p-6 flex justify-between items-center ${activeIndex === index ? 'bg-blue-100' : 'bg-white'}`}
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-lg text-blue-800">{faq.question}</span>
              <svg className={`w-6 h-6 text-blue-600 transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeIndex === index && (
              <div className="p-6 bg-blue-50 border-t border-blue-200">
                <p className="text-blue-900">{faq.answer}</p>
                <span className={`inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full ${faq.category === 'boletos' ? 'bg-blue-200 text-blue-800' : 'bg-blue-300 text-blue-900'}`}>
                  {faq.category === 'boletos' ? 'Boletos' : 'Encomiendas'}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
