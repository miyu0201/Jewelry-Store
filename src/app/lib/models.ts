import modelsData from "../data/models.json"
import type { Model, GetModelsParams } from "../types"

//getModels function takes in a param, which is destructed type category from GetModelsParams, the function return a Array of Model objects
export async function getModels({ category }: GetModelsParams = {}): Promise<Model[]> {
  let filteredJewelry = [...modelsData]
  if (category) {
    filteredJewelry = modelsData.filter(
      (model: Model) => model.category === category
    )
  }
  return filteredJewelry
}
//the function takes in an id, which can be a string or number, and returns a Promise that resolves to a Model object
export async function getModelById(id: string | number): Promise<Model> {

  const foundJewelry = modelsData.find(
    (model: Model) => model.id.toString() === id.toString()
  )
  if (!foundJewelry) {
    throw new Error(`Jewelry item with id ${id} not found`)
  }
  return foundJewelry
}