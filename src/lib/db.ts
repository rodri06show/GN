import Database from "better-sqlite3";

const db = new Database("database.db");
const votos = new Database("votos.db");

// Crear tabla de usuarios
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT,
    points INTEGER DEFAULT 0,
    phone TEXT,
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
    voted5_id INTEGER
  )
`).run();

export { db };
export { votos };

export type User = {
  id: number;
  username: string;
  password: string;
  role: string;
  points: number;
  phone: string;
};
export type Vote = {
  id: number;
  voter_id: number;
  voted1_id: number;
  voted2_id: number;
  voted3_id: number;
  voted4_id: number;
  voted5_id: number;
};