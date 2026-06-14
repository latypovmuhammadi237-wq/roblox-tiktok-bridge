const express = require('express');
const app = express();
app.use(express.json());

let scores = { boys: 0, girls: 0 };

app.post('/tiktok-trigger', (req, res) => {
    const message = req.body.content || ""; 
    
    if (message.includes("BOYS_SCORE")) {
        scores.boys += 1;
        console.log(`Мальчики получили очко! Всего: ${scores.boys}`);
    } else if (message.includes("GIRLS_SCORE")) {
        scores.girls += 1;
        console.log(`Девочки получили очко! Всего: ${scores.girls}`);
    }

    res.status(204).send(); 
});

app.get('/scores', (req, res) => {
    res.json(scores);
});

// Render сам выдает порт через process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));