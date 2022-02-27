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

  it('should log a warning and assume weight type of kilograms if weight type does not exist', () => {
    const console_warn_spy = jest.spyOn(console, 'warn')

    const plate = new Plate(15, 'fake weight type' as never)
    expect(plate.get_weight()).toBe(15)
    expect(plate.get_weight_type()).toBe('kilograms')

    expect(console_warn_spy.mock.calls).toMatchSnapshot()
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
