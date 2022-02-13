import { Barbell } from './Barbell'
import { WeightType } from './ts_interfaces'

describe('Barbell Class', () => {
  it('should convert all weight to kilograms if different weight type is specified', () => {
    const barbell = new Barbell(45, WeightType.lbs)
    expect(barbell.weight).toBe(45 / 2.205)
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
      barbell.add_pound_plate(10)

      expect(barbell.attached_weights.length).toBe(1)
      expect(barbell.attached_weights[0].weight).toBe(10)
      expect(barbell.attached_weights[0].weight_type).toBe('pounds')

      barbell.add_pound_plate(25)
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

  describe('remove_plate function', () => {
    it('should remove plate from attached_weights', () => {
      const barbell = new Barbell()
      barbell.add_pound_plate(10)
      barbell.add_pound_plate(10)
      expect(barbell.attached_weights.length).toBe(2)
      barbell.remove_plate()
      expect(barbell.attached_weights.length).toBe(1)
      barbell.remove_plate()
      expect(barbell.attached_weights.length).toBe(0)
    })
  })

  describe('get_total_kilograms function', () => {
    it('should calculate all plates attached to barbell in kilograms', () => {
      const barbell = new Barbell()
      barbell.add_pound_plate(10)
      barbell.add_kilogram_plate(10)
      barbell.add_pound_plate(10)
      barbell.add_kilogram_plate(10)
      barbell.add_pound_plate(5)

      const actual = Math.round(barbell.get_total_kilograms() * 100) / 100

      // add lb plates, multiple by 2 for both sides of the barbell, convert to kgs, add barbell weight, then add kg plates at the end for both sides
      const expected = (25 * 2) / 2.205 + 20 + 40

      expect(actual).toBe(Math.round(expected * 100) / 100)
    })
  })

  describe('get_total_pounds function', () => {
    it('should calculate all plates attached to barbell in pounds', () => {
      const barbell = new Barbell()
      barbell.add_kilogram_plate(10)
      barbell.add_pound_plate(10)
      barbell.add_kilogram_plate(10)
      barbell.add_pound_plate(10)
      barbell.add_kilogram_plate(5)

      const actual = Math.round(barbell.get_total_pounds() * 100) / 100

      // add kg plates, multiple by 2 for both sides of the barbell, convert to lbs, add barbell weight, then add pound lb at the end for both sides
      const expected = 25 * 2 * 2.205 + 20 * 2.205 + 40

      expect(actual).toBe(Math.round(expected * 100) / 100)
    })
  })
})
