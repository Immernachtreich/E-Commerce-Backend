const nav = document.getElementById('navCart'); // Navigation Bar

// Buttons
const topCartBtn = document.getElementById('top-cart-btn');
const bottomCartBtn = document.getElementById('bottom-cart-btn');
const xButton = document.getElementById('close-btn');

// Button Event Listeners
{
    topCartBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    })

    bottomCartBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    })

    xButton.addEventListener('click', () => {
        nav.classList.toggle('active');
    })
}

// Shop Section Div for event listener
const shopSectionDiv = document.getElementById('shop-section');

// Cart Section Div for event listener
const cartList = document.getElementById('cart-items-ul');

// Page Buttons Div for event listener
const pageButtonsDiv = document.getElementById('page-buttons-div');
const cartButtonsDiv = document.getElementById('cart-page-buttons-div');
const purchaseButton = document.getElementById('purchase-button');

const musicDiv = document.getElementById('Album-container');
const merchDiv = document.getElementById('product-container');

/*
* Event Listeners
*/

shopSectionDiv.addEventListener('click', addToCart);

cartList.addEventListener('click', removeItemFromtCart);

purchaseButton.addEventListener('click', purchaseItems);

window.addEventListener('DOMContentLoaded', () => {
    const page = 1
    getProducts(1);
});

window.addEventListener('DOMContentLoaded', () => {
    getCartProducts(1);
});

// pageButtonsDiv.addEventListener('click', (e) => {
//     const pageNumber = e.target.innerText;
//     getProducts(pageNumber);
// });

async function addToCart(e) { 

    if(e.target.classList.contains('shop-btn')) {
        const albumDiv = e.target.parentElement.parentElement;

        const url = 'http://13.233.110.169:5010/products/get-product/' + albumDiv.id;
        
        try{
            const product = await axios.get(url);
            const title = product.data.title;
            const price = product.data.price;
            const imageUrl = product.data.imageUrl;
            const id = product.data.id;
            
            // const title = albumDiv.children[0].innerText;
            // const price = albumDiv.children[2].children[0].innerText;
            // const imgUrl = albumDiv.children[1].children[0].src;

            const productInfo = {
                id : id,
                title : title,
                price : price,
                imageUrl : imageUrl,
                quantity: 1
            }

            const response = await axios.post('http://13.233.110.169:5010/cart/add-to-cart', productInfo);

            if(response.data.alreadyExisting) {

                window.alert('Item is already in the cart');

            } else {
                popupNotification(`Your Product: ${title} has been added to the cart`);
                getCartProducts(1);
                // const li = 
                // `
                // <li id="${id}" class="cart-list-ul-li">
                //     <img src="${imageUrl}" alt="${title}">
                //     <div class="title-div-cart"> ${title} </div>
                //     <div class="price-div-cart"> ${price} </div>
                //     <input type="number" id="quantity-input" class="quantity-input" value="1">
                //     <button class="remove-button" id="remove-button"> Remove </button>
                // </li>
                // `

                // cartList.innerHTML += li;

                // const totalDiv = document.getElementById('total-div');

                // const existingPriceString = totalDiv.innerText.split(':');
                // const existingPrice = parseFloat(existingPriceString[1]);

                // const totalPrice = (existingPrice + price).toFixed(2);

                // totalDiv.innerText = `Total: ${totalPrice}`;

            }

        }
        catch(err) {
            console.log(err);
        }
    }
}

async function removeItemFromtCart(e) {

    if(e.target.classList.contains('remove-button')) {
        
        try{

            const li = e.target.parentElement;

            const url = 'http://13.233.110.169:5010/cart/delete-product/' + li.id;

            const response = await axios.post(url);

            getCartProducts(1);

            // const totalDiv = document.getElementById('total-div');

            // const existingPrice = totalDiv.innerText.split(':')[1];

            // const currentItemPrice = response.data.price;

            // const totalPrice = (parseFloat(existingPrice) - parseFloat(currentItemPrice)).toFixed(2);

            // totalDiv.innerText = `Total: ${totalPrice}`;

            // cartList.removeChild(li);
            
        } catch(err) {

        }
    }
}

async function getProducts(page) {

    try {

        // Getting Music Products
        const musics = await axios.get('http://13.233.110.169:5010/products/get-musics?page=' + page);

        musicDiv.innerHTML = "";

        musics.data.musics.forEach((musics) => {

            const musicsLiDiv = 
                `
                <div id="${musics.id}">

                    <h3>${musics.title}</h3>

                    <div class="img-cont">
                        <img class="product-imgs" src="${musics.imageUrl}" alt="Album-1">
                    </div>

                    <div class="product-details">
                        <span>$<span>${musics.price}</span></span>
                        <button class="shop-btn" type='button'>ADD TO CART</button>
                    </div>

                </div>
                `
            
            musicDiv.innerHTML += musicsLiDiv;
        })

        // Getting Merches Products
        // const merches = await axios.get('http://13.233.110.169:5010/products/get-merches?page=' + page);

        // merchDiv.innerHTML = "";

        // merches.data.merches.forEach((merches) => {
        //     const merchesLiDiv = 
        //     `
        //         <div id="${merches.id}">
        //             <h3>${merches.title}</h3>

        //             <div class="img-cont">
        //                 <img class="product-imgs" src="${merches.imageUrl}" alt="Mug">
        //             </div>

        //             <div class="product-details">
        //                 <span>$<span>${merches.price}</span></span>
        //                 <button class="shop-btn" type='button'>ADD TO CART</button>
        //             </div>

        //         </div> 
        //     `

        //     merchDiv.innerHTML += merchesLiDiv;
        // })

        // Converting the page into pagination

        // (musics.data.lastPage > merches.data.lastPage ? musics.data : merches.data)
        pagination(musics.data);

    } catch(err) {
        console.log(err);
    }
}

