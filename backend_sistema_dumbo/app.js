const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./db');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend con express y sqlite funciona');
});

app.get('/clientes', (req, res) => {
    db.all('SELECT * FROM clientes', (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los elementos' });
            return;
        }
        res.json(rows);
    });
});


app.listen(port, () => {
    console.log(`El servidor esta escuchando en el puerto ${ port }`);
});

