"use client";

import { useEffect, useState } from "react";
import axios from "axios";


export const TableBus = () => {
    const [buses, setBuses] = useState([]);

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const response = await axios.get("http://localhost:8080/bus");
                setBuses(response.data);
            } catch (error) {
                console.error("Error al obtener buses:", error);
            }
        };

        fetchBuses();
    }, []);
    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/bus/${id}`);
            setBuses((prev) => prev.filter((bus: any) => bus.id !== id));
        } catch (error) {
            console.error("Error al eliminar el bus:", error);
        }
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4" />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Plate</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3">Capacity</th>
                        <th className="px-6 py-3">State</th>
                        <th className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {buses.map((bus: any) => (
                        <tr key={bus.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input type="checkbox" className="w-4 h-4" />
                                    <label className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{bus.id}</td>
                            <td className="px-6 py-4">{bus.plate}</td>
                            <td className="px-6 py-4">{bus.type}</td>
                            <td className="px-6 py-4">{bus.capacity}</td>
                            <td className="px-6 py-4">{bus.state}</td>
                            <td className="flex items-center px-6 py-4">
                                <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                <a
                                    href="#"
                                    onClick={() => handleDelete(bus.id)}
                                    className="text-red-600 dark:text-red-500 hover:underline ms-3"
                                >
                                    Remove
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
