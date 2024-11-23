document.addEventListener('DOMContentLoaded', () => {
    //changes style of sold-out products
    const outOfStock = document.querySelectorAll('.incentive');
    outOfStock.forEach(item => {
        if(item.id === 'sold-out'){
            item.parentElement.style.cursor = 'not-allowed';
            item.parentElement.classList.remove('col');
            item.parentElement.classList.add('noHoverCol');
        }
    })

    //log products from cart
    const cartProducts = document.querySelectorAll('.added_items');
    let cartArray = []
    cartProducts.forEach(item => {
        if(!cartArray.includes(item.id)){
            cartArray.push(item.id)
        }
    })

    //select product user clicked
    const allProducts = document.querySelectorAll('.col');
    allProducts.forEach(products => {
        products.addEventListener('click', () => {
            
            if(!cartArray.includes(products.id)){
                //add products to cart
                const addToCart = {
                    productID: products.id
                }
                fetch('/cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(addToCart)
                });
                location.reload()
            }else{
                alert('Announcement: One Per Customer Product')
            }  
        })
    })

    //delete items from cart
    const deleteItems = document.querySelectorAll('.removeIcon')
    deleteItems.forEach(removeItem => {
        removeItem.addEventListener('click', async () => {
            deleteItemFromCart(removeItem.parentElement.parentElement.id)
            location.reload()
        }) 
    })

    //if cart empty or not
    document.querySelector('.empty_cart').style.display = (document.querySelectorAll('.added_items').length === 0) ? 'block' : 'none' 

    const updateStock = document.querySelector('.more');
    updateStock.addEventListener('click', () => {
        updateItemStock(cartArray)
        deleteAllFromCart()
        location.reload()
    })
});

async function deleteItemFromCart(itemID){
    fetch('cart/' + itemID, {
        method: 'DELETE'
    })
}

async function deleteAllFromCart(){
    fetch('cart/', {
        method: 'DELETE'
    })
}

async function updateItemStock(itemsID){
    fetch('/cart', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemsID)
    });
}
