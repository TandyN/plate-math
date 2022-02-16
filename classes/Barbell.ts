import { Plate } from './Plate'
import { WeightType } from './ts_interfaces'

class Barbell {
  weight: number // will always be in kilograms
  attached_weights: Array<Plate>
  #multiplier: number

  constructor(weight = 20, weight_type = WeightType.kgs, multiplier = 2.205) {
    if (weight_type === WeightType.lbs) {
      this.weight = weight / multiplier
    } else {
      this.weight = weight
    }
    this.attached_weights = []
    this.#multiplier = multiplier
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

  get_total_weight(weight_type: WeightType = WeightType.kgs): number {
    const bar_weight =
      weight_type === WeightType.lbs
        ? this.weight * this.#multiplier
        : this.weight

    return (
      this.attached_weights.reduce((current_total, weight_node): number => {
        let current_weight: number = weight_node.weight
        if (
          weight_type === WeightType.lbs &&
          weight_node.weight_type !== weight_type
        ) {
          current_weight *= this.#multiplier
        } else if (
          weight_type === WeightType.kgs &&
          weight_node.weight_type !== weight_type
        ) {
          current_weight /= this.#multiplier
        }
        return current_total + current_weight
      }, 0) *
        2 +
      bar_weight
    )
  }

  fill_to_target(
    target_weight: number, // What they want the weight to be
    target_weight_type: WeightType = WeightType.kgs, // The weight type they specify
    target_plate_type: WeightType = WeightType.kgs, // The plate type they want to put on
  ): Array<Plate> {
    let use_plate_type: Array<[number, number]>
    let current_weight: number

    if (target_plate_type === WeightType.lbs) {
      use_plate_type = [
        [45, 45], // [Used for Plate Object, Used for calculation]
        [35, 35],
        [25, 25],
        [10, 10],
        [5, 5],
        [2.5, 2.5],
        [1.25, 1.25],
      ]
    } else {
      use_plate_type = [
        [25, 25],
        [20, 20],
        [15, 15],
        [10, 10],
        [5, 5],
        [2.5, 2.5],
        [1.25, 1.25],
        [0.5, 0.5],
        [0.25, 0.25],
      ]
    }

    if (target_weight_type === WeightType.lbs) {
      current_weight = this.get_total_weight(WeightType.lbs)
      if (target_weight_type !== target_plate_type) {
        use_plate_type = use_plate_type.map((plate_weight) => [
          plate_weight[0],
          plate_weight[0] * this.#multiplier,
        ])
      }
    } else {
      current_weight = this.get_total_weight(WeightType.kgs)
      if (target_weight_type !== target_plate_type) {
        use_plate_type = use_plate_type.map((plate_weight) => [
          plate_weight[0],
          plate_weight[0] / this.#multiplier,
        ])
      }
    }

    const target_attached_weights: Array<Plate> = []
    let plate_index = 0

    while (plate_index < use_plate_type.length) {
      const added_weight = current_weight + use_plate_type[plate_index][1] * 2

      if (added_weight <= target_weight) {
        current_weight = added_weight
        target_attached_weights.push(
          new Plate(use_plate_type[plate_index][0], target_plate_type),
        )
        this.attached_weights.push(
          new Plate(use_plate_type[plate_index][0], target_plate_type),
        )
      } else {
        plate_index++
      }
    }

    return target_attached_weights
  }
}

export { Barbell }
