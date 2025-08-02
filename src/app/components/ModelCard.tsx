"use client"
import Link from "next/link"
import { FaRegHeart, FaHeart, FaCartShopping } from "react-icons/fa6"
import Pill from "./Pill"
import { ModelCardProps } from "@/app/types"
import Image from "next/image"
import { useSimpleModels } from "../hooks/useSimpleModels"
import { useCart } from "../context/CartContext"

export default function ModelCard({ model }: ModelCardProps) {
    const { toggleLiked, isLiked } = useSimpleModels()
    const { addToCart, isInCart } = useCart()

    const handleHeartClick = (e: React.MouseEvent) => {
        e.preventDefault() // Prevent navigation to detail page
        e.stopPropagation() // Stop event bubbling
        toggleLiked(model.id)
        console.log(`Model ${model.id} liked state:`, !isLiked(model.id))
    }

    const handleCartClick = (e: React.MouseEvent) => {
        e.preventDefault() // Prevent navigation to detail page
        e.stopPropagation() // Stop event bubbling
        addToCart(model)
        console.log(`Added model ${model.id} to cart`)
    }
    return (
        <Link
            href={`/3d-models/${model.id}`}
            className="block group hover:shadow-[0_5px_12px_rgba(0,0,0,0.1)] hover:-translate-y-[3px] transition-all"
            aria-labelledby={`model-${model.id}-title`}
        >
            <div className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg" role="article">
                <div className="relative aspect-square">
                    <Image
                        src={model.image}
                        alt={model.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        priority={false}
                        quality={85}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckriUpg4wTgDvXPUeaGOQg7xbWlwYHZ1nQJYE3AQbIJQtdCUqOTYNGjggBlMclMOGOa3JeJaOXFnZgC3ksLNw3r1D5FRRV6UQRH+tMf4JTT6Yaw/JXlPaJNLbJ7WEhfX1D3FFFAERRRX/9k="
                    />
                </div>
                <div className="p-4">
                    <div className="flex justify-between mb-2 min-h-[3.5rem]">
                        <h2 id={`model-${model.id}-title`} className="text-xl font-semibold text-gray-800 line-clamp-2">
                            {model.name}
                        </h2>
                    </div>
                    <p className="text-gray-800 text-sm line-clamp-2 min-h-[2.5rem] leading-[1.25rem]">
                        {model.description}
                    </p>
                    <div className="mt-2">
                        <Pill>{model.category}</Pill>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <div className="flex flex-col gap-1">
                            <div className="text-lg font-bold text-green-600">
                                ${model.price.toFixed(2)}
                            </div>
                            <div className="flex items-center text-gray-600" aria-label={`${model.likes} likes`}>
                                <span className="text-xs">{model.likes} likes</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleCartClick}
                                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                                aria-label={isInCart(model.id) ? "Already in cart" : "Add to cart"}
                            >
                                <FaCartShopping 
                                    className={`w-5 h-5 transition-colors ${
                                        isInCart(model.id) 
                                            ? "text-blue-500" 
                                            : "text-gray-400 hover:text-blue-500"
                                    }`} 
                                    aria-hidden="true" 
                                />
                            </button>
                            <button
                                onClick={handleHeartClick}
                                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                                aria-label={isLiked(model.id) ? "Unlike this item" : "Like this item"}
                            >
                                {isLiked(model.id) ? (
                                    <FaHeart className="w-5 h-5 text-red-500" aria-hidden="true" />
                                ) : (
                                    <FaRegHeart className="w-5 h-5 text-gray-400 hover:text-red-500" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
