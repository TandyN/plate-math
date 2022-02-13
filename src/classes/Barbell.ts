import { Weight } from './Weight'
import { WeightType } from './ts_interfaces'

class Barbell {
  barbell_weight: number
  weights: Array<Weight>

  constructor(barbell_weight = 20, weight_type = WeightType.kgs) {
    if (weight_type === WeightType.lbs) {
      this.barbell_weight = barbell_weight / 2.205
    } else {
      this.barbell_weight = barbell_weight
    }
    this.weights = []
  }

  add_kilogram_plate(weight: number): Weight {
    const added_kilogram_plate: Weight = new Weight(weight, WeightType.kgs)
    this.weights.push(added_kilogram_plate)
    return added_kilogram_plate
  }

  add_pound_plate(weight: number): Weight {
    const added_pound_plate: Weight = new Weight(weight, WeightType.lbs)
    this.weights.push(added_pound_plate)
    return added_pound_plate
  }

  remove_plate() {
    const removed_plate: Weight | undefined = this.weights.pop()
    return removed_plate
  }

  get_total_pounds(): number {
    return (
      this.weights.reduce((current_total, weight_node) => {
        let current_weight = weight_node.weight
        if (weight_node.weight_type === WeightType.kgs) {
          current_weight *= 2.205
        }
        return current_total + current_weight
      }, 0) *
        2 +
      this.barbell_weight * 2.205
    )
  }

  get_total_kilograms(): number {
    return (
      this.weights.reduce((current_total, weight_node) => {
        let current_weight = weight_node.weight
        if (weight_node.weight_type === WeightType.lbs) {
          current_weight /= 2.205
        }
        return current_total + current_weight
      }, 0) *
        2 +
      this.barbell_weight
    )
  }
}

export { Barbell }
