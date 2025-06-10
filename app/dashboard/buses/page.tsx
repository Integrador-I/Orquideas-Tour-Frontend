import { FormBus } from "@/components/Dashboard/buses/form";
import { TableBus } from "@/components/Dashboard/buses/tableBus";

export default function Buses() {
    return (
        <div className="min-h-screen px-4 py-8 flex flex-col items-center bg-white">
            <h1 className="text-2xl font-semibold mb-6">Administracion de buses</h1>

            <div className="w-full max-w-md p-6 rounded-lg ">
                    <FormBus />

            </div>
            <div className="w-full max-w-4xl">
                <TableBus />
            </div>
        </div>
    );
}
