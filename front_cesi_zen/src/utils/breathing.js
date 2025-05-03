export function getBreathingSet(preset, custom = {}) {
  switch (preset) {
    case '748':
      return { inspiration: 7, apnee: 4, expiration: 8 }
    case '55':
      return { inspiration: 5, apnee: 0, expiration: 5 }
    case '46':
      return { inspiration: 4, apnee: 0, expiration: 6 }
    case 'custom':
      return {
        inspiration: custom.inspiration || 0,
        apnee: custom.apnee || 0,
        expiration: custom.expiration || 0,
      }
    default:
      return { inspiration: 0, apnee: 0, expiration: 0 }
  }
}

export function getBreathingPhases(breathingSet) {
  return [
    { name: 'Inspirez', duration: breathingSet.inspiration },
    { name: 'Apnée', duration: breathingSet.apnee },
    { name: 'Expirez', duration: breathingSet.expiration },
  ].filter((p) => p.duration > 0)
}
