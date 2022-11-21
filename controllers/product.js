const Music = require('../models/music.js');

const ITEMS_PER_PAGE = 2;

exports.getMusic= async (req, res, next) => {

    const pageNumber = req.query.page;

    // let totalProducts;

    try{

        const totalProducts = await Music.count();

        const musics = await Music.findAll({
                offset: (pageNumber - 1) * ITEMS_PER_PAGE,
                limit: ITEMS_PER_PAGE
            })

        const dataOfProducts = {
            musics: musics,

            totalProducts: totalProducts,

            hasNextPage: (ITEMS_PER_PAGE * pageNumber) < totalProducts,
            hasPreviousPage: pageNumber > 1,

            nextPage: parseInt(pageNumber) + 1,
            currentPage: parseInt(pageNumber),
            previousPage: parseInt(pageNumber) - 1,

            lastPage: Math.ceil(totalProducts / ITEMS_PER_PAGE)
        }

        res.json(dataOfProducts);

    } catch (err) {

        console.log(err);
    }
    // Music.
    //     count()
    //     .then((numberOfProducts) => {

    //         totalProducts = numberOfProducts;

    //         return Music.findAll({
    //                 offset: (pageNumber - 1) * ITEMS_PER_PAGE,
    //                 limit: ITEMS_PER_PAGE
    //             })
    //     })
    //     .then((musics) => {

    //         const dataOfProducts = {
    //             musics: musics,

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
};

exports.getProduct = async (req, res, next) => {

    const id = req.params.id;

    try {
        const music = await Music.findByPk(id);

        res.json(music);

    } catch (err) {

        console.log(err);
    }
};