import Form from "next/form"
import ModelsGrid from "@/app/components/ModelsGrid"
import type { ModelsPageProps } from "@/app/types"
import { getModels } from "@/app/lib/models"
import Breadcrumb from "@/app/components/Breadcrumb"

export default async function Page({ searchParams }: ModelsPageProps) {
    const models = await getModels()
    const resolvedSearchParams = await searchParams
    const query = resolvedSearchParams?.q?.toLowerCase() || ""

    const filteredModels = query
        ? models.filter(model =>
            model.name.toLowerCase().includes(query) ||
            model.description.toLowerCase().includes(query)
        )
        : models

    return (
        <>
            <div className="px-2  mx-auto">
                <Breadcrumb items={[{ label: "Jewelry Collection" }]} />
            </div>
            <Form action="/3d-models" className="w-full px-5 md:px-0 md:max-w-xl">
                <input
                    type="text"
                    name="q"
                    placeholder="E.g. silver ring, pearl necklace"
                    autoComplete="off"
                    defaultValue={query}
                    className="w-full py-3 pl-5 pr-5 text-sm placeholder-gray-500 bg-white border border-[#606060] rounded-full focus:border-[#606060] focus:outline-none focus:ring-0 md:text-base"
                />
            </Form>
            <ModelsGrid title="Handmade Jewelry" models={filteredModels} />
        </>
    )
}
