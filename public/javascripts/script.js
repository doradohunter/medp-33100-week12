document.addEventListener('DOMContentLoaded', () => {
    let clickedProduct = ''
    const allProducts = document.querySelectorAll('.col');
    allProducts.forEach((product) => {
        product.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            clickedProduct = e.target.parentElement.innerHTML.split('<p class="name">')[1].slice(0,-255);
        })
    })

    // const name = document.querySelector('candleName');
    // const rate = document.querySelector('candleRate');
    // const price = document.querySelector('candlePrice');

})