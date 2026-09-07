// Yerel geliştirme sunucusu.
// Vercel'de bunun yerine api/index.js (serverless function) kullanılır.

import app from "./app.js";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`OcakBaşı API http://localhost:${PORT} adresinde dinliyor`);
});
