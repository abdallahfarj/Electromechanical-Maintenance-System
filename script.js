const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// مسار ملف تخزين البيانات
const dbFile = path.join(__dirname, 'database.json');

// تهيئة الملف إذا لم يكن موجود
if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify({ users: [] }, null, 2));
}

// إعدادات Express
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // تقديم ملفات HTML/CSS/JS

// إضافة بيانات
app.post('/add', (req, res) => {
    const user = req.body; // { name, email }
    
    // قراءة البيانات الحالية
    const data = JSON.parse(fs.readFileSync(dbFile));
    data.users.push(user);

    // كتابة البيانات مرة أخرى
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));

    res.send({ status: 'تم الحفظ', user });
});

// جلب البيانات
app.get('/users', (req, res) => {
    const data = JSON.parse(fs.readFileSync(dbFile));
    res.send(data.users);
});

// تشغيل السيرفر
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
