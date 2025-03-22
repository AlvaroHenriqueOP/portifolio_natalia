import { Inter } from "next/font/google";
import "./globals.css";
import AOSInitializer from "../components/AOS";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Portfólio Natália Gomes",
  description: "Designer gráfica com 5+ anos de experiência em branding, UI/UX e motion design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <AOSInitializer />
        {children}
      </body>
    </html>
  );
}
