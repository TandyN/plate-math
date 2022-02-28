import { Plate } from './Plate'
import { WeightType } from './ts_interfaces'

class Barbell {
  #multiplier: number
  #weight: number // will always be in kilograms
  #attached_plates: Array<Plate>

  constructor(weight = 20, weight_type: WeightType = WeightType.kgs) {
    this.#multiplier = 2.205 // kg --> lbs
    this.#weight = weight
    this.set_weight(weight, weight_type)
    this.#attached_plates = []
  }

  get_weight(): number {
    return this.#weight
  }

  set_weight(weight: number, weight_type: WeightType): void {
    if (weight < 0) {
      throw new Error('barbell weight can not be negative')
    }

    if (!Object.values(WeightType).includes(weight_type)) {
      throw new Error(`weight type '${weight_type}' does not exist for barbell`)
    }

    if (weight_type === WeightType.lbs) {
      this.#weight = weight / this.#multiplier
    } else {
      this.#weight = weight
    }
  }

  get_attached_plates(): Array<Plate> {
    return this.#attached_plates
  }

  add_plate(weight: number, weight_type: WeightType): void {
    this.#attached_plates.push(new Plate(weight, weight_type))
  }

  remove_last_plate(): Plate | undefined {
    return this.#attached_plates.pop()
  }

  remove_all_plates(): Array<Plate> {
    const removed_plates: Array<Plate> = this.#attached_plates
    this.#attached_plates = []
    return removed_plates
  }

  get_total_weight(weight_type: WeightType): number {
    if (!Object.values(WeightType).includes(weight_type)) {
      throw new Error(
        `weight type '${weight_type}' does not exist to get total weight`,
      )
    }

    const bar_weight =
      weight_type === WeightType.lbs
        ? this.#weight * this.#multiplier
        : this.#weight

    return (
      this.#attached_plates.reduce((current_total, plate: Plate): number => {
        let current_weight: number = plate.get_weight()
        if (
          weight_type === WeightType.lbs &&
          plate.get_weight_type() !== weight_type
        ) {
          current_weight *= this.#multiplier
        } else if (
          weight_type === WeightType.kgs &&
          plate.get_weight_type() !== weight_type
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
    target_weight: number, // what they want the weight to be
    target_weight_type: WeightType, // the weight type for the target weight
    target_plate_type: WeightType, // the plate type they want to put on to fill to the target weight
  ): Array<Plate> {
    if (!Object.values(WeightType).includes(target_weight_type)) {
      throw new Error(
        `target weight type '${target_weight_type}' does not exist to fill weights`,
      )
    } else if (!Object.values(WeightType).includes(target_plate_type)) {
      throw new Error(
        `target plate type '${target_plate_type}' does not exist to fill weights`,
      )
    }

    let used_plate_map: Array<[number, number]> // [ plate type number for mapping, weight for calculation ]
    let current_weight: number

    if (target_plate_type === WeightType.lbs) {
      used_plate_map = [
        [45, 45],
        [35, 35],
        [25, 25],
        [10, 10],
        [5, 5],
        [2.5, 2.5],
        [1.25, 1.25],
      ]
    } else {
      used_plate_map = [
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
        // convert second index for calculating purposes
        used_plate_map = used_plate_map.map((plate_weight) => [
          plate_weight[0],
          plate_weight[0] * this.#multiplier,
        ])
      }
    } else {
      current_weight = this.get_total_weight(WeightType.kgs)
      if (target_weight_type !== target_plate_type) {
        used_plate_map = used_plate_map.map((plate_weight) => [
          plate_weight[0],
          plate_weight[0] / this.#multiplier,
        ])
      }
    }

    const plates_attached: Array<Plate> = []
    let plate_index = 0

    // fill bar with plates until right before target
    while (plate_index < used_plate_map.length) {
      const added_weight = current_weight + used_plate_map[plate_index][1] * 2

      if (added_weight <= target_weight) {
        current_weight = added_weight
        plates_attached.push(
          new Plate(used_plate_map[plate_index][0], target_plate_type),
        )
        this.#attached_plates.push(
          new Plate(used_plate_map[plate_index][0], target_plate_type),
        )
      } else {
        plate_index++
      }
    }

    return plates_attached
  }
}

export { Barbell }
