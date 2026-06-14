const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // Включаем поддержку JSON-данных

let scores = {
    boys: 0,
    girls: 0
};

// 1. ЗАЩИТА: Игнорируем запросы на иконку вкладки
app.get('/favicon.ico', (req, res) => res.status(204).end());

// 2. ЧТЕНИЕ СЧЕТА: Сюда заходит Roblox и ты сам через браузер. 
// При обновлении этой страницы счет БОЛЬШЕ НЕ СМОЖЕТ увеличиться!
app.get('/scores', (req, res) => {
    res.json(scores);
});

// 3. СБРОС СЧЕТА (Если захочешь обнулить перед стримом, просто перейди по этой ссылке)
app.get('/reset-scores-clear', (req, res) => {
    scores.boys = 0;
    scores.girls = 0;
    res.send('Счет успешно сброшен на 0:0!');
});

// 4. ДОБАВЛЕНИЕ ОЧКОВ: Перевели на метод POST, чтобы браузер не накручивал их при обновлении
app.post('/boys', (req, res) => {
    scores.boys++;
    res.json({ success: true, team: 'boys', total: scores.boys });
});

app.post('/girls', (req, res) => {
    scores.girls++;
    res.json({ success: true, team: 'girls', total: scores.girls });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер успешно запущен на порту ${PORT}`);
});