async function getCartProducts(page) {

    try{

        // Getting Cart Products
        const cartItems = await axios.get('http://13.233.110.169:5010/cart/get-products/?page=' + page);
        cartList.innerHTML = "";

        let totalPrice = 0;

        cartItems.data.cartItems.forEach((cartItems) => {

            totalPrice = (parseFloat(totalPrice) + parseFloat(cartItems.price)).toFixed(2);

            const li = 
                `
                <li id="${cartItems.id}" class="cart-list-ul-li">
                    <img src="${cartItems.imageUrl}" alt="${cartItems.title}">
                    <div class="title-div-cart"> ${cartItems.title} </div>
                    <div class="price-div-cart">$ ${cartItems.price} </div>
                    <input type="number" id="quantity-input" class="quantity-input" value="1">
                    <button class="remove-button" id="remove-button"> Remove </button>
                </li>
                `;

            cartList.innerHTML += li;
        })

        // Calculating total price for cart
        const totalDiv = document.getElementById('total-div');

        totalDiv.innerText = `Total: ${totalPrice}`;

        cartPagination(cartItems.data);

    } catch(err) {
        console.log(err);
    }
}

async function purchaseItems(e) {
    
    if(cartList.children.length !== 0) {
        
        try{

            const response = await axios.post('http://13.233.110.169:5010/orders/add-order');

            cartList.innerHTML = "";

            popupNotification('Order Was SuccessFully Placed');
            
        } catch(err) {
            console.log(err);
        }
        
    }
    else {
        window.alert('cart is empty');
    }
}





function popupNotification(message) {
    const notifDiv = document.getElementById('notification');

    const notif = document.createElement('div');

    notif.classList.add('notification-add');

    notif.innerText = message;

    notifDiv.appendChild(notif);

    setTimeout(() => {
        notif.remove();
    },3000)
}

function pagination(data) {
    
    // Clearing existing buttons
    pageButtonsDiv.innerHTML = '';

    // Creating the previous Button if it exists
    if(data.hasPreviousPage) {
        const prevButton = document.createElement('button');

        prevButton.innerHTML = data.previousPage;

        prevButton.classList.add('page-buttons');

        prevButton.addEventListener('click', () => {
            getProducts(data.previousPage);
        })

        pageButtonsDiv.appendChild(prevButton);
    }

    const currentButton = document.createElement('button');

    currentButton.innerHTML = data.currentPage;

    currentButton.classList.add('page-buttons');
    currentButton.classList.toggle('active');

    currentButton.addEventListener('click', () => {
        getProducts(data.currentPage);
    })

    pageButtonsDiv.appendChild(currentButton);

    // Creating the next button if it exists
    if(data.hasNextPage) {
        const nextButton = document.createElement('button');

        nextButton.innerHTML = data.nextPage;

        nextButton.classList.add('page-buttons');

        nextButton.addEventListener('click', () => {
            getProducts(data.nextPage);
        })

        pageButtonsDiv.appendChild(nextButton);
    }

    
}

function cartPagination(cartData) {

    // Clearing existing buttons
    cartButtonsDiv.innerHTML = '';

    // Creating the previous Button if it exists
    if(cartData.hasPreviousPage) {
        const prevButton = document.createElement('button');

        prevButton.innerHTML = cartData.previousPage;

        prevButton.classList.add('cart-page-buttons');

        prevButton.addEventListener('click', () => {
            getCartProducts(cartData.previousPage);
        })

        cartButtonsDiv.appendChild(prevButton);
    }
 
    const currentButton = document.createElement('button');

    currentButton.innerHTML = cartData.currentPage;

    currentButton.classList.add('cart-page-buttons');
    currentButton.classList.toggle('active');

    currentButton.addEventListener('click', () => {
        getCartProducts(cartData.currentPage);
    })
 
    cartButtonsDiv.appendChild(currentButton);
 
    // Creating the next button if it exists
    if(cartData.hasNextPage) {
        const nextButton = document.createElement('button');

        nextButton.innerHTML = cartData.nextPage;

        nextButton.classList.add('cart-page-buttons');

        nextButton.addEventListener('click', () => {
            getCartProducts(cartData.nextPage);
        })

        cartButtonsDiv.appendChild(nextButton);
    }

}
 
