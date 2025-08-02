"use client";
import { useState, useEffect } from "react";
import {
  FaRegHeart,
  FaCartShopping,
  FaPlus,
  FaMinus,
} from "react-icons/fa6";
import Pill from "@/app/components/Pill";
import type { ModelDetailPageProps, Model } from "@/app/types";
import { getModelById } from "@/app/lib/models";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import Breadcrumb from "@/app/components/Breadcrumb";

export default function ModelDetailPage({ params }: ModelDetailPageProps) {
  const [model, setModel] = useState<Model | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const { addToCart, cartItems, isInCart, removeFromCart, getItemQuantity, updateQuantity } = useCart();

  useEffect(() => {
    const loadModel = async () => {
      const { id } = await params;
      const modelData = await getModelById(id);
      setModel(modelData);
    };
    loadModel();
  }, [params]);

  // Reset quantity to 1 when item is not in cart, or sync with cart quantity when it is
  useEffect(() => {
    if (model) {
      const cartQuantity = getItemQuantity(model.id);
      if (cartQuantity > 0) {
        setQuantity(cartQuantity);
      } else {
        setQuantity(1);
      }
    }
  }, [model, getItemQuantity, cartItems]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 0 && newQuantity <= 99) {
      setQuantity(newQuantity);
      // If item is in cart, update the cart quantity
      if (inCart) {
        if (newQuantity === 0) {
          removeFromCart(model!.id);
        } else {
          updateQuantity(model!.id, newQuantity);
        }
      }
    }
  };

  const handleAddToCart = () => {
    if (!model) return;

    // If item is already in cart, update quantity, otherwise add new
    if (inCart) {
      const currentCartQuantity = getItemQuantity(model.id);
      updateQuantity(model.id, currentCartQuantity + quantity);
    } else {
      for (let i = 0; i < quantity; i++) {
        addToCart(model);
      }
    }
    
    setShowAddedMessage(true);
    setTimeout(() => {
      setShowAddedMessage(false);
    }, 2000);
  };

  if (!model) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  const inCart = isInCart(model.id);

  return (
    <div className="container max-w-6xl px-4 py-8 mx-auto">
      <Breadcrumb items={[
        { label: "Jewelry Collection", href: "/3d-models" },
        { label: model.name }
      ]} />
      <article className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Image Section */}
        <figure className="relative overflow-hidden rounded-lg shadow-lg aspect-square">
          <Image
            src={model.image}
            alt={`Jewelry piece: ${model.name}`}
            className="absolute inset-0 object-cover w-full h-full"
            width={500}
            height={500}
            priority
            quality={90}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckriUpg4wTgDvXPUeaGOQg7xbWlwYHZ1nQJYE3AQbIJQtdCUqOTYNGjggBlMclMOGOa3JeJaOXFnZgC3ksLNw3r1D5FRRV6UQRH+tMf4JTT6Yaw/JXlPaJNLbJ7WEhfX1D3FFFAERRRX/9k="
          />
        </figure>

        {/* Content Section */}
        <section className="flex flex-col justify-center h-full">
          <div
            className="flex items-center mb-2 text-2xl text-gray-600"
            role="status"
            aria-label="Likes count"
          >
            <FaRegHeart className="w-5 h-5 mr-2" aria-hidden="true" />
            <span className="font-light" aria-label={`${model.likes} likes`}>
              {model.likes}
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold">{model.name}</h1>

          <div className="mb-6">
            <span className="text-3xl font-bold text-green-600">
              {formatPrice(model.price)}
            </span>
          </div>

          <Pill className="mb-6 w-fit">{model.category}</Pill>

          <div className="mb-6 prose prose-lg max-w-none">
            <p className="leading-relaxed text-gray-700">{model.description}</p>
          </div>

          {/* Quantity Selector - Only show if item is in cart */}
          {inCart && (
            <div className="mt-8 mb-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 0}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Decrease quantity"
                >
                  <FaMinus className="w-3 h-3 text-gray-600" />
                </button>

                <input
                  id="quantity"
                  type="number"
                  min="0"
                  max="99"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    if (value >= 0 && value <= 99) {
                      setQuantity(value);
                      // If item is in cart, update the cart quantity
                      if (inCart) {
                        if (value === 0) {
                          removeFromCart(model.id);
                        } else {
                          updateQuantity(model.id, value);
                        }
                      }
                    }
                  }}
                  className="w-16 px-3 py-2 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 99}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Increase quantity"
                >
                  <FaPlus className="w-3 h-3 text-gray-600" />
                </button>
              </div>

              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700 text-center">
                  ✓ {quantity} {quantity === 1 ? 'item' : 'items'} in cart
                </p>
              </div>
              {quantity > 1 && (
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Total: {formatPrice(model.price * quantity)}
                </p>
              )}
            </div>
          )}

          {/* Add to Cart Button - Only show if item is NOT in cart */}
          {!inCart && (
            <div className=" mt-8 mb-6">
              <button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  showAddedMessage
                    ? "bg-green-600 text-white"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                <FaCartShopping className="w-5 h-5" />
                Add to Cart
              </button>

              {quantity > 1 && (
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Total: {formatPrice(model.price * quantity)}
                </p>
              )}
            </div>
          )}

          <footer className="text-sm text-gray-500">
            <time dateTime={model.dateAdded}>
              Added on {new Date(model.dateAdded).toLocaleDateString()}
            </time>
          </footer>
        </section>
      </article>
    </div>
  );
}
