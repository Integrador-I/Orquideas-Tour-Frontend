'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface SeatModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (selectedSeat: number) => void;
}

export function SeatModal({ open, onClose, onConfirm }: SeatModalProps) {
    const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

    // Asientos ocupados
    const occupiedSeats = [3, 2, 1, 5, 4, 12, 31, 9, 10, 11];

    // Grupos de asientos corregidos
    const seatGroups = [
        [1, 2, 3, 4, 5, 6, 7, 8], 
        [9, 10, 11, 12, 13, 14, 15, 16],      
        [null, null, null, null, null, null, null, null],
        [17, null, null, 20, 21, 22, 23, 24],   
        [25, null, null, 26, 27, 28, 29, 30]
    ];

    const handleSeatSelect = (seatNumber: number) => {
        if (occupiedSeats.includes(seatNumber)) return;
        setSelectedSeat(seatNumber === selectedSeat ? null : seatNumber);
    };

    const handleConfirm = () => {
        if (selectedSeat) {
            onConfirm(selectedSeat);
            onClose();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md rounded-lg">
                <DialogHeader>
                    <DialogTitle className="sr-only">Selección de asientos</DialogTitle>
                    <div className="flex justify-between items-center w-full mb-4">
                        <h2 className="font-bold text-lg">Piso 1</h2>
                        <div className="text-sm">
                            <span className="text-green-600">6 Libres</span> |
                            <span className="text-blue-600"> {selectedSeat ? 1 : 0} Elegido</span> |
                            <span className="text-gray-500"> 33 Ocupados</span>
                        </div>
                    </div>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    {/* Precio aproximado */}
                    <div className="bg-gray-100 p-3 rounded-lg">
                        <p className="text-sm font-medium">Precio aproximado*</p>
                        <div className="flex justify-between items-center">
                            <span>1 Pasajero</span>
                            <span className="font-bold">S/.105</span>
                        </div>
                    </div>

                    {/* Contador a bordo */}
                    <div className="flex justify-between items-center">
                        <span className="font-medium">A bordo</span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg">37</span>
                    </div>

                    {/* Mapa de asientos corregido */}
                    <div className="flex justify-between gap-2 mt-4">
                        {seatGroups.map((column, columnIndex) => (
                            <div key={columnIndex} className="flex-1 flex flex-col gap-1">
                                {column.map((seat, seatIndex) => (
                                    seat === null ? (
                                        <div
                                            key={`empty-${columnIndex}-${seatIndex}`}
                                            className="h-8"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <button
                                            key={seat}
                                            onClick={() => handleSeatSelect(seat)}
                                            disabled={occupiedSeats.includes(seat)}
                                            aria-label={`Asiento ${seat}`}
                                            aria-pressed={selectedSeat === seat}
                                            className={`
                                                w-full h-8 flex items-center justify-center rounded
                                                ${occupiedSeats.includes(seat)
                                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                    : selectedSeat === seat
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-gray-100 hover:bg-gray-200'}
                                            `}
                                        >
                                            {seat}
                                        </button>
                                    )
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Precio final */}
                    <div className="border-t pt-3 text-center font-bold text-lg">
                        S/.105
                    </div>
                </div>

                <div className="mt-4">
                    <Button
                        onClick={handleConfirm}
                        disabled={!selectedSeat}
                        className="w-full bg-blue-600 hover:bg-blue-700 py-2 text-lg"
                        aria-label="Continuar con la selección de asientos"
                    >
                        Continuar con {selectedSeat ? 1 : 0} asiento
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}