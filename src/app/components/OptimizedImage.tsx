import Image from "next/image"
import { ComponentProps } from "react"

interface OptimizedImageProps extends Omit<ComponentProps<typeof Image>, 'placeholder' | 'blurDataURL'> {
  src: string
  alt: string
  priority?: boolean
  quality?: number
}

const defaultBlurData = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckriUpg4wTgDvXPUeaGOQg7xbWlwYHZ1nQJYE3AQbIJQtdCUqOTYNGjggBlMclMOGOa3JeJaOXFnZgC3ksLNw3r1D5FRRV6UQRH+tMf4JTT6Yaw/JXlPaJNLbJ7WEhfX1D3FFFAERRRX/9k="

export default function OptimizedImage({ 
  src, 
  alt, 
  priority = false, 
  quality = 85,
  className,
  ...props 
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      quality={quality}
      placeholder="blur"
      blurDataURL={defaultBlurData}
      className={className}
      {...props}
    />
  )
}
