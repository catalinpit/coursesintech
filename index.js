const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
//const bodyParser = require('body-parser');

require('./src/db/mongoose');
const courseRouter = require('./src/routes/course');
const commentRouter = require('./src/routes/comment');
const userRouter = require('./src/routes/user');
const notFound = require('./src/middleware/notFound');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(courseRouter);
app.use(commentRouter);
app.use(userRouter);
app.use(notFound);

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;