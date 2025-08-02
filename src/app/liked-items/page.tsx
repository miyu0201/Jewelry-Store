"use client";
import Image from "next/image";
import { useSimpleModels } from "../hooks/useSimpleModels";
import { FaTrash } from "react-icons/fa6";
import Link from "next/link";
import Breadcrumb from "../components/Breadcrumb";

export default function LikedItemsPage() {
  const { getLikedModels, getLikedCount, clearAllLiked, toggleLiked, loading } =
    useSimpleModels();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] px-5">
        <p className="text-gray-600">Loading liked items...</p>
      </div>
    );
  }

  const likedModels = getLikedModels();
  const likedCount = getLikedCount();

  if (likedModels.length === 0) {
    return (    
      <div className="flex flex-col items-center justify-center min-h-[500px] px-5">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Your Liked Items
        </h1>
        <p className="text-gray-600 text-center">
          You haven&apos;t liked any jewelry items yet. Browse our collection and
          heart the items you love!
        </p>
      </div>
    );
  }

  return (
    <div className="px-5 py-8 max-w-4xl mx-auto">
      <Breadcrumb items={[{ label: "Liked Items" }]} />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Your Liked Items
      </h1>
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-gray-600">
            You have {likedCount} liked item{likedCount !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={clearAllLiked}
          className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          Clear all liked items
        </button>
      </div>

      <div className="space-y-4">
        {likedModels.map((model) => (
          <div
            key={model.id}
            className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Image */}
            <Link
              href={`/3d-models/${model.id}`}
              className="flex-shrink-0 w-20 h-20 mr-4 relative cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Image
                src={model.image}
                alt={model.name}
                fill
                sizes="80px"
                className="object-cover rounded-md"
                quality={80}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckriUpg4wTgDvXPUeaGOQg7xbWlwYHZ1nQJYE3AQbIJQtdCUqOTYNGjggBlMclMOGOa3JeJaOXFnZgC3ksLNw3r1D5FRRV6UQRH+tMf4JTT6Yaw/JXlPaJNLbJ7WEhfX1D3FFFAERRRX/9k="
              />
            </Link>

            {/* Name and Description */}
            <div className="flex-grow">
              <Link href={`/3d-models/${model.id}`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 cursor-pointer hover:text-blue-600 transition-colors">
                  {model.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-600 line-clamp-2">
                {model.description}
              </p>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <span>❤️ {model.likes} likes</span>
              </div>
            </div>
            <button
              onClick={() => toggleLiked(model.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
              aria-label="Remove from cart"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
