document.addEventListener('DOMContentLoaded', () => {
    //select product user clicked
    const allProducts = document.querySelectorAll('.col');
    allProducts.forEach(products => {
        let itemName, itemPrice, itemRating, itemStock = ''
        const items = products.querySelectorAll('.item');
        items.forEach(itemDets => {
            itemName = itemDets.querySelector('.name');
            itemPrice = itemDets.querySelector('.price');
        })
        const dets = products.querySelectorAll('.pDets');
        dets.forEach(pdets => {
            itemStock = pdets.querySelector('.stock');
            itemRating = pdets.querySelector('.rate');
        })
        products.addEventListener('click', () => {
            // console.log(itemName.innerHTML,
            //     itemPrice.innerHTML,
            //     itemRating.innerHTML.slice(0, 3),
            //     itemStock.innerHTML.slice(0, 2)
            //     )
            // console.log(products.id)

            const addToCart = {
                productID: products.id
            }
            console.log(addToCart)
            fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addToCart)
            });

        })
    })




    // const candleName = document.querySelector('.candleName');
    // const rate = document.querySelector('.candleRate');
    // const price = document.querySelector('.candlePrice');


    
})

// async function updateStock(productID){
//         fetch('/posts', {
//             method: 'PUT'
//         })
//     }