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

  remove_plate() {
    const removed_plate: Plate | undefined = this.attached_weights.pop()
    return removed_plate
  }

  get_total_kilograms(): number {
    return (
      this.attached_weights.reduce((current_total, weight_node) => {
        let current_weight = weight_node.weight
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
      this.attached_weights.reduce((current_total, weight_node) => {
        let current_weight = weight_node.weight
        if (weight_node.weight_type === WeightType.kgs) {
          current_weight *= 2.205
        }
        return current_total + current_weight
      }, 0) *
        2 +
      this.weight * 2.205
    )
  }
}

export { Barbell }
