// Ölçeklenen malzeme miktarını okunabilir metne çevirir.
// En yakın çeyreğe yuvarlar; kesirleri ¼ ½ ¾ simgeleriyle gösterir.
export function formatMiktar(n) {
  const yuvarli = Math.round(n * 4) / 4

  if (Number.isInteger(yuvarli)) return String(yuvarli)

  const tam = Math.floor(yuvarli)
  const kesir = yuvarli - tam
  const simge = { 0.25: '¼', 0.5: '½', 0.75: '¾' }[kesir]

  if (simge) return tam ? `${tam} ${simge}` : simge

  // Çeyreğe oturmayan durumlarda iki ondalıkla göster.
  return String(Math.round(n * 100) / 100)
}
