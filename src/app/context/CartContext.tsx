"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Model } from '@/app/types'

type CartItem = {
  model: Model
  quantity: number
}

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (model: Model) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getCartCount: () => number
  getCartTotal: () => number
  isInCart: (id: number) => boolean
  getItemQuantity: (id: number) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cartItems')
      if (saved) {
        try {
          const parsedCartItems = JSON.parse(saved)
          // Check if cart items have price property, if not clear cart (migration)
          const hasValidPrices = parsedCartItems.every((item: CartItem) => 
            item.model && typeof item.model.price === 'number'
          )
          if (hasValidPrices) {
            setCartItems(parsedCartItems)
          } else {
            // Clear invalid cart data
            localStorage.removeItem('cartItems')
            console.log('Cleared old cart data due to missing price information')
          }
        } catch (error) {
          console.error('Error parsing cart items from localStorage:', error)
          localStorage.removeItem('cartItems')
        }
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }
  }, [cartItems])

  const addToCart = (model: Model) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.model.id === model.id)
      
      if (existingItem) {
        // If item exists, remove it from cart (toggle behavior)
        return prev.filter(item => item.model.id !== model.id)
      } else {
        // If new item, add to cart
        return [...prev, { model, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.model.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.model.id === id
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.model.price || 0 // Fallback to 0 if price is undefined
      return total + (price * item.quantity)
    }, 0)
  }

  const isInCart = (id: number) => {
    return cartItems.some(item => item.model.id === id)
  }

  const getItemQuantity = (id: number) => {
    const item = cartItems.find(item => item.model.id === id)
    return item ? item.quantity : 0
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartCount,
      getCartTotal,
      isInCart,
      getItemQuantity
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
