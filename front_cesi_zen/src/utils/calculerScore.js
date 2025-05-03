export function calculerScore(events) {
  return events.reduce((acc, event) => acc + (event.value || 0), 0)
}
