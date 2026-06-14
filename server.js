const express = require('express');
const app = express();

// Сюда сохраняются очки
let scores = { boys: 0, girls: 0 };

// Если Tikfinity переходит по ссылке /boys
app.get('/boys', (req, res) => {
    scores.boys += 1;
    console.log(`Мальчики получили очко! Всего: ${scores.boys}`);
    res.send(`Очко мальчикам! Всего: ${scores.boys}`);
});

// Если Tikfinity переходит по ссылке /girls
app.get('/girls', (req, res) => {
    scores.girls += 1;
    console.log(`Девочки получили очко! Всего: ${scores.girls}`);
    res.send(`Очко девочкам! Всего: ${scores.girls}`);
});

// Отсюда Roblox забирает общий счет
app.get('/scores', (req, res) => {
    res.json(scores);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`));
