import Weight from './Weight'

class Barbell {
  barbell_weight: number
  weights: Array<Weight>

  constructor(barbell_weight = 20) {
    this.barbell_weight = barbell_weight
    this.weights = []
  }
}
