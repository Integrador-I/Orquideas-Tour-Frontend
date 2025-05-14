"use client";
import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function CalendarioFecha({
  label,
  optional = false,
}: {
  label: string;
  optional?: boolean;
}) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[220px] h-12 justify-start rounded-md px-4 text-left font-normal border-none border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-0 focus:ring-offset-0 shadow-sm",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
          <div className="flex flex-col text-left">
            <span className="text-xs text-gray-500">{label}</span>
            <span className="text-sm font-semibold">
              {optional && !date
                ? "* Opcional"
                : format(date ?? new Date(), "d MMM yyyy", { locale: es })}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 mt-2 border border-gray-200 bg-white rounded-md shadow-lg">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className="rounded-md"
        />
      </PopoverContent>
    </Popover>
  );
}
