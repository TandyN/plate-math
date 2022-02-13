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
    50: 'img',
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

class Weight {
  weight: number
  weight_type: WeightType
  weight_image: string

  constructor(weight: number, weight_type: WeightType) {
    this.weight = weight
    this.weight_type = weight_type

    if (!plate_images[weight_type][weight]) {
      throw new Error('weight does not exist')
    }

    this.weight_image = plate_images[weight_type][weight]
  }
}

export { Weight, plate_images }
