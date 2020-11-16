const path = require('path');
const express = require('express');
//const bodyParser = require('body-parser');
require('./src/db/mongoose');
const courseRouter = require('./src/routers/course');
const userRouter = require('./src/routers/user');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());

app.use(userRouter);
app.use(courseRouter);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('*', (req, res) => {
    res.status(404).send('you are lost');
});

app.listen(port, () => {
    console.log(`The application started on port ${port}`);
});