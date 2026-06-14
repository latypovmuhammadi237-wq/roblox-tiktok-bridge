const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

let scores = {
    boys: 0,
    girls: 0
};

// 1. ЗАЩИТА: Полностью блокируем скрытые запросы браузера на иконку вкладки
app.get('/favicon.ico', (req, res) => res.status(204).end());

// 2. СТРАНИЦА СЧЕТА: Сюда заходит твой Roblox и ты сам, чтобы проверить цифры.
// Теперь этот адрес ТУПО ПОКАЗЫВАЕТ счет. Сколько бы ты его ни обновлял, очки НЕ ПРИБАВЯТСЯ!
app.get('/scores', (req, res) => {
    res.json(scores);
});

// 3. СЕКРЕТНЫЕ ССЫЛКИ ДЛЯ ТИКФИНИТИ (Браузер о них не знает, поэтому ничего не закеширует на главной странице)
app.get('/add-point-trigger-boys-secret', (req, res) => {
    scores.boys++;
    res.send('Очко мальчикам! Всего: ' + scores.boys);
});

app.get('/add-point-trigger-girls-secret', (req, res) => {
    scores.girls++;
    res.send('Очко девочкам! Всего: ' + scores.girls);
});

// 4. СБРОС СЧЕТА: Если захочешь обнулить счет перед началом стрима
app.get('/reset-scores-clear', (req, res) => {
    scores.boys = 0;
    scores.girls = 0;
    res.send('Счет успешно сброшен на 0:0!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`));
