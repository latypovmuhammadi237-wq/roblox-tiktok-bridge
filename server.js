const express = require('express');
const app = express();
app.use(express.json());

// Тут хранятся очки
let scores = { boys: 0, girls: 0 };

// Новый обработчик — читает команду из самой ссылки
app.all('/tiktok-trigger', (req, res) => {
    // Проверяем текст и в теле запроса, и в самой ссылке (query)
    const message = req.body?.content || req.query?.team || ""; 
    
    if (message.includes("BOYS_SCORE")) {
        scores.boys += 1;
        console.log(`Мальчики получили очко! Всего: ${scores.boys}`);
    } else if (message.includes("GIRLS_SCORE")) {
        scores.girls += 1;
        console.log(`Девочки получили очко! Всего: ${scores.girls}`);
    }

    res.status(200).send("OK"); 
});

// Отсюда Roblox забирает очки (код не менялся)
app.get('/scores', (req, res) => {
    res.json(scores);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));

