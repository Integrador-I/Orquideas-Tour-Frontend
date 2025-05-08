import { Geist, Geist_Mono, Lexend, Montserrat_Alternates } from "next/font/google";
export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });
  
  export const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });
  export const titleFont = Montserrat_Alternates({
    weight:['500','700'],
    subsets: ["latin"]
  });
  export const heading = Lexend({
    variable:"--font-lexend",
    weight:['500','700'],
    subsets:["latin"]
  })