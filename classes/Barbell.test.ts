import { Barbell } from './Barbell'
import { WeightType } from './ts_interfaces'

// kg to lbs multiplier
const multiplier = 2.205

describe('Barbell Class', () => {
  it('should convert all weight to kilograms if different weight type is specified', () => {
    const barbell = new Barbell(45, WeightType.lbs)
    expect(barbell.weight).toBe(45 / multiplier)
  })

  it('should assume barbell weight type is kilograms if weight type does not exist', () => {
    const barbell = new Barbell(33, 'fake weight type' as never)
    expect(barbell.weight).toBe(33)
  })

  it('should default barbell weight to 20', () => {
    const barbell = new Barbell()
    expect(barbell.weight).toBe(20)
  })

  describe('add_kilogram_plate function', () => {
    it('should add to attached_weights if weight number exists as a kilogram plate', () => {
      const barbell = new Barbell()
      barbell.add_kilogram_plate(10)

      expect(barbell.attached_weights.length).toBe(1)
      expect(barbell.attached_weights[0].weight).toBe(10)
      expect(barbell.attached_weights[0].weight_type).toBe('kilograms')

      barbell.add_kilogram_plate(15)
      expect(barbell.attached_weights.length).toBe(2)
      expect(barbell.attached_weights[1].weight).toBe(15)
      expect(barbell.attached_weights[1].weight_type).toBe('kilograms')
    })

    it('should throw an error if number does not exist', () => {
      const barbell = new Barbell()
      expect(() => {
        barbell.add_kilogram_plate(11)
      }).toThrowErrorMatchingSnapshot()
    })
  })

  describe('add_pound_plate function', () => {
    it('should add to attached_weights if weight number exists as a pound plate', () => {
      const barbell = new Barbell()

      const first_added_plate = barbell.add_pound_plate(10)
      expect(first_added_plate.weight).toBe(10)
      expect(barbell.attached_weights.length).toBe(1)
      expect(barbell.attached_weights[0].weight).toBe(10)
      expect(barbell.attached_weights[0].weight_type).toBe('pounds')

      const second_added_plate = barbell.add_pound_plate(25)
      expect(second_added_plate.weight).toBe(25)
      expect(barbell.attached_weights.length).toBe(2)
      expect(barbell.attached_weights[1].weight).toBe(25)
      expect(barbell.attached_weights[1].weight_type).toBe('pounds')
    })

    it('should throw an error if number does not exist', () => {
      const barbell = new Barbell()
      expect(() => {
        barbell.add_pound_plate(11)
      }).toThrowErrorMatchingSnapshot()
    })
  })

  describe('remove_last_plate function', () => {
    it('should remove plate from attached_weights', () => {
      const barbell = new Barbell()

      barbell.add_pound_plate(10)
      barbell.add_pound_plate(5)
      expect(barbell.attached_weights.length).toBe(2)

      const first_removed_plate = barbell.remove_last_plate()
      expect(first_removed_plate?.weight).toBe(5)
      expect(barbell.attached_weights.length).toBe(1)

      const second_removed_plate = barbell.remove_last_plate()
      expect(second_removed_plate?.weight).toBe(10)
      expect(barbell.attached_weights.length).toBe(0)
    })
  })

  describe('remove_all_plates function', () => {
    it('should remove all plates from attached_weights', () => {
      const barbell = new Barbell()

      barbell.add_pound_plate(10)
      barbell.add_pound_plate(10)
      expect(barbell.attached_weights.length).toBe(2)

      const removed_plates = barbell.remove_all_plates()
      expect(removed_plates.length).toBe(2)
      expect(barbell.attached_weights.length).toBe(0)
    })
  })

  describe('get_total_weight function', () => {
    it("should calculate all plates attached to barbell in pounds if 'pounds' is passed as argument", () => {
      const barbell = new Barbell()

      // just the bar
      expect(barbell.get_total_weight(WeightType.lbs)).toBe(20 * multiplier)

      barbell.add_kilogram_plate(10)
      barbell.add_pound_plate(10)
      barbell.add_kilogram_plate(10)
      barbell.add_pound_plate(10)
      barbell.add_kilogram_plate(5)

      const actual =
        Math.round(barbell.get_total_weight(WeightType.lbs) * 100) / 100

      // add kg plates, multiple by 2 for both sides of the barbell, convert to lbs, add barbell weight, then add pound lb at the end for both sides
      const expected = 25 * 2 * multiplier + 20 * multiplier + 40

      expect(actual).toBe(Math.round(expected * 100) / 100)
    })

    it("should calculate all plates attached to barbell in kilograms if 'kilograms' is passed as argument", () => {
      const barbell = new Barbell()

      // just the bar
      expect(barbell.get_total_weight(WeightType.kgs)).toBe(20)

      barbell.add_pound_plate(10)
      barbell.add_kilogram_plate(10)
      barbell.add_pound_plate(10)
      barbell.add_kilogram_plate(10)
      barbell.add_pound_plate(5)

      const actual =
        Math.round(barbell.get_total_weight(WeightType.kgs) * 100) / 100

      // add lb plates, multiple by 2 for both sides of the barbell, convert to kgs, add barbell weight, then add kg plates at the end for both sides
      const expected = (25 * 2) / multiplier + 20 + 40

      expect(actual).toBe(Math.round(expected * 100) / 100)
    })

    it("should assume weight type is kgs if 'pounds' is not the explicit weight type", () => {
      // bar defaults to 20kg
      const barbell = new Barbell()

      expect(barbell.get_total_weight(WeightType.kgs)).toBe(20)
      expect(barbell.get_total_weight('test' as never)).toBe(20)
    })
  })

  describe('fill_with_kilogram_plates function', () => {
    it('should fill the attached_weights as close to specified weight as possible with kg plates', () => {
      const barbell = new Barbell()

      barbell.add_kilogram_plate(25)

      const attached_weights = barbell.fill_with_kilogram_plates(170.6)

      expect(attached_weights.length).toBe(3)
      expect(attached_weights[0].weight).toBe(25)
      expect(attached_weights[1].weight).toBe(25)
      expect(attached_weights[2].weight).toBe(0.25)

      expect(barbell.attached_weights.length).toBe(4)
      expect(barbell.attached_weights[1].weight).toBe(25)
      expect(barbell.attached_weights[2].weight).toBe(25)
      expect(barbell.attached_weights[3].weight).toBe(0.25)

      expect(barbell.get_total_weight(WeightType.kgs)).toBe(170.5)
    })
  })

  describe('fill_with_pound_plates function', () => {
    it('should fill the attached_weights as close to specified weight as possible with lb plates', () => {
      const barbell = new Barbell(45, WeightType.lbs)

      barbell.add_pound_plate(45)

      const attached_weights = barbell.fill_with_pound_plates(
        318,
        WeightType.lbs,
      )

      expect(attached_weights.length).toBe(3)
      expect(attached_weights[0].weight).toBe(45)
      expect(attached_weights[1].weight).toBe(45)
      expect(attached_weights[2].weight).toBe(1.25)

      expect(barbell.attached_weights.length).toBe(4)
      expect(barbell.attached_weights[1].weight).toBe(45)
      expect(barbell.attached_weights[2].weight).toBe(45)
      expect(barbell.attached_weights[3].weight).toBe(1.25)

      expect(barbell.get_total_weight(WeightType.lbs)).toBe(317.5)
    })
  })
})
