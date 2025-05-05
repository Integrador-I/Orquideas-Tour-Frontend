import { HeaderPage } from "@/components/Presentacion/headerPage";
import { geistMono, geistSans } from "@/config/fonts";

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
        <HeaderPage/>
        {children}
      </body>
    </html>
  );
}