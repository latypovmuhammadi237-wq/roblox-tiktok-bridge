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

// 2. СТРАНИЦА СЧЕТА: Сюда заходит Roblox и ты сам.
// Этот адрес ТОЛЬКО ПОКАЗЫВАЕТ счет. При его обновлении ничего не накрутится!
app.get('/scores', (req, res) => {
    res.json(scores);
});

// 3. УНИВЕРСАЛЬНЫЕ СЕКРЕТНЫЕ ССЫЛКИ ДЛЯ ТИКФИНИТИ (Принимают и GET, и POST)
app.all('/add-point-trigger-boys-secret', (req, res) => {
    scores.boys++;
    console.log(`Мальчикам добавлено очко! Всего: ${scores.boys}`);
    res.json({ success: true, total: scores.boys });
});

app.all('/add-point-trigger-girls-secret', (req, res) => {
    scores.girls++;
    console.log(`Девочкам добавлено очко! Всего: ${scores.girls}`);
    res.json({ success: true, total: scores.girls });
});

// Сброс счета перед стримом (если нужно, просто перейди по этой ссылке в браузере)
app.all('/reset-scores-clear', (req, res) => {
    scores.boys = 0;
    scores.girls = 0;
    res.send('Счет сброшен на 0:0');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер успешно работает!`));
