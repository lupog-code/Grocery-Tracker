import * as SQLite from 'expo-sqlite';
import {ModifiableCategory} from "../components/listObj";

const db = SQLite.openDatabaseSync('grocery');


const enableForeignKeys = async () => {
  try {
    await db.execAsync('PRAGMA foreign_keys = ON;');
    console.log('Foreign keys enabled');
  } catch (error) {
    console.error('Error enabling foreign keys:', error);
  }
};

export const createTables = async () => {
  try {
    await enableForeignKeys();
    // Create tables if they don't exist
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
        data_compera TIMESTAMP DEFAULT null,
        FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE,
        FOREIGN KEY (category) REFERENCES categories(name) ON DELETE CASCADE
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
    const result = await db.getAllAsync(`SELECT * FROM lists order by id desc;`);
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

// Ottieni categorie
export const getFixedCategorie = async () => {
  try {
    const result = await db.getAllAsync(`
      SELECT *
      FROM categories
      WHERE name IN ('Fruits', 'Dairy', 'Meat', 'Snacks', 'Vegetables', 'Beverages', 'Other');
    `);
    return result
  } catch (error) {
    console.error('Errore nel recupero delle categorie', error);
  }
};


// Ottieni categorie
export const getModifiableCategorie = async () => {
  try {
    const result = await db.getAllAsync(`
      SELECT *
      FROM categories
      WHERE name NOT IN ('Fruits', 'Dairy', 'Meat', 'Snacks', 'Vegetables', 'Beverages', 'Other');
    `);
    return result
  } catch (error) {
    console.error('Errore nel recupero delle categorie', error);
  }
};

// Filtro categorie
export const getFiltroCategorie = async (categoria) => {
  try {
    const result = await db.getAllAsync(`SELECT * FROM items WHERE category =  ?;`, [categoria]);
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

// Ottieni items recenti acquistati
export const getItemsRecentiAcquistati = async (time) => {
  try {
    const result = await db.getAllAsync(`SELECT * FROM items WHERE data_compera >= ? AND comprato = true;`, [time]);
    return result;
  } catch (error) {
    console.error('Errore nel recupero degli item recenti acquistati', error);
  }
}

// Costi mensili
export const getCostiMensili = async () => {
  try {
    const result = await db.getAllAsync(`
      SELECT strftime('%Y-%m', data_compera) as mese, SUM(price * quantity) as totale
      FROM items
      WHERE data_compera > date('now', '-6 months') AND comprato = true
      GROUP BY mese
      ORDER BY mese DESC;
    `);
    return result;
  } catch (error) {
    console.error('Errore nel recupero dei costi mensili', error);
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
export const rimuoviCategoria = async (categoria) => {
  try {
    await enableForeignKeys
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

// Ottieni gli item comprati per data e categoria
export  const getItemsCompratiPerDataECategoria = async (startDate: string) => {
  try {
    const result = await db.getAllAsync<CategoryCount>(`
      SELECT category, COUNT(*) as count
      FROM items
      WHERE data_compera > ? AND comprato = true
      GROUP BY category;
    `, [startDate]);
    console.log('Items comprati per data e categoria:', result);
    return result;
  } catch (error) {
    console.error('Error fetching purchased items by date and category:', error);
    return [];
  }
}

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



//Ottieni gli item di una determinata lista 
export const getItemsByListId = async (listId) => {
  try {
    const result = await db.getAllAsync(`
      SELECT * FROM items
      WHERE list_id = ?;
    `, [listId]);
    return result;
  } catch (error) {
    console.error('Error fetching items by list ID:', error);
  }
};

// Ottieni item comprati di una lista
export const getItemsCompratiByListId = async (listId) => {
  try {
    const result = await db.getAllAsync(`
      SELECT * FROM items
      WHERE list_id = ? AND comprato = true;
    `, [listId]);
    return result;
  } catch (error) {
    console.error('Error fetching purchased items by list ID:', error);
  }
}

// Spesa totale
interface TotalSpendingResult {
  total_spending: number | null;
}

export const getSpesaTotale = async (startDate: string) => {
  try {
    const result = await db.getAllAsync<TotalSpendingResult>(`
      SELECT SUM(price * quantity) as total_spending
      FROM items
      WHERE data_compera > ? AND comprato = true;`, [startDate]);
    return result[0]?.total_spending ?? 0;
  } catch (error) {
    console.error('Error fetching total spending:', error);
    return null;
  }
};

export const DropTabelle = async () => {
  try {
    await db.runAsync(`
      DROP TABLE IF EXISTS items;
      DROP TABLE IF EXISTS lists;
      DROP TABLE IF EXISTS categories;
    `);
    console.log('Tabelle eliminate con successo');
  } catch (error) {
    console.error('Errore nell\'eliminazione delle tabelle', error);
  }
}


export const buyItem = async (idItem) => {
  try {
    await db.runAsync(
      `UPDATE items SET comprato = true, data_compera = CURRENT_TIMESTAMP WHERE id = ?;`,
      [idItem]
    );
    console.log('Item comprato con successo');
  } catch (error) {
    console.error('Errore nell\'acquisto dell\'item', error);
  }
}  

export const addCategory = async (category) => {
  try {
    await db.runAsync(
      `INSERT INTO categories (name) VALUES (?);`,
      [category]
    );
    console.log('Categoria aggiunta con successo');
  } catch (error) {
    console.error('Errore nell\'aggiunta della categoria', error);
  }
}

// Rimuovi item comprato 
export const rimuoviItemComprato = async (idItem) => {
  try {
    await db.runAsync(`UPDATE items SET comprato = false, data_compera = null WHERE id = ?;`, [idItem]);
    console.log('Item rimosso con successo');
  } catch (error) {
    console.error('Errore nella rimozione dell\'item', error);
  }
};


//
interface SumResult {
  total_spent: number;
  sum: number;
}

export const getCostoTotalePerLista = async(idLista)=>{
  try{
    //Trovo la somma totale del costo per quella lista
      const result = await db.getAllAsync<SumResult>(`select sum(price * quantity) as sum from items where comprato = true group by list_id having list_id = ?`,[idLista])
      return result[0]?.sum || 0; 
  }catch(error){
    console.error("Errore "); 
  }
}


export const getItemsCompratiPerCategoria = async (categoria) => {
  try {
    const result = await db.getAllAsync(`
      SELECT * FROM items
      WHERE comprato = true AND category = ?;
    `, [categoria]);
    return result;
  } catch (error) {
    console.error('Error fetching purchased items by category:', error);
  }
}



export const getTotalSpentForCategory = async (category) => {
  try {
    const result = await db.getAllAsync<SumResult>(`
      SELECT SUM(price * quantity) as total_spent
      FROM items
      WHERE  comprato = true
      group by category
      HAVING category = ?;
    `, [category]);
    return result[0]?.total_spent ?? 0;
  } catch (error) {
    console.error('Error fetching total spent for category:', error);
    return null;
  }
}