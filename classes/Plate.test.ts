import { Plate } from './Plate'
import { WeightType } from './ts_interfaces'

afterEach(() => {
  jest.clearAllMocks()
})

describe('Plate Class', () => {
  it('should insert the correct weight & weight type', () => {
    let plate = new Plate(45, WeightType.lbs)

    expect(plate.get_weight()).toBe(45)
    expect(plate.get_weight_type()).toBe('pounds')
    expect(typeof plate.get_image()).toBe('string')

    plate = new Plate(10, WeightType.kgs)
    expect(plate.get_weight()).toBe(10)
    expect(plate.get_weight_type()).toBe('kilograms')
    expect(typeof plate.get_image()).toBe('string')
  })

  it('should throw error if weight type does not exist when intializing plate', () => {
    expect(() => {
      new Plate(15, 'fake weight type' as never)
    }).toThrowErrorMatchingSnapshot()
  })

  it('should throw an error if plate number does not exist for kilograms', () => {
    expect(() => {
      new Plate(46, WeightType.kgs)
    }).toThrowErrorMatchingSnapshot()
  })

  it('should throw an error if plate number does not exist for pounds', () => {
    expect(() => {
      new Plate(46, WeightType.lbs)
    }).toThrowErrorMatchingSnapshot()
  })

  it('should throw an error if initializing plate with negative number', () => {
    expect(() => {
      new Plate(-1, WeightType.lbs)
    }).toThrowErrorMatchingSnapshot()

    expect(() => {
      new Plate(-1, WeightType.kgs)
    }).toThrowErrorMatchingSnapshot()
  })
})
