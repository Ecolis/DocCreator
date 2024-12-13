const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const app = express();

// Подключение к базе данных
const db = mysql.createPool({
    host: '141.8.192.164',
    user: 'a0205555_doccreator',
    password: '4gGdlO4XTcDJ8uw5',
    database: 'a0205555_doccreator',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

app.use(bodyParser.json());

// Фетч данных из БД
app.get('/api/acts', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM acts'); // Замените "acts" на имя вашей таблицы
        res.json(rows); // Возвращаем данные в формате JSON
    } catch (err) {
        console.error('Ошибка при получении актов:', err);
        res.status(500).send('Ошибка сервера.');
    }
});

// Маршрут для регистрации
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send('Заполните все поля.');
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log('Хэшированный пароль:', hashedPassword);

        await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

        res.send('Регистрация успешна!');
    } catch (err) {
        console.error('Ошибка при регистрации:', err);
        res.status(500).send('Ошибка базы данных.');
    }
});

// Маршрут для входа
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log('Полученные данные:', { email, password });

    if (!email || !password) {
        console.error('Ошибка: Поля email или password не заполнены.');
        return res.status(400).send('Заполните все поля.');
    }

    try {
        const query = "SELECT * FROM `users` WHERE email = ?";
        console.log('Поиск пользователя с запросом:', query);

        // Выполняем запрос
        const [rows] = await db.query(query, [email]);
        console.log('Результат SQL-запроса:', rows);

        if (rows.length === 0) {
            console.error('Ошибка: Пользователь не найден.');
            return res.status(404).send('Пользователь не найден.');
        }

        const user = rows[0];
        console.log('Найден пользователь:', user);

        if (!user.password) {
            console.error('Ошибка: Пароль отсутствует в базе.');
            return res.status(500).send('Ошибка сервера.');
        }

        if (!email || !password) {
            console.error('Ошибка: Email или пароль не заданы');
            return res.status(400).send('Заполните все поля.');
        }
        
        console.log('Проверка пароля...');
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.error('Ошибка: Неверный пароль.');
            return res.status(401).send('Неверный пароль.');
        }

        console.log('Успешный вход для пользователя:', email);
        res.json({ name: user.name, email: user.email });
    } catch (err) {
        console.error('Ошибка сервера:', err);
        res.status(500).send('Ошибка сервера.');
    }
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
