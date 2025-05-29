'use client'
import { useEffect, useRef, useState } from 'react'

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const commonQuestions = [
    '¿Cómo comprar un boleto?',
    '¿Cómo rastrear mi encomienda?',
    '¿Cuáles son los métodos de pago?',
    '¿Cómo cancelar un boleto?',
    '¿Dónde están los centros de servicio?',
  ]

  const answers: Record<string, string> = {
    '¿Cómo comprar un boleto?':
      'Puedes comprar boletos en nuestra página web, app móvil o en las terminales autorizadas.',
    '¿Cómo rastrear mi encomienda?':
      'Ingresa el código de seguimiento en la sección "Rastreo" del sitio web o app.',
    '¿Cuáles son los métodos de pago?':
      'Aceptamos tarjetas, transferencias, PayPal y efectivo en terminales.',
    '¿Cómo cancelar un boleto?':
      'Desde "Mis viajes" en tu cuenta. Aplica según nuestra política de cancelación.',
    '¿Dónde están los centros de servicio?':
      'Consulta nuestra página de "Contacto" para ubicaciones y horarios.',
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleQuestionClick = (question: string) => {
    const answer = answers[question] ?? 'Por favor contacta a nuestro soporte para más ayuda.'
    setMessages((prev) => [...prev, { text: question, isUser: true }, { text: answer, isUser: false }])
  }

  const handleSend = () => {
    if (!inputValue.trim()) return

    const match = Object.keys(answers).find((q) =>
      inputValue.toLowerCase().includes(q.toLowerCase().replace('¿', '').replace('?', ''))
    )
    const response = match
      ? answers[match]
      : 'No entendí tu pregunta. Elige una opción sugerida o contacta a soporte.'

    setMessages((prev) => [...prev, { text: inputValue, isUser: true }, { text: response, isUser: false }])
    setInputValue('')
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 h-[500px] flex flex-col border border-blue-300 animate-fade-in">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Centro de Ayuda</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-blue-200"
              aria-label="Cerrar chat"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p>Hola 👋 ¿En qué puedo ayudarte?</p>
                <p className="mt-2 text-xs">Selecciona una pregunta frecuente:</p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg ${
                      msg.isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-200">
            <div className="flex flex-wrap gap-1 mb-2">
              {commonQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuestionClick(q)}
                  className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu pregunta..."
                className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition"
                aria-label="Enviar mensaje"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
          aria-label="Abrir chat"
        >
          💬
        </button>
      )}
    </div>
  )
}
