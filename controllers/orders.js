const Cart = require('../models/cart.js');
const CartProduct = require('../models/cartProducts.js');

const Music = require('../models/music.js');

const Users = require('../models/users.js');

const Orders = require('../models/orders');
const orderProducts = require('../models/ordersProducts.js');
const OrdersProducts = require('../models/ordersProducts.js');

const ITEMS_PER_PAGE = 2;

exports.postOrder = async (req, res, next) => {
    
    // From Carts table we get cartID based on userID
    // Then from cartID we can get all the items in the cartProducts table with the same cartID
    // Then create a new order row with orderid
    // Then add all the products with musicId from cartProducts table into the orderProduct table with same orderID
    // Then clear cartProducts 
    try{

        const user = await Users.findByPk(1);

        const cart = await user.getCart();

        const cartProducts = await CartProduct.findAll( { where: { cartId: cart.id } } );

        let total = 0;

        const newOrder = await Orders.create({

            totalPrice: 1,
            userId: user.id
          });

        for(let i = 0; i < cartProducts.length; i++) {

            const product = await Music.findByPk(cartProducts[i].dataValues.musicId);

            const currentPrice = product.dataValues.price;

            total = (parseFloat(total) + parseFloat(currentPrice)).toFixed(2);

            await OrdersProducts.create({
                
                    orderId: newOrder.id,
                    musicId: product.id
                });
        }

        await Orders.update(
                {totalPrice: total},
                {where: {id: newOrder.id}}
            )
        
        await CartProduct.destroy({
            where: {cartId: cart.id}
        })
    
        res.json({sucess: true});

    } catch(err) {

        console.log(err);
        res.json({sucess: false});
    }

}

exports.getAllOrders = async (req, res, next) => {

    try{

        const user = await Users.findByPk(1);

        // orders will be an array
        const orders = await user.getOrders();

        const ordersArray = [];

        // [order1 = [prod1, prod2, prod3], 
        //  order2 = [prod1, prod2, prod3], 
        //  order3 = [prod1, prod2, prod3]]

        for(let i = 0; i < orders.length; i++) {
            
            const orderDetails = await OrdersProducts.findAll( { where: {orderId: orders[i].id } } );
            const productsArray = [];

            for(let j = 0; j < orderDetails.length; j++) {

                const musicId = orderDetails[j].dataValues.musicId;

                const product = await Music.findByPk(musicId);

                productsArray.push(product);
            }

            ordersArray.push(productsArray);

        }

        res.json(ordersArray);

    } catch(err) {

        console.log(err);
    }
}

exports.getOrderDetails = async (req, res, next) => {
    try{

        const user = await Users.findByPk(1);

        // orders will be an array
        const orders = await user.getOrders();

        res.json(orders);
        
    } catch(err) {
        
        console.log(err);
    }
}