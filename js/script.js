(function() {
    const cartInfo = document.getElementById('cart-info');
    const cart = document.getElementById('cart');

    cartInfo.addEventListener('click', function() {
        cart.classList.toggle('show-cart');
    });
})();

const productsDiv = document.querySelector('.products');

async function getBeers() {

    const option = { headers: { 'Accept': 'application/json' } };
    const response = await axios.get('https://api.punkapi.com/v2/beers/random', option);
    const beer = response.data[0];

    const card = document.createElement('div');
    card.classList.add("product-card");
    card.id = beer.id;
    card.innerHTML = `
                        <div class="product-img">
                            <img class="card-img" src="${tryImg(beer.image_url)}">
                        </div>
                        <div class="product-name">
                            <p class="card-name">${beer.name}</p>
                        </div>
                        <div class="product-info">
                        <div class="product-info-par">
                            <div class="product-info-abv">
                                <p>ABV: ${beer.abv} %</p>
                            </div>
                            <div class="product-info-ibu">
                                <p>IBU: ${beer.ibu}</p>
                            </div>
                        </div>
                        <div class="product-info-description">
                            <p>${trimDescription(beer.description)}</p>
                        </div>
                        </div>  
                        <div class="product-price">
                            <p class="card-price">${randomPrice()}</p>
                        </div>
                        <button class="add-to-cart">
                            <p>Add</p>
                            <i class="flaticon-beer-mug"></i>
                        </button>
    `;

    productsDiv.appendChild(card);

    addToCart(beer.id);

};

function addToCart(idOr) {

    const cartBtn = document.querySelectorAll('.add-to-cart');
    
    cartBtn.forEach(function(btn) {
        btn.addEventListener('click', function(event){

            let id = event.target.parentElement.parentElement.id;
            if (id==idOr) {
                let thumbnail = event.target.parentElement.parentElement.firstChild.nextSibling.firstChild.nextSibling.src;
                let name = event.target.parentElement.parentElement.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.innerText;
                let price = event.target.parentElement.parentElement.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.innerText;
                price = Number(price.slice(2, price.length));
                            
                const beer = {};
                beer.img = thumbnail;
                beer.name = name;
                beer.price = price;

                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${beer.img}" class="img-fluid rounded-circle" id="item-img" alt="beer image">
                    <div class="item-text">
                        <p id="cart-item-title" class="font-weight-bold mb-0">${beer.name}</p>
                        <span>$</span>
                        <span id="cart-item-price" class="cart-item-price" class="mb-0">${beer.price}</span>
                        </div>
                        <a href="#" id='cart-item-remove' class="cart-item-remove">
                            <i class="fas fa-trash"></i>
                        </a>
                `;

                const cart = document.getElementById('cart');
                const total = document.querySelector('.cart-total-container');

                cart.insertBefore(cartItem, total);
                alert("Your beer has been poured into the Barrel!");
                showTotal();
            }
        })
    })
        
    function showTotal() {
        const total = [];
        const items = document.querySelectorAll('.cart-item-price');
        items.forEach(function(item){
            total.push(parseFloat(item.innerText));
        });
            
        const totalPrice = total.reduce(function(total, item){
            total += item;
               
            return total;
        }, 0)

        document.getElementById('cart-total').textContent = totalPrice;
        document.querySelector('.item-total').textContent = totalPrice;
        document.querySelector('.item-count').textContent= total.length;
    }

}

for (let i=0; i<5; i++){
    getBeers();
}

function trimDescription(cardInfoDescription) {
    var words = cardInfoDescription.split(" ");
    if (words.length > 30) {
        words = words.slice(0,34);
        words = words.join(" ");
        cardInfoDescription = words + ".";
    };
    return cardInfoDescription;
}

function tryImg(imgurl) {
    if (imgurl == null) {
        imgurl = "../img/beer.png";
    }
    return imgurl;
}

function randomPrice() {
    return "$ " + Number((Math.floor(Math.random() * (1499 - 349 + 1)) + 349) / 100).toFixed(2);
}
