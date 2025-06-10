import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "@/config/fonts";
export const metadata: Metadata = {
  title: "Orquídeas | Tour",
  description: "Viajes seguro para ti y para tus encomiendas",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        
        {children}
      </body>
    </html>
  );
}
