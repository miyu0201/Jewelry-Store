"use client"
import { useState, useEffect } from 'react'
import { getModels } from '@/app/lib/models'
import type { Model } from '@/app/types'

export function useSimpleModels() {
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)

  // Load models and merge with localStorage liked states
  useEffect(() => {
    const loadModels = async () => {
      try {
        const data = await getModels()
        
        // Get liked items from localStorage
        let likedIds: number[] = []//array of liked model IDs
        // Without the check - this crashes during SSR
        if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('likedItems')
          if (saved) {
            try {
              likedIds = JSON.parse(saved)
            } catch (error) {
              console.error('Error parsing liked items:', error)
            }
          }
        }

        // Update models with liked status from localStorage
        const modelsWithLikedStatus = data.map(model => ({
          ...model,
          liked: likedIds.includes(model.id) // Check if model ID is in likedIds, if so, set liked to true, else remain false
        }))

        setModels(modelsWithLikedStatus)
      } catch (error) {
        console.error('Error loading models:', error)
      } finally {
        setLoading(false)
      }
    }
    loadModels()
  }, [])

  // Function to toggle liked status
  const toggleLiked = (id: number) => {
    setModels(prev => {
      const updated = prev.map(model => 
        model.id === id 
          ? { ...model, liked: !model.liked }
          : model
      )

      // Save updated liked IDs to update localStorage
      if (typeof window !== 'undefined') {
        const likedIds = updated.filter(model => model.liked).map(model => model.id)
        localStorage.setItem('likedItems', JSON.stringify(likedIds))
      }

      return updated
    })
  }

  const clearAllLiked = () => {
    setModels(prev => {
      const updated = prev.map(model => ({ ...model, liked: false }))
      // Clear liked items from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('likedItems')
      }
      return updated
    })
  }



  // Helper functions
  const getLikedModels = () => models.filter(model => model.liked)
  const getLikedCount = () => models.filter(model => model.liked).length
  const isLiked = (id: number) => models.find(model => model.id === id)?.liked || false

  return {
    models,
    loading,
    toggleLiked,
    getLikedModels,
    getLikedCount,
    isLiked,
    clearAllLiked,
  }
}
