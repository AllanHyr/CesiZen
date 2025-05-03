import { getBreathingSet, getBreathingPhases } from 'src/utils/breathing'

describe('getBreathingSet', () => {
  it('renvoyer des valeurs correctes pour le préréglage 748', () => {
    const result = getBreathingSet('748')
    expect(result).toEqual({ inspiration: 7, apnee: 4, expiration: 8 })
  })

  it('Renvoyer des valeurs personnalisées', () => {
    const result = getBreathingSet('custom', { inspiration: 3, apnee: 2, expiration: 5 })
    expect(result).toEqual({ inspiration: 3, apnee: 2, expiration: 5 })
  })
})

describe('getBreathingPhases', () => {
  it('Renvoyer que des phases non nulles', () => {
    const set = { inspiration: 4, apnee: 0, expiration: 6 }
    const phases = getBreathingPhases(set)
    expect(phases).toEqual([
      { name: 'Inspirez', duration: 4 },
      { name: 'Expirez', duration: 6 },
    ])
  })
})
