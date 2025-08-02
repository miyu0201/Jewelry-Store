"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import NavLink from "@/app/components/NavLink"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useCart } from "../context/CartContext"

export default function Navbar() {
const pathname = usePathname()
const { getCartCount } = useCart()
const [cartCount, setCartCount] = useState(0)
const [isClient, setIsClient] = useState(false)

useEffect(() => {
  setIsClient(true)
  setCartCount(getCartCount())
}, [getCartCount])

// Update cart count when cart changes
useEffect(() => {
  if (isClient) {
    setCartCount(getCartCount())
  }
}, [getCartCount, isClient])

  return (
    <header className="w-full bg-white">
      <nav className="flex justify-between px-6 py-4 pr-2">
        <Link href="/">
          <div className="relative cursor-pointer">
            {/* Desktop Logo */}
            <Image
              src="/artisan-jewels-logo.png"
              alt="Artisan Jewels Logo"
              width={200}
              height={20}
              className="w-[200px] h-auto hidden md:block"
              priority={true}
              quality={90}
            />
            {/* Mobile Logo */}
            <Image
              src="/artisan-jewels-logo.png"
              alt="Artisan Jewels Logo"
              width={40}
              height={40}
              className="w-[40px] h-auto block md:hidden"
              priority={true}
            />
          </div>
        </Link>
        <ul className="flex items-center gap-1.5">
          <NavLink href="/3d-models" isActive={pathname?.startsWith("/3d-models") || false}>
            Jewelry
          </NavLink>
          <NavLink href="/about" isActive={pathname === "/about"}>
            About
          </NavLink>
          
          {/* Icon group with proper spacing */}
          <li className="flex items-center gap-3 ml-6">
            {/* Shopping Cart Icon */}
            <Link href="/cart" className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <svg 
                className="w-5 h-5 text-gray-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h7M17 8v8a2 2 0 01-2 2H9a2 2 0 01-2-2V8" 
                />
              </svg>
              {isClient && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
            
            {/* Liked Items Icon */}
            <Link href="/liked-items" className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <svg 
                className="w-5 h-5 text-gray-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
            </Link>
            
            {/* Profile Icon */}
            {/* <Link href="/profile" className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <svg 
                className="w-5 h-5 text-gray-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
            </Link> */}
          </li>
        </ul>
      </nav>
    </header>
  )
}