import { WeightType } from './ts_interfaces'

const plate_images: { [key in WeightType]: { [key: number]: string } } = {
  kilograms: {
    0.25: 'img',
    0.5: 'img',
    1.25: 'img',
    2.5: 'img',
    5: 'img',
    10: 'img',
    15: 'img',
    20: 'img',
    25: 'img',
  },
  pounds: {
    1.25: 'img',
    2.5: 'img',
    5: 'img',
    10: 'img',
    25: 'img',
    35: 'img',
    45: 'img',
  },
}

class Plate {
  weight: number
  weight_type: WeightType
  image: string

  constructor(weight: number, weight_type: WeightType) {
    if (weight < 0) {
      throw new Error('plate weight can not be negative')
    }

    if (!Object.values(WeightType).includes(weight_type)) {
      console.warn(
        `weight_type '${weight_type}' does not exist for plate. assuming kilograms`,
      )
      weight_type = WeightType.kgs
    }

    this.weight = weight
    this.weight_type = weight_type

    if (!plate_images[weight_type][weight]) {
      throw new Error(
        `plate number '${weight}' does not exist for '${weight_type}'`,
      )
    }

    this.image = plate_images[weight_type][weight]
  }
}

export { Plate }
