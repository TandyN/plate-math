import { Barbell } from './Barbell'
import { WeightType } from './ts_interfaces'

// kg to lbs multiplier
const multiplier = 2.205

afterEach(() => {
  jest.clearAllMocks()
})

describe('Barbell Class', () => {
  describe('Getting/Setting Barbell Weight', () => {
    it('should output weight to kilograms if kilograms is specified', () => {
      let barbell = new Barbell(45, WeightType.kgs)
      expect(barbell.get_weight()).toBe(45)

      barbell = new Barbell(0, WeightType.kgs)
      expect(barbell.get_weight()).toBe(0)

      barbell = new Barbell(59.2, WeightType.kgs)
      expect(barbell.get_weight()).toBe(59.2)
    })

    it('should convert barbell weight to kilograms if weight type pounds is specified', () => {
      let barbell = new Barbell(45, WeightType.lbs)
      expect(barbell.get_weight()).toBe(45 / multiplier)

      barbell = new Barbell(0, WeightType.lbs)
      expect(barbell.get_weight()).toBe(0)

      barbell = new Barbell(59.2, WeightType.lbs)
      expect(barbell.get_weight()).toBe(59.2 / multiplier)
    })

    it('should log a warning and assume barbell weight type is kilograms if weight type does not exist', () => {
      const console_warn_spy = jest.spyOn(console, 'warn')

      let barbell = new Barbell(33, 'fake weight type' as never)
      expect(barbell.get_weight()).toBe(33)

      barbell = new Barbell(0, 'fake weight type' as never)
      expect(barbell.get_weight()).toBe(0)

      barbell = new Barbell(59.2, 'fake weight type' as never)
      expect(barbell.get_weight()).toBe(59.2)

      expect(console_warn_spy.mock.calls).toMatchSnapshot()
    })

    it('should default barbell weight to 20 kilograms if no arguments', () => {
      const barbell = new Barbell()
      expect(barbell.get_weight()).toBe(20)
    })

    it('should set barbell weight to specified weight', () => {
      const barbell = new Barbell()
      barbell.set_weight(25, WeightType.kgs)
      expect(barbell.get_weight()).toBe(25)

      barbell.set_weight(45, WeightType.lbs)
      expect(barbell.get_weight()).toBe(45 / multiplier)
    })

    it('should set assume weight type of kilograms if no weight type specified', () => {
      const barbell = new Barbell(21)
      expect(barbell.get_weight()).toBe(21)
      barbell.set_weight(31, WeightType.kgs)
      expect(barbell.get_weight()).toBe(31)
    })

    it('should log a warning and set assume weight type of kilograms if specified weight type doesn not exist', () => {
      const console_warn_spy = jest.spyOn(console, 'warn')

      const barbell = new Barbell(21)
      expect(barbell.get_weight()).toBe(21)

      barbell.set_weight(31, 'fake weight type' as never)
      expect(barbell.get_weight()).toBe(31)

      expect(console_warn_spy.mock.calls).toMatchSnapshot()
    })

    it('should throw an error if user tries to make the barbell weight negative by initalizing or setting', () => {
      expect(() => {
        new Barbell(-20)
      }).toThrowErrorMatchingSnapshot()

      expect(() => {
        new Barbell(-20, WeightType.lbs)
      }).toThrowErrorMatchingSnapshot()

      const barbell = new Barbell()

      expect(() => {
        barbell.set_weight(-50, WeightType.kgs)
      }).toThrowErrorMatchingSnapshot()
    })
  })

  describe('Getting/Setting Attached Plates', () => {
    describe('add_plate function', () => {
      it('should add to attached_plates if weight number exists as a kilogram plate', () => {
        const barbell = new Barbell()
        barbell.add_plate(10, WeightType.kgs)

        expect(barbell.get_attached_plates().length).toBe(1)
        expect(barbell.get_attached_plates()[0].get_weight()).toBe(10)
        expect(barbell.get_attached_plates()[0].get_weight_type()).toBe(
          'kilograms',
        )

        barbell.add_plate(15, WeightType.kgs)
        expect(barbell.get_attached_plates().length).toBe(2)
        expect(barbell.get_attached_plates()[1].get_weight()).toBe(15)
        expect(barbell.get_attached_plates()[1].get_weight_type()).toBe(
          'kilograms',
        )
      })

      it('should add to attached_plates if weight number exists as a pound plate', () => {
        const barbell = new Barbell()

        barbell.add_plate(10, WeightType.lbs)
        expect(barbell.get_attached_plates().length).toBe(1)
        expect(barbell.get_attached_plates()[0].get_weight()).toBe(10)
        expect(barbell.get_attached_plates()[0].get_weight_type()).toBe(
          'pounds',
        )

        barbell.add_plate(25, WeightType.lbs)
        expect(barbell.get_attached_plates().length).toBe(2)
        expect(barbell.get_attached_plates()[1].get_weight()).toBe(25)
        expect(barbell.get_attached_plates()[1].get_weight_type()).toBe(
          'pounds',
        )
      })
    })

    describe('remove_last_plate function', () => {
      it('should remove plate from attached_plates', () => {
        const barbell = new Barbell()

        barbell.add_plate(10, WeightType.lbs)
        barbell.add_plate(5, WeightType.lbs)
        expect(barbell.get_attached_plates().length).toBe(2)

        const first_removed_plate = barbell.remove_last_plate()
        expect(first_removed_plate?.get_weight()).toBe(5)
        expect(barbell.get_attached_plates().length).toBe(1)

        const second_removed_plate = barbell.remove_last_plate()
        expect(second_removed_plate?.get_weight()).toBe(10)
        expect(barbell.get_attached_plates().length).toBe(0)
      })

      it('should return undefined if there are no plates to remove', () => {
        const barbell = new Barbell()
        expect(barbell.get_attached_plates().length).toBe(0)

        const removed_plate = barbell.remove_last_plate()
        expect(removed_plate).toBeUndefined()
        expect(barbell.get_attached_plates().length).toBe(0)
      })
    })

    describe('remove_all_plates function', () => {
      it('should remove all plates from attached_plates', () => {
        const barbell = new Barbell()

        barbell.add_plate(10, WeightType.lbs)
        barbell.add_plate(10, WeightType.lbs)
        expect(barbell.get_attached_plates().length).toBe(2)

        let removed_plates = barbell.remove_all_plates()
        expect(removed_plates.length).toBe(2)
        expect(barbell.get_attached_plates().length).toBe(0)

        removed_plates = barbell.remove_all_plates()
        expect(removed_plates.length).toBe(0)
        expect(barbell.get_attached_plates().length).toBe(0)
      })
    })
  })

  describe('get_total_weight function', () => {
    it("should calculate all plates attached to barbell in pounds if 'pounds' is passed as argument", () => {
      const barbell = new Barbell()

      // just the bar
      expect(barbell.get_total_weight(WeightType.lbs)).toBe(20 * multiplier)

      barbell.add_plate(10, WeightType.kgs)
      barbell.add_plate(10, WeightType.lbs)
      barbell.add_plate(10, WeightType.kgs)
      barbell.add_plate(10, WeightType.lbs)
      barbell.add_plate(5, WeightType.kgs)

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

      barbell.add_plate(10, WeightType.lbs)
      barbell.add_plate(10, WeightType.kgs)
      barbell.add_plate(10, WeightType.lbs)
      barbell.add_plate(10, WeightType.kgs)
      barbell.add_plate(5, WeightType.lbs)

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

  describe('fill_to_target function', () => {
    it('should fill the attached_plates as close to specified weight as possible with lb plates', () => {
      const barbell = new Barbell(45, WeightType.lbs)

      barbell.add_plate(45, WeightType.lbs)

      const attached_plates = barbell.fill_to_target(
        318,
        WeightType.lbs,
        WeightType.lbs,
      )

      expect(attached_plates.length).toBe(3)
      expect(attached_plates[0].get_weight()).toBe(45)
      expect(attached_plates[1].get_weight()).toBe(45)
      expect(attached_plates[2].get_weight()).toBe(1.25)

      expect(barbell.get_attached_plates().length).toBe(4)
      expect(barbell.get_attached_plates()[1].get_weight()).toBe(45)
      expect(barbell.get_attached_plates()[2].get_weight()).toBe(45)
      expect(barbell.get_attached_plates()[3].get_weight()).toBe(1.25)

      expect(barbell.get_total_weight(WeightType.lbs)).toBe(317.5)
    })

    it('should fill the attached_plates as close to specified weight as possible with kg plates', () => {
      const barbell = new Barbell()

      barbell.add_plate(25, WeightType.kgs)

      const attached_plates = barbell.fill_to_target(
        170.6,
        WeightType.kgs,
        WeightType.kgs,
      )

      expect(attached_plates.length).toBe(3)
      expect(attached_plates[0].get_weight()).toBe(25)
      expect(attached_plates[1].get_weight()).toBe(25)
      expect(attached_plates[2].get_weight()).toBe(0.25)

      expect(barbell.get_attached_plates().length).toBe(4)
      expect(barbell.get_attached_plates()[1].get_weight()).toBe(25)
      expect(barbell.get_attached_plates()[2].get_weight()).toBe(25)
      expect(barbell.get_attached_plates()[3].get_weight()).toBe(0.25)

      expect(barbell.get_total_weight(WeightType.kgs)).toBe(170.5)
    })

    it('should fill the attached_plates as close to specified weight as possible with kg plates given the target weight in lbs', () => {
      const barbell = new Barbell()

      barbell.add_plate(25, WeightType.kgs)

      const attached_plates = barbell.fill_to_target(
        376.1,
        WeightType.lbs,
        WeightType.kgs,
      )

      expect(attached_plates.length).toBe(3)
      expect(attached_plates[0].get_weight()).toBe(25)
      expect(attached_plates[1].get_weight()).toBe(25)
      expect(attached_plates[2].get_weight()).toBe(0.25)

      expect(barbell.get_attached_plates().length).toBe(4)
      expect(barbell.get_attached_plates()[1].get_weight()).toBe(25)
      expect(barbell.get_attached_plates()[2].get_weight()).toBe(25)
      expect(barbell.get_attached_plates()[3].get_weight()).toBe(0.25)

      expect(barbell.get_total_weight(WeightType.kgs)).toBe(170.5)
    })

    it('should fill the attached_plates as close to specified weight as possible with lb plates given the target weight in kgs', () => {
      const barbell = new Barbell(45, WeightType.lbs)

      barbell.add_plate(45, WeightType.lbs)

      const attached_plates = barbell.fill_to_target(
        144.2,
        WeightType.kgs,
        WeightType.lbs,
      )

      expect(attached_plates.length).toBe(3)
      expect(attached_plates[0].get_weight()).toBe(45)
      expect(attached_plates[1].get_weight()).toBe(45)
      expect(attached_plates[2].get_weight()).toBe(1.25)

      expect(barbell.get_attached_plates().length).toBe(4)
      expect(barbell.get_attached_plates()[1].get_weight()).toBe(45)
      expect(barbell.get_attached_plates()[2].get_weight()).toBe(45)
      expect(barbell.get_attached_plates()[3].get_weight()).toBe(1.25)

      expect(barbell.get_total_weight(WeightType.lbs)).toBe(317.5)
    })
  })
})
