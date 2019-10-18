import express from 'express';

const app = express();

app.get('/', (_, res) => {
    res.send('Hello asdfafdafff');
});

app.listen(5000, () => console.log('server running'));
