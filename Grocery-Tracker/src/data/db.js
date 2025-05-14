import * as SQLite from 'expo-sqlite';

let db;

export const initDatabase = async () => {
  try {
    db = await SQLite.openDatabaseAsync('grocery');
    console.log(db.databasePath);
  } catch (error) {
    console.error('Failed to open database:', error);
  }
};

export const createTables = async () => {
  try {
    if (!db) await initDatabase();

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
        ('Other');
    `);
  } catch (error) {
    console.error('Failed to create tables:', error);
  }
};

// Inserimento lista
export const inserisciLista = async (nomeLista) => {
  try {
    if (!db) await initDatabase();

    await db.execAsync(
      `INSERT INTO lists (name) VALUES (?);`,
      [nomeLista]
    );
  } catch (error) {
    console.error('Failed to insert list:', error);
  }
};

// Inerimento item
export const inserisciItem = async (nome, quantita, prezzo, categoria, idLista) => {
  try {
    if (!db) await initDatabase();

    await db.execAsync(
      `INSERT INTO items (name, quantity, price, category, list_id, inserted_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP);`,
      [nome, quantita, prezzo, categoria, idLista]
    );
  } catch (error) {
    console.error('Failed to insert item:', error);
  }
};

// Ottieni lista
export const getListe = async () => {
  try {
    if (!db) await initDatabase();

    const result = await db.execAsync(`SELECT * FROM lists;`);
    return result.rows._array;
  } catch (error) {
    console.error('Failed to fetch lists:', error);
  }
}

// Ottieni categorie
export const getCategorie = async () => {
  try {
    if (!db) await initDatabase();

    const result = await db.execAsync(`SELECT * FROM categories;`);
    return result.rows._array;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
}

// Filtro categorie
export const getFiltroCategorie = async (categoria) => {
  try {
    if (!db) await initDatabase();

    const result = await db.execAsync(`SELECT * FROM items WHERE category LIKE ?;`,
    [`%${categoria}%`]
    );

    return result.rows._array;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
}

// Ottieni item recenti
export const getItemsRecenti = async (time) => {
  try {
    if (!db) await initDatabase();

    const result = await db.execAsync(`SELECT * FROM items WHERE inserted_at >= ?;`,
    [time]
    );

    return result.rows._array;
  } catch (error) {
    console.error('Failed to fetch recent items:', error);
  }
}

// Rimuovi lista
export const rimuoviLista = async (idLista) => {
  try {
    if (!db) await initDatabase();

    await db.execAsync(
      `DELETE FROM lists WHERE id = ?;`,
      [idLista]
    );
  } catch (error) {
    console.error('Failed to delete list:', error);
  }
};

// Rimuovi item
export const rimuoviItem = async (idItem) => {
  try {
    if (!db) await initDatabase();

    await db.execAsync(
      `DELETE FROM items WHERE id = ?;`,
      [idItem]
    );
  } catch (error) {
    console.error('Failed to delete item:', error);
  }
};

// Rimuovi categoria
export const rimuoviCategoria = async (categoria) => {
  try {
    if (!db) await initDatabase();

    await db.execAsync(
      `DELETE FROM categories WHERE name = ?;`,
      [categoria]
    );
  } catch (error) {
    console.error('Failed to delete category:', error);
  }
};

// Modifica item
export const modificaItem = async (idItem, nome, quantita, prezzo, categoria) => {
  try {
    if (!db) await initDatabase();

    await db.execAsync(
      `UPDATE items SET name = ?, quantity = ?, price = ?, category = ? WHERE id = ?;`,
      [nome, quantita, prezzo, categoria, idItem]
    );
  } catch (error) {
    console.error('Failed to update item:', error);
  }
};

// Modifica lista
export const modificaLista = async (idLista, nome) => {
  try {
    if (!db) await initDatabase();

    await db.execAsync(
      `UPDATE lists SET name = ? WHERE id = ?;`,
      [nome, idLista]
    );
  } catch (error) {
    console.error('Failed to update list:', error);
  }
};