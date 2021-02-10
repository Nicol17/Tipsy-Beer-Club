(function() {
    const cartInfo = document.getElementById('cart-info');
    const cart = document.getElementById('cart');

    cartInfo.addEventListener('click', function() {
        cart.classList.toggle('show-cart');
    });
})();




const productsDiv = document.querySelector('.products');


const getBeers = async () => {
    const option = { headers: { 'Accept': 'application/json' } };
    const response = await axios.get('https://api.punkapi.com/v2/beers/random', option);
    const beer = response.data[0];

    const card = document.createElement('div');
    card.classList.add("product-card");
    productsDiv.appendChild(card);

    const cardImg = document.createElement('div');
    cardImg.classList.add("product-img");
    card.appendChild(cardImg);

    const img = document.createElement('img');
    cardImg.appendChild(img);
    var tryImg = beer.image_url;
    if (tryImg == null) {
        tryImg = "../img/beer.png";
    }
    img.src = tryImg;

    const cardName = document.createElement('div');
    cardName.classList.add("product-name");
    card.appendChild(cardName);

    const name = document.createElement('p');
    cardName.appendChild(name);
    name.innerText = beer.name;

    const cardInfo = document.createElement('div');
    cardInfo.classList.add("product-info");
    card.appendChild(cardInfo);

    const cardPrice = document.createElement('div');
    cardPrice.classList.add("product-price");
    card.appendChild(cardPrice);

    const price = document.createElement('p');
    cardPrice.appendChild(price);
    price.innerText = "$ " + Number((Math.floor(Math.random() * (1499 - 349 + 1)) + 349) / 100).toFixed(2);

    const addToCartBtn = document.createElement('button');
    addToCartBtn.classList.add("add-to-cart");
    card.appendChild(addToCartBtn);
    (function(){

    const cartBtn = document.querySelectorAll('.add-to-cart');
    
        cartBtn.forEach(function(btn) {
            btn.addEventListener('click', function(event){
    
                let thumbnail = event.target.parentElement.parentElement.firstChild.firstChild.src;
                let name = event.target.parentElement.parentElement.firstChild.nextSibling.firstChild.innerText;
                let price = event.target.parentElement.parentElement.firstChild.nextSibling.nextSibling.nextSibling.innerText
                price = Number(price.slice(2, price.length));
                


                const beer = {};
                beer.img = thumbnail;
                beer.name = name;
                beer.price = price;


                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `<img src="${beer.img}" class="img-fluid rounded-circle" id="item-img" alt="beer image">
                <div class="item-text">
                  <p id="cart-item-title" class="font-weight-bold mb-0">${beer.name}</p>
                  <span>$</span>
                  <span id="cart-item-price" class="cart-item-price" class="mb-0">${beer.price}</span>
                </div>
                <a href="#" id='cart-item-remove' class="cart-item-remove">
                  <i class="fas fa-trash"></i>
                </a>`;

                const cart = document.getElementById('cart');
                const total = document.querySelector('.cart-total-container');


                cart.insertBefore(cartItem, total);
                alert("Your beer has been poured into the Barrel!");
                showTotal();

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

            console.log(totalPrice);

            document.getElementById('cart-total').textContent = totalPrice;
            document.querySelector('.item-total').textContent = totalPrice;
            document.getElementById('item-count').textContent= total.length;

        }


    
    })();
    

    const buttonText = document.createElement('p');
    addToCartBtn.appendChild(buttonText);
    buttonText.innerText = ("Add");

    const buttonIcon = document.createElement('i');
    addToCartBtn.appendChild(buttonIcon);
    buttonIcon.classList.add("flaticon-beer-mug");

    const cardInfoPar = document.createElement('div');
    cardInfoPar.classList.add("product-info-par");
    cardInfo.appendChild(cardInfoPar);

    const cardInfoAbv = document.createElement('div');
    cardInfoAbv.classList.add("product-info-abv");
    cardInfo.appendChild(cardInfoAbv);

    const abv = document.createElement('p');
    cardInfoAbv.appendChild(abv);
    abv.innerText = "ABV: " + beer.abv + "%";

    const cardInfoIbu = document.createElement('div');
    cardInfoIbu.classList.add("product-info-ibu");
    cardInfo.appendChild(cardInfoIbu);

    const ibu = document.createElement('p');
    cardInfoIbu.appendChild(ibu);
    ibu.innerText = "IBU: " + beer.ibu;

    const cardInfoDescription = document.createElement('div');
    cardInfoDescription.classList.add("product-info-description");
    cardInfo.appendChild(cardInfoDescription);

    const info = document.createElement('p');
    cardInfoDescription.appendChild(info);
    info.innerText = trimDescription(beer.description);


};

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



