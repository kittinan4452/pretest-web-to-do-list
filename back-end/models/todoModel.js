const mysql = require('mysql2/promise');

async function initializeDatabase() {
  try {
    // สร้าง Connection ชั่วคราวแบบไม่มี Database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'tii123456789@',
    });

    // สร้าง Database ถ้ายังไม่มี
    await connection.query('CREATE DATABASE IF NOT EXISTS todo_db');
    console.log('✅ Database todo_db is ready.');

    await connection.end(); // ปิด Connection

    // เชื่อมต่อ Database และสร้าง Pool
    const db = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'tii123456789@',
      database: 'todo_db',
    });

    // สร้างตาราง `todos` ถ้ายังไม่มี
    await db.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        text VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT 0
      )
    `);
    console.log('✅ Table todos is ready.');

    return db; // คืนค่าการเชื่อมต่อ Pool
  } catch (err) {
    console.error('❌ Error initializing database:', err);
    throw err; // เพิ่มการโยนข้อผิดพลาดหากเกิดปัญหา
  }
}

// ใช้ฟังก์ชัน initializeDatabase() และส่งออก Model
let dbPromise;
initializeDatabase().then((db) => {
  dbPromise = db; // เก็บ dbPool เมื่อการเชื่อมต่อเสร็จ
});

const TodoModel = {
  getAll: async () => {
    if (!dbPromise) throw new Error('Database not initialized');
    return (await dbPromise).query('SELECT * FROM todos');
  },
  getById: async (id) => {
    if (!dbPromise) throw new Error('Database not initialized');
    return (await dbPromise).query('SELECT * FROM todos WHERE id = ?', [id]);
  },
  create: async (text) => {
    if (!dbPromise) throw new Error('Database not initialized');
    return (await dbPromise).query('INSERT INTO todos (text, completed) VALUES (?, 0)', [text]);
  },
  update: async (id, text, completed) => {
    if (!dbPromise) throw new Error('Database not initialized');
    return (await dbPromise).query('UPDATE todos SET text = ?, completed = ? WHERE id = ?', [text, completed, id]);
  },
  delete: async (id) => {
    if (!dbPromise) throw new Error('Database not initialized');
    return (await dbPromise).query('DELETE FROM todos WHERE id = ?', [id]);
  },
};

module.exports = TodoModel;
