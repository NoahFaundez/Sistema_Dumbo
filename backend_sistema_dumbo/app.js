// Express, Sequelize
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');

const app = express();
const port = process.env.PORT || 3000;

// Creamos la instancia de Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sistema_dumbo.sqlite'
});

// Creamos el modelo de la tabla Customer

class Customer extends Model {}

Customer.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_names: DataTypes.STRING,
    last_names: DataTypes.STRING,
    number_document: DataTypes.STRING,
    email: DataTypes.STRING,
    total_points: DataTypes.INTEGER
}, { sequelize, modelName: 'customer' });

// Creamos el modelo de la tabla Usuario

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING,
}, { sequelize, modelName: 'user' });

// Sincronizamos los modelos con la base de datos
sequelize.sync();

// Middleware para parsear el request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas CRUD para el modelo cliente
// GET: Obtener clientes
app.get('/api/customers', async (req, res) => {
    const customers = await Customer.findAll();
    res.json(customers);
});

// GET: Obtener un cliente por id
app.put('/api/customers/:id', async (req, res) => {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
        res.json(customer);
    } else {
        res.status(404).json({ message: 'No se encuentra al cliente' });
    }
});

// POST: Crear clientes
app.post('/api/customers', async (req, res) => {
    const newCustomer = await Customer.create(req.body);
    res.json(newCustomer);
});

// PUT: Editar un cliente por id
app.put('/api/customers/:id', async (req, res) => {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
        await customer.update(req.body);
        res.json(customer);
    } else {
        res.status(404).json({ message: 'No se encuentra al cliente' });
    }
});

app.get('/', (req, res) => {
    res.send('Backend con express y sqlite funciona');
});

app.listen(port, () => {
    console.log(`El servidor esta escuchando en el puerto ${ port }`);
});
