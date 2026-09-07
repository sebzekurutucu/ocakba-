// Backend API çağrıları.
// Adres dağıtımda VITE_API_URL ortam değişkeninden gelir; yerelde varsayılan.
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

export async function tarifleriGetir() {
  const yanit = await fetch(`${API_URL}/api/tarifler`)
  if (!yanit.ok) {
    throw new Error(`Sunucu ${yanit.status} döndü`)
  }
  return yanit.json()
}
