import { Plate } from './Plate'
import { WeightType } from './ts_interfaces'

describe('Plate Class', () => {
  it('should throw an error if plate number does not exist', () => {
    expect(() => {
      new Plate(45, WeightType.kgs)
    }).toThrowErrorMatchingSnapshot()
  })

  it('should throw an error if plate type does not exist', () => {
    expect(() => {
      new Plate(45, 'pound' as never)
    }).toThrowErrorMatchingSnapshot()
  })

  it('should insert the correct weight & weight type', () => {
    const weight = new Plate(45, WeightType.lbs)

    expect(weight.weight).toBe(45)
    expect(weight.weight_type).toBe('pounds')
    expect(typeof weight.plate_image).toBe('string')
  })
})
