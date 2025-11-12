export async function fetchProducts() {
  return fetch("/api/products").then(res => res.json());
}
export async function fetchPOs() {
  return fetch("/api/pos").then(res => res.json());
}
export async function sendNotification(msg) {
  return fetch("/api/notify", {method:"POST",body:JSON.stringify({msg})});
}
// Add other API methods: POST /auth, GET /results, WebSocket connect, etc.
