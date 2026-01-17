import Database from "better-sqlite3";
import bcrypt from "bcrypt";

const db = new Database(":memory:");
console.log("Dependencias nativas funcionan!");
