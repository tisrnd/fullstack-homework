import { Crop, Field } from './types'

const SOIL_SERVICE_URL = 'http://localhost:3000'

export const fetchFields = async (fields?: Array<Field> | undefined): Promise<Array<Field>> => {
  if (fields) {
    return await fetch(`${SOIL_SERVICE_URL}/fields`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({fields: fields}),
    }).then(response => response.json())
  }

  return await fetch(`${SOIL_SERVICE_URL}/fields`).then(response => response.json())
}
  

export const fetchCrops = async (): Promise<Array<Crop>> =>
  await fetch(`${SOIL_SERVICE_URL}/crops`).then(response => response.json())
