// src/components/CentroDeAyuda/ContactoButton.tsx
'use client';

import { useState } from 'react';
import ContactoModal from './ContactoModal';

export default function ContactoButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors shadow-md"
      >
        Contactar Soporte
      </button>
      
      <ContactoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}