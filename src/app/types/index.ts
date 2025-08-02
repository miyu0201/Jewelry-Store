import type { ReactNode } from "react"

// Data Types
export type Model = {
    id: number
    name: string
    description: string
    likes: number
    price: number
    image: string
    category: string
    dateAdded: string
    liked: boolean
}

export type Category = {
    displayName: string
    slug: string
}

export type CategoriesData = {
    categories: Category[]
}

export type GetModelsParams = {
    category?: string
}

// Extract the category type from GetModelsParams
export type CategoryType = GetModelsParams['category']  // string | undefined
export type RequiredCategoryType = NonNullable<GetModelsParams['category']>  // string

// Page Types
export type CategoryPageProps = {
    params: Promise<{
        categoryName: string
    }>
}

export type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>

export type ModelsPageProps = {
    searchParams: Promise<{
        q?: string
    }>
}

export type ModelDetailPageProps = {
    params: Promise<{
        id: string
    }>
}

// Components Types
export type ModelCardProps = {
    model: Model
}

export type ModelsGridProps = {
    title: string
    models: Model[]
}

export type PillProps = {
    children: ReactNode
    className?: string
}

export type NavLinkProps = {
    href: string
    children: ReactNode
    isActive?: boolean
}