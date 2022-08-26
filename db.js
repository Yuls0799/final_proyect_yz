const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(path.resolve('tareas.db'));

db.exec("CREATE TABLE IF NOT EXISTS Tareas (id uuid, titulo varchar(50))")

function query(sql, params) {
  return db.prepare(sql).all(params);
}

function run(sql, params) {
  return db.prepare(sql).run(params);
}

module.exports = {
  ...db,
  query,
  run,
}