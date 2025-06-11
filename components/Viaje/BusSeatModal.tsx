import { useState } from 'react';

type SeatType = 'normal' | 'driver' | 'exit' | 'aisle';

interface Seat {
  id: string;
  number: number | null;
  type: SeatType;
  isAvailable: boolean;
  isSelected: boolean;
  row: number;
  col: number;
}

interface BusSeatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSeatsSelected: (selectedSeats: number[]) => void;
  pricePerSeat: number;
}

const BusSeatModal: React.FC<BusSeatModalProps> = ({
  isOpen,
  onClose,
  onSeatsSelected,
  pricePerSeat = 101
}) => {
  const [seats, setSeats] = useState<Seat[]>(() => {
    const initialSeats: Seat[] = [];
    let seatNumber = 1;

    const busLayout = [
      ['aisle', 'normal', 'exit', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal'],
      ['aisle', 'normal', 'aisle', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal'],
      ['aisle', 'aisle', 'aisle', 'aisle', 'aisle', 'aisle', 'aisle', 'aisle', 'aisle', 'aisle', 'aisle'],
      ['aisle', 'aisle', 'aisle', 'aisle', 'aisle', 'aisle', 'aisle', 'aisle', 'aisle', 'aisle', 'aisle'],
      ['aisle', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal'],
      ['driver', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal', 'normal']
    ];


    busLayout.forEach((row, rowIndex) => {
      row.forEach((seatType, colIndex) => {
        const id = `row-${rowIndex}-col-${colIndex}`;
        
        if (seatType === 'normal') {
          initialSeats.push({
            id,
            number: seatNumber++,
            type: 'normal',
            isAvailable: Math.random() > 0.3, 
            isSelected: false,
            row: rowIndex,
            col: colIndex
          });
        } else {
          initialSeats.push({
            id,
            number: null,
            type: seatType as SeatType,
            isAvailable: false,
            isSelected: false,
            row: rowIndex,
            col: colIndex
          });
        }
      });
    });

    return initialSeats;
  });

  const selectedCount = seats.filter(seat => seat.isSelected).length;

  const toggleSeatSelection = (seatId: string) => {
    setSeats(prevSeats =>
      prevSeats.map(seat =>
        seat.id === seatId && seat.isAvailable && seat.type === 'normal'
          ? { ...seat, isSelected: !seat.isSelected }
          : seat
      )
    );
  };

  const handleConfirmSelection = () => {
    const selectedSeatsNumbers = seats
      .filter(seat => seat.isSelected && seat.type === 'normal')
      .map(seat => seat.number) as number[];
    onSeatsSelected(selectedSeatsNumbers);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl">
        <div className="border-b p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Selección de asientos</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="p-4">
          <div className="flex justify-between mb-4 text-sm">
            <span>8 Libres</span>
            <span>Elégido</span>
            <span>31 Ocupados</span>
          </div>
          <div className="flex justify-center mb-6">
            <div className="grid grid-rows-6 gap-2">
              {Array.from({ length: 6 }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex space-x-2">
                  {seats
                    .filter(seat => seat.row === rowIndex)
                    .sort((a, b) => a.col - b.col)
                    .map(seat => (
                      <SeatButton
                        key={seat.id}
                        seat={seat}
                        onClick={() => toggleSeatSelection(seat.id)}
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Precio aproximado*</span>
              <span className="text-sm">{selectedCount} Pasajero(s)</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">S/.{pricePerSeat * selectedCount}</span>
              <span className="text-sm">S/.{pricePerSeat} c/u</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={handleConfirmSelection}
            disabled={selectedCount === 0}
            className={`w-full py-2 rounded-md ${
              selectedCount > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continuar con {selectedCount} asiento{selectedCount !== 1 ? 's' : ''}
          </button>
        </div>
      </div>
    </div>
  );
};

const SeatButton: React.FC<{
  seat: Seat;
  onClick: () => void;
}> = ({ seat, onClick }) => {
  const getSeatContent = () => {
    switch (seat.type) {
      case 'driver':
        return '🛞'; 
      case 'exit':
        return '🚪';
      case 'aisle':
        return '';
      default:
        return seat.number;
    }
  };

  const getSeatClass = () => {
    if (seat.type === 'aisle') return 'w-10 h-10 invisible';
    
    if (seat.type !== 'normal') {
      return 'w-10 h-10 bg-gray-200 flex items-center justify-center';
    }
    
    if (seat.isSelected) {
      return 'w-10 h-10 bg-blue-600 text-white flex items-center justify-center';
    }
    
    return seat.isAvailable 
      ? 'w-10 h-10 bg-green-100 text-green-800 hover:bg-green-200 flex items-center justify-center' 
      : 'w-10 h-10 bg-red-100 text-red-800 cursor-not-allowed flex items-center justify-center';
  };

  return (
    <button
      onClick={seat.type === 'normal' ? onClick : undefined}
      disabled={seat.type !== 'normal' || !seat.isAvailable}
      className={`rounded-md text-sm font-medium ${getSeatClass()}`}
    >
      {getSeatContent()}
    </button>
  );
};

export default BusSeatModal;

/*// components/BusSeatModal.tsx
import { useState } from 'react';

interface Seat {
    id: string;
    number: number;
    isAvailable: boolean;
    isSelected: boolean;
    position: 'left' | 'middle' | 'right';
}

interface BusSeatModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSeatsSelected: (selectedSeats: number[]) => void;
    pricePerSeat: number;
}

const BusSeatModal: React.FC<BusSeatModalProps> = ({
    isOpen,
    onClose,
    onSeatsSelected,
    pricePerSeat = 101
}) => {
    // Asientos basados en la imagen proporcionada
    const [seats, setSeats] = useState<Seat[]>(() => {
        const seatNumbers = {
            left: [13, 16, 19, 22, 25, 28, 31],
            middle: [15, 18, 21, 24, 27, 30, 33, 35, 37, 39],
            right: [14, 17, 20, 23, 26, 29, 32, 34, 36, 38]
        };

        const initialSeats: Seat[] = [];

        // Crear asientos izquierdos
        seatNumbers.left.forEach(num => {
            initialSeats.push({
                id: `left-${num}`,
                number: num,
                isAvailable: true, // Todos disponibles según la imagen (8 libres)
                isSelected: false,
                position: 'left'
            });
        });

        // Crear asientos medios
        seatNumbers.middle.forEach(num => {
            initialSeats.push({
                id: `middle-${num}`,
                number: num,
                isAvailable: false, // Todos ocupados según la imagen (31 coupados)
                isSelected: false,
                position: 'middle'
            });
        });

        // Crear asientos derechos
        seatNumbers.right.forEach(num => {
            initialSeats.push({
                id: `right-${num}`,
                number: num,
                isAvailable: false, // Todos ocupados según la imagen
                isSelected: false,
                position: 'right'
            });
        });

        // Hacer algunos disponibles para que coincida con "8 Libres"
        const availableSeats = [13, 16, 19, 22, 25, 28, 31, 14]; // Ejemplo
        initialSeats.forEach(seat => {
            if (availableSeats.includes(seat.number)) {
                seat.isAvailable = true;
            }
        });

        return initialSeats;
    });

    const selectedCount = seats.filter(seat => seat.isSelected).length;

    // En toggleSeatSelection simplificado:
    const toggleSeatSelection = (seatId: string) => {
        setSeats(prevSeats =>
            prevSeats.map(seat =>
                seat.id === seatId && seat.isAvailable
                    ? { ...seat, isSelected: !seat.isSelected }
                    : seat
            )
        );
    };
    const handleConfirmSelection = () => {
        const selectedSeatsNumbers = seats
            .filter(seat => seat.isSelected)
            .map(seat => seat.number);
        onSeatsSelected(selectedSeatsNumbers);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
                <div className="border-b p-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Selección de asientos</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>

                <div className="p-4">
                    <div className="flex justify-between mb-4 text-sm">
                        <span>8 Libres</span>
                        <span>Elégido</span>
                        <span>31 Ocupados</span>
                    </div>

                    <div className="flex justify-center mb-6">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                {seats
                                    .filter(seat => seat.position === 'left')
                                    .map(seat => (
                                        <SeatButton
                                            key={seat.id}
                                            seat={seat}
                                            onClick={() => toggleSeatSelection(seat.id)}
                                        />
                                    ))}
                            </div>

                            <div className="space-y-2">
                                {seats
                                    .filter(seat => seat.position === 'middle')
                                    .map(seat => (
                                        <SeatButton
                                            key={seat.id}
                                            seat={seat}
                                            onClick={() => toggleSeatSelection(seat.id)}
                                        />
                                    ))}
                            </div>

                            <div className="space-y-2">
                                {seats
                                    .filter(seat => seat.position === 'right')
                                    .map(seat => (
                                        <SeatButton
                                            key={seat.id}
                                            seat={seat}
                                            onClick={() => toggleSeatSelection(seat.id)}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm">Precio aproximado*</span>
                            <span className="text-sm">{selectedCount} Pasajero(s)</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold">S/.{pricePerSeat * selectedCount}</span>
                            <span className="text-sm">S/.{pricePerSeat} c/u</span>
                        </div>
                    </div>
                </div>

                <div className="border-t p-4 bg-gray-50 rounded-b-lg">
                    <button
                        onClick={handleConfirmSelection}
                        disabled={selectedCount === 0}
                        className={`w-full py-2 rounded-md ${selectedCount > 0
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        Continuar con {selectedCount} asiento{selectedCount !== 1 ? 's' : ''}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Componente auxiliar para los botones de asiento
const SeatButton: React.FC<{
    seat: Seat;
    onClick: () => void;
}> = ({ seat, onClick }) => {
    return (
        <button
            onClick={onClick}
            disabled={!seat.isAvailable}
            className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium ${seat.isSelected
                ? 'bg-blue-600 text-white'
                : seat.isAvailable
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-red-100 text-red-800 cursor-not-allowed'
                }`}
        >
            {seat.number}
        </button>
    );
};

export default BusSeatModal;
*/