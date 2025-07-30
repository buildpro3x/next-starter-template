CREATE TABLE quarry_stones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  origin TEXT,
  stone_name TEXT,
  stone_type TEXT,
  test_standard TEXT,
  provider_1 TEXT,
  provider_2 TEXT,
  provider_3 TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
