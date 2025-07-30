// src/app/quarries/page.tsx
import { sql } from '@cloudflare/d1';

export default async function QuarriesPage() {
  const db = sql('DB'); // D1 binding name from wrangler.toml
  const results = await db`SELECT * FROM quarry_stones ORDER BY created_at DESC`;

  return (
    <main style={{ padding: '2rem' }}>
      <h1>🪨 Quarry Archive</h1>
      <ul>
        {results.map((stone: any) => (
          <li key={stone.id}>
            <strong>{stone.stone_name}</strong> from <em>{stone.origin}</em><br />
            Type: {stone.stone_type}, Standard: {stone.test_standard}
            <br />
            Providers: {stone.provider_1}, {stone.provider_2}, {stone.provider_3}
            <hr />
          </li>
        ))}
      </ul>
    </main>
  );
}
