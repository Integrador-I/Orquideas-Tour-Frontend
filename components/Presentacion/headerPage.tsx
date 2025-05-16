"use client";
import Link from "next/link";
import { heading, titleFont } from "@/config/fonts";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrClose } from "react-icons/gr";
import { LoginMenu } from "./LoginMenu/loginMenu";

export const HeaderPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent text-white dark:text-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
      <div className="flex justify-between items-center px-5 py-3 lg:px-5 xl:px-10 2xl:px-20">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMenu}
            className="lg:hidden text-2xl text-[#79808a] dark:text-white"
          >
            {isOpen ? <GrClose /> : <RxHamburgerMenu />}
          </button>

          <Link
            href="#"
            className={`${titleFont.className} relative flex items-center h-10 ml-2`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className={`font-bold text-white text-2xl lg:text-2xl dark:text-white transition-all duration-300 ${isHovering ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
              OT
            </span>
            <span className={`absolute left-0 font-bold text-[#F8D440] text-2xl lg:text-2xl dark:text-white transition-all duration-300  ${isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              Orquídeas Tour
            </span>
          </Link>
        </div>

        {/* Resto del código permanece igual */}
        <nav className={`absolute top-full left-0 w-full bg-white dark:bg-gray-800 lg:static lg:flex lg:w-auto lg:bg-transparent lg:dark:bg-transparent transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible lg:opacity-100 lg:visible"}`}>
          <ul className="flex flex-col items-center py-4 lg:flex-row lg:py-0 lg:space-x-10 ">
            {[
              { name: 'Inicio', path: '/inicio' },
              { name: 'Viajes', path: '/viajes' },
              { name: 'Seguimientos', path: '/seguimiento'},
              { name: 'Paqueteria', path: '/encomiendas' },
              { name: 'Centro de Ayuda', path: '/pagos' },
            ].map((item) => (
              <li key={item.name} className="w-full text-center lg:w-auto">
                <Link
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`${heading.className} block px-4 py-3 text-lg lg:text-xl text-white hover:text-[#F8D440] hover:underline  dark:text-white dark:hover:text-blue-400`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-4">
            <LoginMenu />
          </div>
        </div>
      </div>

      <div className={`lg:hidden px-5 pb-4 transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible h-0"}`}>
        <div className="flex flex-col gap-3">
          <Link
            href="./auth/login"
            className={`${heading.className} w-full py-2 text-center text-lg rounded-lg border-2 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
          >
            Sign In
          </Link>
          <Link
            href="./auth/new-account"
            className={`${heading.className} w-full py-2 text-center text-lg rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300`}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};