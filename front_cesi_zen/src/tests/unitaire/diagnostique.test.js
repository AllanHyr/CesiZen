/* eslint-env jest */
function calculerScore(events) {
  return events.reduce((acc, event) => acc + (event.value || 0), 0)
}

describe('Fonction calculerScore', () => {
  it('renvoie 0 pour un tableau vide', () => {
    expect(calculerScore([])).toBe(0)
  })

  it('renvoie la somme des valeurs des événements', () => {
    const events = [
      { label: 'Stress', value: 50 },
      { label: 'Fatigue', value: 30 },
    ]
    expect(calculerScore(events)).toBe(80)
  })
})
