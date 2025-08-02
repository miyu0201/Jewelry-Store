import "./globals.css";
import type { RootLayoutProps } from "@/app/types"
import { Albert_Sans, Montserrat_Alternates } from "next/font/google"
import Navbar from "@/app/components/Navbar"
import { CartProvider } from "./context/CartContext"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Artisan Jewels - Handcrafted Jewelry Collection",
  description: "Discover unique handcrafted jewelry pieces from talented artisans. Browse our collection of rings, necklaces, earrings, and more.",
}

const albertSans = Albert_Sans({
  subsets: ["latin"],
  display: "swap"
})

const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat-alternates"
})

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${albertSans.className} ${montserratAlternates.variable}`}>
        <CartProvider>
          <Navbar />
          {children}
          <footer className="bottom-0 left-0 right-0 py-2 text-center text-gray-500 bg-white">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Artisan Jewels. All rights reserved.
            </p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
