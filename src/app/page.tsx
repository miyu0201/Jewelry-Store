import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main>
     <section className="flex flex-col-reverse items-center justify-between gap-8 mx-auto md:flex-row max-w-7xl py-12 md:min-h-screen md:py-0">
        <div className="flex-1 space-y-6">
          <p className="hidden text-sm text-gray-600 uppercase md:block">
            Your destination for unique handcrafted jewelry
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">
            Discover the Art of Handmade Jewelry
          </h1>
          <p className="text-lg text-gray-600">
            Join our community of artisans and explore a stunning
            collection of handcrafted jewelry pieces.
          </p>

          <div className="flex gap-4">
            <Link
              href="/3d-models"
              className="px-6 py-3 text-black transition duration-100 bg-white border-2 border-black hover:bg-black hover:text-white"
            >
              Browse Jewelry
            </Link>
          </div>
        </div>
        <div className="relative w-[350px] h-[350px] flex-shrink-0">
          <Image 
            src="/home.jpg" 
            alt="Handmade Jewelry Collection"
            fill
            sizes="(max-width: 768px) 100vw, 350px"
            className="object-cover rounded-lg"
            priority={true}
            quality={90}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckriUpg4wTgDvXPUeaGOQg7xbWlwYHZ1nQJYE3AQbIJQtdCUqOTYNGjggBlMclMOGOa3JeJaOXFnZgC3ksLNw3r1D5FRRV6UQRH+tMf4JTT6Yaw/JXlPaJNLbJ7WEhfX1D3FFFAERRRX/9k="
          />
        </div>
      </section>

    </main>
  )
}
