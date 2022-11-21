const Cart = require('../models/cart.js');
const CartProduct = require('../models/cartProducts.js');
const Music = require('../models/music.js');
const Users = require('../models/users.js');

const ITEMS_PER_PAGE = 2;

exports.postAddProduct = (req, res, next) => {

    const id = req.body.id;
    // const title = req.body.title;
    // const imageUrl = req.body.imageUrl;
    // const price = req.body.price;

    let fetchedCart;
    let fetchedProduct;

    Users.findByPk(1)
        .then((user) => {

            return user.getCart();
        })
        .then((cart) => {

            fetchedCart = cart;

            return Music.findByPk(id);
        })
        .then((product) => {

            fetchedProduct = product;

            return CartProduct.findAll( { where: { musicId: product.id } } );
            
        })
        .then((response) => {

            console.log(response.length == 0);

            if(response.length == 0) {

                fetchedCart.addMusic(fetchedProduct)
                    .then(() => {
                        
                        res.json({alreadyExisting: false})
                    })
                    .catch(err => console.log(err));
            }
            else {

                res.json({alreadyExisting: true});
            }
        })
        .catch(err => console.log(err))
    // Cart
    //     .findByPk(id)
    //     .then((product) => {

    //         if(product) {
    //             res.json({alreadyExisting : true});
    //         }
    //         else {

    //             Cart
    //                 .create({
    //                     id: id,
    //                     title: title,
    //                     imageUrl: imageUrl,
    //                     price: price,
    //                     quantity: 1
    //                 })
    //                 .then((data) => {
    //                     res.json({alreadyExisting : false});
    //                 }) 
    //                 .catch(err => {
    //                     console.log(err);
    //                 })
    //         }
    //     })
    //     .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {

    const pageNumber = req.query.page;
    let totalProducts;
    let fetchedMusic;

    Users.findByPk(1)
        .then((user) => {

            return user.getCart();
        })
        .then((cart) => {

            // fetchedCart = cart;

            return cart.getMusic({
                offset: (pageNumber - 1) * ITEMS_PER_PAGE,
                limit: ITEMS_PER_PAGE
            });
        })
        .then((musics) => {

            fetchedMusic = musics;
            return CartProduct.count()
        })
        .then((numberOfProducts) => {

            totalProducts = numberOfProducts;

            const dataOfProducts = {

                cartItems: fetchedMusic,

                totalProducts: totalProducts,

                hasNextPage: (ITEMS_PER_PAGE * pageNumber) < totalProducts,
                hasPreviousPage: pageNumber > 1,

                nextPage: parseInt(pageNumber) + 1,
                currentPage: parseInt(pageNumber),
                previousPage: parseInt(pageNumber) - 1,

                lastPage: Math.ceil(totalProducts / ITEMS_PER_PAGE)
            }

            res.json(dataOfProducts);
        })
    // Cart.
    //     count()
    //     .then((numberOfProducts) => {

    //         totalProducts = numberOfProducts;

    //         return Cart.findAll({
    //                 offset: (pageNumber - 1) * ITEMS_PER_PAGE,
    //                 limit: ITEMS_PER_PAGE
    //             })
    //     })
    //     .then((cartItems) => {

    //         const dataOfProducts = {
    //             cartItems: cartItems,

    //             totalProducts: totalProducts,

    //             hasNextPage: (ITEMS_PER_PAGE * pageNumber) < totalProducts,
    //             hasPreviousPage: pageNumber > 1,

    //             nextPage: parseInt(pageNumber) + 1,
    //             currentPage: parseInt(pageNumber),
    //             previousPage: parseInt(pageNumber) - 1,

    //             lastPage: Math.ceil(totalProducts / ITEMS_PER_PAGE)
    //         }
    //         res.json(dataOfProducts);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
}

exports.deleteProduct = (req, res, next) => {
    const id = req.params.id;
    
    Users.findByPk(1)
        .then((user) => {

            return user.getCart();
        })
        .then((cart) => {

            // fetchedCart = cart;

            return cart.getMusic({where: {id:id}})
        })
        .then((musics) => {

            const music = musics[0];
            
            return music.cartProducts.destroy();
        })
        .then((response) => {
            res.json(response);
        })
    // Cart
    //     .findByPk(id)
    //     .then((result => {
    //         return result.destroy();
    //     }))
    //     .then((response) => {
    //         res.json(response);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
}