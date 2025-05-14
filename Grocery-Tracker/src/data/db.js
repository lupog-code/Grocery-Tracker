import * as SQLite from 'expo-sqlite';


const db = await SQLite.openDatabaseAsync('grocery');


export  const  createTables = async ()=>{
    await db.execAsync(`

        CREATE TABLE IF NOT EXISTS lists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS categories (
    name TEXT PRIMARY KEY
    );

CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      category TEXT NOT NULL,
      inserted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      list_id INTEGER,
      FOREIGN KEY (list_id) REFERENCES lists(id),
      FOREIGN KEY (category) REFERENCES categories(name)
    );

        INSERT OR IGNORE INTO categories (name) VALUES
    ('Fruits'),
    ('Vegetables'),
    ('Dairy'),
    ('Meat'),
    ('Snacks'),
    ('Beverages'),
    ('Other');`
  );
}