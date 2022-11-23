const express = require('express'); // Express Import
const bodyParser= require('body-parser'); // Body-Parser Import
const cors = require('cors'); // Cors Import
const dotenv = require('dotenv') //Dotenv Import

const path = require('path');

dotenv.config();


const sequelize = require('./util/database.js'); // MySQL Database import (Local Import)

// Model Imports
const Music = require('./models/music.js');
const Users = require('./models/users.js');
const Cart = require('./models/cart.js');
const CartProduct = require('./models/cartProducts.js');
const Orders = require('./models/orders.js');
const OrdersProducts = require('./models/ordersProducts.js');


// Route Imports
const productRoutes = require('./routes/product.js'); // Product Routes Imports
const cartRoutes = require('./routes/cart.js'); // Cart Routes Imports
const orderRoutes = require('./routes/orders.js') // Order Routes Imports

const app = express(); // Initializing the backend

app.use(cors()); // Initializing Cors
app.use(bodyParser.json({ extended: false })); // Initializing Body Parser



// Product Routes
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {

    res.sendFile(path.join(__dirname, `public/${req.url}`));
})

// Error Routes
app.use((req, res) => {
    res.status(404).send(`<h1> Page Not Found </h1>`);
})



// Defining Relationships

// One to Many Relationship
Music.belongsTo(Users, { constraints: true, onDelete: 'CASCADE' });
Users.hasMany(Music);

// One to One Relationship
Users.hasOne(Cart);
Cart.belongsTo(Users);

// Many to Many Relationship
Cart.belongsToMany(Music, {through: CartProduct});
Music.belongsToMany(Cart, {through: CartProduct});

// One to Many Relationship
Orders.belongsTo(Users, { constraints: true, onDelete: 'CASCADE' });
Users.hasMany(Orders);

// Many to Many Relationship
Orders.belongsToMany(Music, {through: OrdersProducts});
Music.belongsToMany(Orders, {through: OrdersProducts});

let tempUser;
// Initializing database and listening to port
sequelize.sync()
    .then((result) => {
        
        return Users.findByPk(1);

    })
    .then((user) => {

        if(!user) {
            return Users.create( {name: 'DummyDumDum', email: 'dummy@dumdum.com'} );
        }

        return user
    })
    .then((user) => {
        tempUser = user;
        return user.getCart();
    })
    .then((cart) => {

        if(!cart) {
            tempUser.createCart();
            return;
        }
        return;
    })
    .then(() => {
        app.listen(5010);
    })
    .catch(err => {
        console.log(err);
    })