const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'sistema_dumbo.db');

const db = new sqlite3.Database(dbPath);

// db.run('CREATE TABLE clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nombres TEXT, apellidos TEXT, numero_identificacion TEXT UNIQUE, correo_electronico TEXT UNIQUE, cantidad_puntos INTEGER)');

db.on('error', (error) => {
    console.error('Error al conectar con la base de datos: ', error.message);
});

db.on('open', () => {
    console.log('Conexion exitosa a la base de datos SQLite');
});

module.exports = db;