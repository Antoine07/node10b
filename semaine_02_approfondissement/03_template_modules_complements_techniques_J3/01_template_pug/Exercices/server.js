import express from 'express';

// __dirname
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 8080;
const hostname = 'localhost';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views') );

const posts = [
    { title : "Pug", date : "2022-04-21", priority : "important" },
    { title : "Express", date : "2022-04-22", priority : "normal"},
    { title : "Node.js", date : "2022-04-23",  priority : "important"},
  ];

const authors = [
    "alan",
    "alice",
];


app.get('/', (req, res) => {

    res.render('posts/index', { posts, authors });
});

app.listen(port, () => {
    console.log(`Server app listening at http://${hostname}:${port}`)
})