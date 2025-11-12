export async function getLivePrices() {
  return fetch('/api/priceFeed/live').then(res => res.json());
}
