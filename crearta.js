import Database from "better-sqlite3";

const usuarios = new Database("usuarios.db");
const votos = new Database("votos.db");
const tel = new Database("telefonos.db");

// Crear tabla de usuarios
usuarios.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT,
    points INTEGER DEFAULT 0,
    phone TEXT UNIQUE
  )
`).run();

// Crear tabla de votaciones
votos.prepare(`
  CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voter_id INTEGER,
    voted1_id INTEGER,
    voted2_id INTEGER,
    voted3_id INTEGER,
    voted4_id INTEGER,
    voted5_id INTEGER,
    voted6_id INTEGER,
    voted7_id INTEGER,
    voted8_id INTEGER,
    voted9_id INTEGER,
    voted10_id INTEGER
  )
`).run();

// Crear tabla de teléfonos
tel.prepare(`
  CREATE TABLE IF NOT EXISTS phones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone TEXT UNIQUE
  )
`).run();

console.log("Tablas creadas correctamente");