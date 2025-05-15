import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('grocery');

export const createTables = async () => {
  try {
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
        comprato boolean DEFAULT false,
        data_compera date DEFAULT null,
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
    console.log(db.databasePath);
  } catch (error) {
    console.error('Failed to create tables:', error);
  }
};

// Inserimento lista
export const inserisciLista = async (nomeLista) => {
  try {
    await db.runAsync(
      `INSERT INTO lists (name) VALUES (?);`,
      [nomeLista]
    );
    
  } catch (error) {
    console.error('Errore durante l\'inserimento della lista', error);
  }
};

// Inerimento item
export const inserisciItem = async (nome, quantita, prezzo, categoria, idLista) => {
  try {
    await db.runAsync(
      `INSERT INTO items (name, quantity, price, category, list_id, inserted_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP);`,
      [nome, quantita, prezzo, categoria, idLista]
    );

  } catch (error) {
    console.error('Errore durante l\'inserimento dell\'item', error);
  }
};

// Ottieni lista
export const getListe = async () => {
  try {
    const result = await db.getAllAsync(`SELECT * FROM lists;`);
    return result
  } catch (error) {
    console.error('Errore nel recupero delle liste', error);
  }
};

// Ottieni categorie
export const getCategorie = async () => {
  try {
    const result = await db.getAllAsync(`SELECT * FROM categories;`);
    return result
  } catch (error) {
    console.error('Errore nel recupero delle categorie', error);
  }
};

// Filtro categorie
export const getFiltroCategorie = async (categoria) => {
  try {
    const result = await db.getAllAsync(`SELECT * FROM items WHERE category LIKE ?;`, [`%${categoria}%`]);
    return result
  } catch (error) {
    console.error('Errore nel filtro per categorie', error);
  }
};

// Ottieni item recenti
export const getItemsRecenti = async (time) => {
  try {
    const result = await db.getAllAsync(`SELECT * FROM items WHERE inserted_at >= ?;`, [time]);
    return result;
  } catch (error) {
    console.error('Errore nel recupero degli item recenti', error);
  }
};

// Rimuovi lista
export const rimuoviLista = async (idLista) => {
  try {
    await db.runAsync(`DELETE FROM lists WHERE id = ?;`, [idLista]);
   
  } catch (error) {
    console.error('Errore nella rimozione della lista', error);
  }
};
// Rimuovi item
export const rimuoviItem = async (idItem) => {
  try {
    await db.runAsync(`DELETE FROM items WHERE id = ?;`, [idItem]);
  
  } catch (error) {
    console.error('Errore nella rimozione dell\'item', error);
  }
};

// Rimuovi categoria
export const rimuoviCategoria = async (categoria: string) => {
  try {
    await db.runAsync(`DELETE FROM categories WHERE name = ?;`, [categoria]);

  } catch (error) {
    console.error('Errore nella rimozione della categoria', error);
  }
};

// Modifica item
export const modificaItem = async (idItem, nome, quantita, prezzo, categoria) => {
  try {
    await db.runAsync(
      `UPDATE items SET name = ?, quantity = ?, price = ?, category = ? WHERE id = ?;`,
      [nome, quantita, prezzo, categoria, idItem]
    );
    console.log('Item modificato con successo');
  } catch (error) {
    console.error('Errore nella modifica dell\'item', error);
  }
};

// Modifica lista
export const modificaLista = async (idLista, nome) => {
  try {
    await db.runAsync(`UPDATE lists SET name = ? WHERE id = ?;`, [nome, idLista]);
   
  } catch (error) {
    console.error('Errore nella modifica della lista', error);
  }
};

//Ottieni il numero di item per categoria 
interface CategoryCount {
  category: string;
  count: number;
}

export const getNumeroItemPerCategoria = async () => {
  try {
    const allRows = await db.getAllAsync<CategoryCount>(`
      SELECT category, COUNT(*) as count
      FROM items
      GROUP BY category;
    `);

    return allRows;
  } catch (error) {
    console.error('Errore nel recupero del numero di item per categoria', error);
    return [];
  }
};

// Ottieni tutti gli item
export const getAllItems = async () => {
  try {
    const result = await db.getAllAsync(`
      SELECT * FROM items;
    `);
    return result;
  } catch (error) {
    console.error('Error fetching all items:', error);
  }
}




// Ottieni le ultime due liste create 
export const getUltimeDueListe = async () => {
  try {
    const result = await db.getAllAsync(`
      SELECT * FROM lists
      ORDER BY id DESC
      LIMIT 2;
    `);
    return result;
  } catch (error) {
    console.error('Error fetching the last two lists:', error);
  }
};



//Ottieni gli ultimi 10 item comprati 
export const getUltimiDieciItemComprati = async () => {
  try {
    const result = await db.getAllAsync(`
      SELECT * FROM items
      WHERE comprato = true AND data_compera IS NOT NULL
      ORDER BY data_compera DESC
      LIMIT 10;
    `);
    return result;
  } catch (error) {
    console.error('Error fetching the last ten purchased items:', error);
  }
};