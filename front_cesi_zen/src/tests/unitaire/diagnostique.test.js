/* eslint-env jest */
import { calculerScore } from 'src/utils/calculerScore'

describe('Fonction calculerScore', () => {
  it('renvoie 0 pour un tableau vide', () => {
    expect(calculerScore([])).toBe(0)
  })

  it('renvoie la somme des valeurs des événements', () => {
    const events = [
      { id: 1, label: 'Stress', value: 50 },
      { id: 2, label: 'Fatigue', value: 30 },
    ]
    expect(calculerScore(events)).toBe(80)
  })
})
