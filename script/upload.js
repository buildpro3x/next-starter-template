import fetch from 'node-fetch';
import { Client } from 'pg'; // for D2

const imagePath = 'public/example.jpg'; // replace with actual path

async function uploadImage() {
  const imageBuffer = require('fs').readFileSync(imagePath);
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
    },
    body: imageBuffer,
  });

  const result = await response.json();
  const imageUrl = result.result.variants[0];

  const db = new Client({ connectionString: process.env.D2_DB_URL });
  await db.connect();
  await db.query('INSERT INTO photos (url, uploaded_at) VALUES ($1, NOW())', [imageUrl]);
  await db.end();

  console.log(`✅ Uploaded and stored: ${imageUrl}`);
}

uploadImage();
