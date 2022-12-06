// URL
const URL = 'http://13.200.0.23';

const ordersSection = document.getElementById('orders-section');

window.addEventListener('DOMContentLoaded', () => {
    getOrders(1);
});

async function getOrders(page) {

    // Contains orderId and total Price
    const orderDetails = await axios.get(URL + '/orders/get-order-details?page=' + page);
    
    // Contains a nested array of all the productdetails
    const ordersProducts = await axios.get(URL + '/orders/get-orders');

    const ordersSection = document.getElementById('orders-section');

    // First Loop will run for the number of orders present 
    for(let i = 0; i < orderDetails.data.length; i++) {
        
        const perOrderDiv = document.createElement('div');
        perOrderDiv.classList.add('per-order-div');

        perOrderDiv.innerHTML += `<h4>Order ID: ${orderDetails.data[i].id}</h4>`;

        // Second loop will run for the products present per order
        for(let j = 0; j < ordersProducts.data[i].length; j++) {

            perOrderDiv.innerHTML +=
                `
                    <div class="per-order-product-div">

                        <div class="per-order-product-image-div"> 
                            <img src="${ordersProducts.data[i][j].imageUrl}" alt=""> 
                        </div>
                    
                        <div class="per-order-product-details-div"> 
                        
                            <div> ${ordersProducts.data[i][j].title} </div>
                            <div>$ ${ordersProducts.data[i][j].price} </div>
                            <div>  Quantity: ${1} </div>

                        </div>

                    </div>
                `
        }

        perOrderDiv.innerHTML += 
            `
                <div class="per-order-total-div"> 
                <span> Total Price: ${orderDetails.data[i].totalPrice} </span> 
                </div>
            `

        ordersSection.appendChild(perOrderDiv);
    }

}