"use client"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "../context/CartContext"
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa6"
import Breadcrumb from "../components/Breadcrumb"

export default function CartPage() {
    const { 
        cartItems, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        getCartCount, 
        getCartTotal 
    } = useCart()

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] px-5">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Shopping Cart</h1>
                <p className="text-gray-600 text-center mb-6">
                    Your cart is empty. Browse our jewelry collection and add items to your cart!
                </p>
                <Link 
                    href="/3d-models" 
                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    Browse Jewelry
                </Link>
            </div>
        )
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price)
    }

    return (
        <div className="px-5 py-8 max-w-6xl mx-auto">
            <Breadcrumb items={[{ label: "Shopping Cart" }]} />
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                <button
                    onClick={clearCart}
                    className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                    Clear Cart
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => {
                        const itemPrice = item.model.price || 0 // Fallback to 0 if price is undefined
                        const itemTotal = itemPrice * item.quantity

                        return (
                            <div 
                                key={item.model.id} 
                                className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                            >
                                {/* Image */}
                                <Link href={`/3d-models/${item.model.id}`} className="flex-shrink-0 w-20 h-20 mr-4 relative cursor-pointer hover:opacity-80 transition-opacity">
                                    <Image
                                        src={item.model.image}
                                        alt={item.model.name}
                                        fill
                                        sizes="80px"
                                        className="object-cover rounded-md"
                                        quality={80}
                                    />
                                </Link>
                                
                                {/* Item Details */}
                                <div className="flex-grow">
                                    <Link href={`/3d-models/${item.model.id}`}>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1 cursor-pointer hover:text-blue-600 transition-colors">
                                            {item.model.name}
                                        </h3>
                                    </Link>
                                    <p className="text-sm text-gray-600 mb-2">
                                        {item.model.category}
                                    </p>
                                    <p className="text-lg font-bold text-gray-900">
                                        {formatPrice(itemPrice)}
                                    </p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-3 mx-4">
                                    <button
                                        onClick={() => updateQuantity(item.model.id, item.quantity - 1)}
                                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                                        aria-label="Decrease quantity"
                                    >
                                        <FaMinus className="w-3 h-3 text-gray-600" />
                                    </button>
                                    
                                    <span className="font-semibold text-lg min-w-[2rem] text-center">
                                        {item.quantity}
                                    </span>
                                    
                                    <button
                                        onClick={() => updateQuantity(item.model.id, item.quantity + 1)}
                                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                                        aria-label="Increase quantity"
                                    >
                                        <FaPlus className="w-3 h-3 text-gray-600" />
                                    </button>
                                </div>

                                {/* Item Total & Remove */}
                                <div className="flex flex-col items-end gap-2">
                                    <p className="text-lg font-bold text-gray-900">
                                        {formatPrice(itemTotal)}
                                    </p>
                                    <button
                                        onClick={() => removeFromCart(item.model.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                        aria-label="Remove from cart"
                                    >
                                        <FaTrash className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Cart Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                        
                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between text-gray-600">
                                <span>Items ({getCartCount()})</span>
                                <span>{formatPrice(getCartTotal())}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="border-t pt-3">
                                <div className="flex justify-between text-xl font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>{formatPrice(getCartTotal())}</span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold">
                            Proceed to Checkout
                        </button>
                        
                        <Link 
                            href="/3d-models" 
                            className="block w-full text-center mt-3 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
