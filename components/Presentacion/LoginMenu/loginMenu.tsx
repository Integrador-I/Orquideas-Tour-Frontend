"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { VscAccount } from "react-icons/vsc"
import { SlArrowDown } from "react-icons/sl"
import Link from "next/link"
import { heading } from "@/config/fonts"

export function LoginMenu() {
  return (
    <div className="hidden lg:flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 focus:outline-none cursor-pointer">
            <VscAccount className="text-3xl" />
            <SlArrowDown className="text-sm" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 dark:bg-gray-800">
          <DropdownMenuItem className="p-0">
            <Link
              href="/autenticacion/login"
              className={`${heading.className} w-full px-2 py-1.5 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              Iniciar Sesión
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <Link
              href="/autenticacion/registro"
              className={`${heading.className} w-full px-2 py-1.5 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              Registrarse
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}