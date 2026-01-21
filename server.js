const express = require('express');
const bodyParser = require('body-parser');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

const app = express();
const port = 3000;

// إعداد قاعدة البيانات المحلية
const file = path.join(__dirname, 'database.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

// قراءة البيانات أو تهيئتها
db.read().then(() => {
    db.data = db.data || { users: [] };
});

// إعدادات Express
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // تقديم ملفات HTML/CSS/JS

// إضافة بيانات من الموقع
app.post('/add', async (req, res) => {
    const user = req.body; // { name, email }
    db.data.users.push(user);
    await db.write();
    res.send({ status: 'تم الحفظ', user });
});

// جلب البيانات
app.get('/users', async (req, res) => {
    await db.read();
    res.send(db.data.users);
});

// تشغيل السيرفر
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
