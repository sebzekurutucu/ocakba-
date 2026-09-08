// Backend API çağrıları.
// - Dağıtımda frontend ve backend aynı origin'de → görece yol (/api/tarifler).
// - Yerel geliştirmede backend ayrı portta → http://localhost:3001.
// - Gerekirse VITE_API_URL ortam değişkeniyle elle ezilebilir.
const API_URL =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? 'http://localhost:3001' : '')

export async function tarifleriGetir() {
  const yanit = await fetch(`${API_URL}/api/tarifler`)
  if (!yanit.ok) {
    throw new Error(`Sunucu ${yanit.status} döndü`)
  }
  return yanit.json()
}
