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

app.get('/', (req, res) => {

    res.render('posts/index', { posts : [] });
});

app.listen(port, () => {
    console.log(`Server app listening at http://${hostname}:${port}`)
})