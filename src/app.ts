import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'welcome to Auth Services',
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({
        message: 'auth services health checkup',
    });
});

export default app;
