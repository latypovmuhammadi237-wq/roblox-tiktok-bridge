const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

let scores = {
    boys: 0,
    girls: 0
};

// Главная страница показывает весь счет
app.get('/', (req, res) => {
    res.json(scores);
});

// Дублируем для Roblox (чтобы старые скрипты не сломались)
app.get('/scores', (req, res) => {
    res.json(scores);
});

// Обычные триггеры Tikfinity (+1 очко) — сделаны всеядными (app.all)
app.all('/add-point-trigger-boys-secret', (req, res) => {
    scores.boys += 1;
    res.json(scores);
});

app.all('/add-point-trigger-girls-secret', (req, res) => {
    scores.girls += 1;
    res.json(scores);
});

// МЕГА ТРИГГЕРЫ ДЛЯ TIKFINITY (+20 очков) — теперь в одном экземпляре и всеядные
app.all('/insta-boys-secret', (req, res) => {
    scores.boys += 20;
    res.json(scores);
});

app.all('/insta-girls-secret', (req, res) => {
    scores.girls += 20;
    res.json(scores);
});

// Сброс счета
app.all('/reset-scores-clear', (req, res) => {
    scores.boys = 0;
    scores.girls = 0;
    res.send('Сброшено!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер успешно работает!`));
