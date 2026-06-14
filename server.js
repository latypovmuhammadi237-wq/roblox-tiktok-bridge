const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

let scores = {
    boys: 0,
    girls: 0
};

// ТЕПЕРЬ ГЛАВНАЯ СТРАНИЦА ТОЖЕ ПОКАЗЫВАЕТ СЧЕТ! Никаких ошибок больше не будет.
app.get('/', (req, res) => {
    res.json(scores);
});

// Дублируем для Roblox (чтобы старые скрипты не сломались)
app.get('/scores', (req, res) => {
    res.json(scores);
});

// Обычные триггеры Tikfinity (+1 очко)
app.all('/add-point-trigger-boys-secret', (req, res) => {
    scores.boys += 1;
    res.json({ success: true, total: scores.boys });
});

app.all('/add-point-trigger-girls-secret', (req, res) => {
    scores.girls += 1;
    res.json({ success: true, total: scores.girls });
});

// Мега триггеры Tikfinity (+20 очков)
app.all('/insta-boys-secret', (req, res) => {
    scores.boys += 20;
    res.json({ success: true, total: scores.boys });
});

app.all('/insta-girls-secret', (req, res) => {
    scores.girls += 20;
    res.json({ success: true, total: scores.girls });
});

// Сброс счета
app.all('/reset-scores-clear', (req, res) => {
    scores.boys = 0;
    scores.girls = 0;
    res.send('Сброшено!');
});

const PORT = process.env.PORT || 3000;
// Универсальный запрос для пацанов (+20 очков)
app.all('/insta-boys-secret', (req, res) => {
    scores.boys += 20;
    res.json(scores);
});

// Универсальный запрос для девчонок (+20 очков)
app.all('/insta-girls-secret', (req, res) => {
    scores.girls += 20;
    res.json(scores);
});

app.listen(PORT, () => console.log(`Сервер успешно работает!`));
app.listen(PORT, () => console.log(`Сервер успешно работает!`));
