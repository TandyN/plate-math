import { WeightType } from './ts_interfaces'

const plate_images: { [key in WeightType]: { [key: number]: string } } = {
  kilograms: {
    0.25: 'kg-0-25.svg',
    0.5: 'kg-0-5.svg',
    1.25: 'kg-1-25.svg',
    2.5: 'kg-2-5.svg',
    5: 'kg-5-0.svg',
    10: 'kg-10-0.svg',
    15: 'kg-15-0.svg',
    20: 'kg-20-0.svg',
    25: 'kg-25-0.svg',
  },
  pounds: {
    1.25: 'lbs-1-25.svg',
    2.5: 'lbs-2-5.svg',
    5: 'lbs-5-0.svg',
    10: 'lbs-10-0.svg',
    25: 'lbs-25-0.svg',
    35: 'lbs-35-0.svg',
    45: 'lbs-45-0.svg',
  },
}

class Plate {
  #weight: number
  #weight_type: WeightType
  #image: string

  constructor(weight: number, weight_type: WeightType) {
    if (weight < 0) {
      throw new Error('plate weight can not be negative')
    }

    if (!Object.values(WeightType).includes(weight_type)) {
      throw new Error(`weight type '${weight_type}' does not exist for plate`)
    }

    if (!plate_images[weight_type][weight]) {
      throw new Error(
        `plate number '${weight}' does not exist for '${weight_type}'`,
      )
    }

    this.#weight = weight
    this.#weight_type = weight_type
    this.#image = plate_images[weight_type][weight]
  }

  get_weight(): number {
    return this.#weight
  }

  get_weight_type(): WeightType {
    return this.#weight_type
  }

  get_image(): string {
    return this.#image
  }
}

export { Plate }
