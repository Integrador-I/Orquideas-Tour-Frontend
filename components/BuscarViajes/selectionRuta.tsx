import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px] rounded-md border-none border-gray-300 shadow-sm focus:outline-none">
        <SelectValue placeholder="Seleciona una ruta" />
      </SelectTrigger>
      <SelectContent className="w-[180px] max-w-[180px] overflow-hidden z-50 fixed" side="bottom" align="start" sideOffset={4}>
        <SelectGroup>
          <SelectLabel>Rutas</SelectLabel>
          <SelectItem value="apple">Arequipa</SelectItem>
          <SelectItem value="banana">Omate</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
