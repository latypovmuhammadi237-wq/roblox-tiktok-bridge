const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let scores = {
    boys: 0,
    girls: 0
};

// 1. ЗАЩИТА: Блокируем запросы браузера на иконку
app.get('/favicon.ico', (req, res) => res.status(204).end());

// 2. СТРАНИЦА СЧЕТА: Сюда заходит твой скрипт из Roblox.
// Он просто читает текущие цифры 'boys' и 'girls'. При обновлении ничего не накручивается!
app.get('/scores', (req, res) => {
    res.json(scores);
});

// 3. ОБЫЧНЫЕ ТРИГГЕРЫ (+1 очко)
app.all('/add-point-trigger-boys-secret', (req, res) => {
    scores.boys++;
    res.json({ success: true, total: scores.boys });
});

app.all('/add-point-trigger-girls-secret', (req, res) => {
    scores.girls++;
    res.json({ success: true, total: scores.girls });
});

// 4. МЕГА ТРИГГЕРЫ (+20 очков за один раз)
app.all('/insta-boys-secret', (req, res) => {
    scores.boys += 20; // Сразу добавляем 20 очков мальчикам
    console.log(`🔥 Insta Boys! Добавлено +20 очков. Всего: ${scores.boys}`);
    res.json({ success: true, total: scores.boys });
});

app.all('/insta-girls-secret', (req, res) => {
    scores.girls += 20; // Сразу добавляем 20 очков девочкам
    console.log(`🔥 Insta Girls! Добавлено +20 очков. Всего: ${scores.girls}`);
    res.json({ success: true, total: scores.girls });
});

// 5. СБРОС СЧЕТА
app.all('/reset-scores-clear', (req, res) => {
    scores.boys = 0;
    scores.girls = 0;
    res.send('Счет сброшен на 0:0');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер успешно работает!`));
