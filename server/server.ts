import express from 'express';
import path from 'path';
import { configure } from 'nunjucks';

const app = express();

app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../pages'));

configure(path.join(__dirname, '../pages'), {
    autoescape: true,
    express: app,
    noCache: true,
    watch: true
});

app.get('/', (_, res) => {
    res.render('index.html');
});

app.listen(5000, () => console.log('server running'));
