const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

let scores = {
    boys: 0,
    girls: 0
};

// 1. Показ счета для Roblox и для тебя
app.get('/scores', (req, res) => {
    res.json(scores);
});

// 2. Обычные триггеры Tikfinity (+1 очко)
app.all('/add-point-trigger-boys-secret', (req, res) => {
    scores.boys += 1;
    res.json({ success: true, total: scores.boys });
});

app.all('/add-point-trigger-girls-secret', (req, res) => {
    scores.girls += 1;
    res.json({ success: true, total: scores.girls });
});

// 3. Мега триггеры Tikfinity (+20 очков)
app.all('/insta-boys-secret', (req, res) => {
    scores.boys += 20;
    res.json({ success: true, total: scores.boys });
});

app.all('/insta-girls-secret', (req, res) => {
    scores.girls += 20;
    res.json({ success: true, total: scores.girls });
});

// 4. Сброс счета
app.all('/reset-scores-clear', (req, res) => {
    scores.boys = 0;
    scores.girls = 0;
    res.send('Сброшено!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер успешно работает!`));
