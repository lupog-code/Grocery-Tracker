import SQLite from 'react-native-sqlite-storage';


// Abilita il debug se vuoi vedere log
SQLite.DEBUG(true);
SQLite.enablePromise(true);

// Apri il database
const getDBConnection = async () => {
  try {
    const db = await SQLite.openDatabase({
      name: 'grocery.db',
      location: 'default',
    });
    return db;
  } catch (error) {
    console.error('Errore apertura DB:', error);
    throw Error('Failed to open database');
  }
};

// Crea la tabella se non esiste
export const createTable = async () => {
  const db = await getDBConnection();
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL
    );
  `);
  console.log('Database path:', db.databasePath);

  console.log('✅ Tabella "items" creata o già esistente'); //Debug 
};

// Inserisci un nuovo elemento
export const insertItem = async (name, quantity) => {
  const db = await getDBConnection();
  await db.executeSql(
    `INSERT INTO items (name, quantity) VALUES (?, ?);`,
    [name, quantity]
  );
};

// Recupera tutti gli elementi
export const getItems = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT * FROM items;`);
  const items = [];

  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      items.push(result.rows.item(i));
    }
  });

  return items;
};