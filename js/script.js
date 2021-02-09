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
    img.src = beer.image_url;

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

    const addToCartBtn = document.createElement('button');
    addToCartBtn.classList.add("add-to-cart");
    card.appendChild(addToCartBtn);

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
    abv.innerText = "ABV: " + beer.abv;

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

    console.log(response.data[0].image_url);

};

getBeers();
getBeers();
getBeers();
getBeers();
getBeers();


function trimDescription(cardInfoDescription) {
    var words = cardInfoDescription.split(" ");
    if (words.length > 35) {
        words = words.slice(0,34);
        words = words.join(" ");
        cardInfoDescription = words + ".";
    };
    return cardInfoDescription;
}

