import fetch from 'node-fetch'

export default async function fetchCurrentOrderTracking() {
  const res = await fetch('https://www.deckbutt.com/ordertracking.json')
  return await res.json()
}
