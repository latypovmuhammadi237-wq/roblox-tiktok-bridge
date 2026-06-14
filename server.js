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

// Дублируем для Roblox
app.get('/scores', (req, res) => {
    res.json(scores);
});

// Обычные триггеры Tikfinity (+1 очко)
app.all('/add-point-trigger-boys-secret', (req, res) => {
    scores.boys += 1;
    res.status(200).send('OK');
});

app.all('/add-point-trigger-girls-secret', (req, res) => {
    scores.girls += 1;
    res.status(200).send('OK');
});

// МЕГА ТРИГГЕРЫ ДЛЯ TIKFINITY (+20 очков)
app.all('/insta-boys-secret', (req, res) => {
    scores.boys += 20;
    res.status(200).send('OK');
});

app.all('/insta-girls-secret', (req, res) => {
    scores.girls += 20;
    res.status(200).send('OK');
});

// Сброс счета
app.all('/reset-scores-clear', (req, res) => {
    scores.boys = 0;
    scores.girls = 0;
    res.status(200).send('Сброшено!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер успешно работает!`));
