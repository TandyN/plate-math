import { Plate } from './Plate'
import { WeightType } from './ts_interfaces'

class Barbell {
  weight: number // will always be in kilograms
  attached_weights: Array<Plate>

  constructor(weight = 20, weight_type = WeightType.kgs) {
    if (weight_type === WeightType.lbs) {
      this.weight = weight / 2.205
    } else {
      this.weight = weight
    }
    this.attached_weights = []
  }

  add_kilogram_plate(weight: number): Plate {
    const added_kilogram_plate: Plate = new Plate(weight, WeightType.kgs)
    this.attached_weights.push(added_kilogram_plate)
    return added_kilogram_plate
  }

  add_pound_plate(weight: number): Plate {
    const added_pound_plate: Plate = new Plate(weight, WeightType.lbs)
    this.attached_weights.push(added_pound_plate)
    return added_pound_plate
  }

  remove_last_plate() {
    const removed_plate: Plate | undefined = this.attached_weights.pop()
    return removed_plate
  }

  remove_all_plates() {
    const current_attached_plates: Array<Plate> = this.attached_weights
    this.attached_weights = []
    return current_attached_plates
  }

  get_total_kilograms(): number {
    return (
      this.attached_weights.reduce((current_total, weight_node): number => {
        let current_weight: number = weight_node.weight
        if (weight_node.weight_type === WeightType.lbs) {
          current_weight /= 2.205
        }
        return current_total + current_weight
      }, 0) *
        2 +
      this.weight
    )
  }

  get_total_pounds(): number {
    return (
      this.attached_weights.reduce((current_total, weight_node): number => {
        let current_weight: number = weight_node.weight
        if (weight_node.weight_type === WeightType.kgs) {
          current_weight *= 2.205
        }
        return current_total + current_weight
      }, 0) *
        2 +
      this.weight * 2.205
    )
  }

  fill_with_kilogram_plates(
    weight: number,
    weight_type: WeightType = WeightType.kgs,
  ): Array<Plate> {
    let target_weight: number

    if (weight_type === WeightType.lbs) {
      target_weight = weight / 2.205
    } else {
      target_weight = weight
    }

    const target_attached_weights: Array<Plate> = []

    const kilogram_plates: Array<number> = [
      25, 20, 15, 10, 5, 2.5, 1.25, 0.5, 0.25,
    ]

    let current_weight: number = this.get_total_kilograms()
    let plate_index = 0

    while (plate_index < kilogram_plates.length) {
      const added_weight = current_weight + kilogram_plates[plate_index] * 2

      if (added_weight <= target_weight) {
        current_weight = added_weight
        target_attached_weights.push(
          new Plate(kilogram_plates[plate_index], WeightType.kgs),
        )
        this.attached_weights.push(
          new Plate(kilogram_plates[plate_index], WeightType.kgs),
        )
      } else {
        plate_index++
      }
    }

    return target_attached_weights
  }

  fill_with_pound_plates(
    weight: number,
    weight_type: WeightType = WeightType.kgs,
  ): Array<Plate> {
    let target_weight: number

    if (weight_type === WeightType.kgs) {
      target_weight = weight * 2.205
    } else {
      target_weight = weight
    }

    const target_attached_weights: Array<Plate> = []

    const pound_plates: Array<number> = [45, 35, 25, 10, 5, 2.5, 1.25]

    let current_weight: number = this.get_total_pounds()
    let plate_index = 0

    while (plate_index < pound_plates.length) {
      const added_weight = current_weight + pound_plates[plate_index] * 2

      if (added_weight <= target_weight) {
        current_weight = added_weight
        target_attached_weights.push(
          new Plate(pound_plates[plate_index], WeightType.lbs),
        )
        this.attached_weights.push(
          new Plate(pound_plates[plate_index], WeightType.lbs),
        )
      } else {
        plate_index++
      }
    }

    return target_attached_weights
  }
}

export { Barbell }
