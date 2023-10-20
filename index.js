let bagItem = JSON.parse(localStorage.getItem("cartItems")) || [];
onLoadCalls();


let ham = document.querySelector('.ham');
let menu = document.querySelector('.menu');

ham.addEventListener('click', () => {
    menu.classList.toggle("menu-toggle");
    if (ham.innerText === "menu") {
        ham.innerText = "close";
        ham.style.color = "white";
    }
    else {
        ham.innerText = "menu";
        ham.style.color = "black";

    }
})

function onLoadCalls() {
    displayItemsOnHomePage();
    if (bagItem.length > 0) {
        cartCountDisplay(bagItem.length);
        document.querySelector('.bagItemCount').style.display = "block";
    } else {
        document.querySelector('.bagItemCount').style.display = "none";
    }
}

function displayItemsOnHomePage() {
    let cardContainer = document.querySelector('.card-container');
    let innerHtml = [];
    items.forEach((item, i) => {
        innerHtml += cardHtml(i);
    })
    cardContainer.innerHTML = innerHtml;
}


function cardHtml(itemID) {
    return `
    <div class="card">
        <div class="img-container">
            <img src="${items[itemID].itemImage}" alt="product">
            <div class="stars">
                <div class="ratings">${items[itemID].stars.rating}⭐ | ${items[itemID].stars.noOfStar} </div>
            </div>
            <div class="addWishlist">  <span class="material-symbols-outlined">
                    favorite
                </span>Wishlist</div>
        </div>
        <div class="size">Size: ${items[itemID].size}</div>
        <div class="brand-name">${items[itemID].brandName}</div>
        <div class="product-name">${items[itemID].productName}</div>
    
        <div class="price">
            <span class="live-price">Rs.${items[itemID].livePrice}</span>
            <span class="mrp">${items[itemID].MRP}</span>
            <span class="discount">(${items[itemID].discount}% off)</span>
        </div>
        <div onclick="addToBag(${items[itemID].itemId});" class="add-to-bag">
            <div class="addToBagBTN">Add to Bag</div>
        </div>
    </div>`;
}

function addToBag(itemID) {
    let popUp = document.querySelector(".pop-up");
    cartCountDisplay(bagItem.length);
    if (bagItem.includes(itemID)) {
        showDuplicateItemPopup();
    } else {
        bagItem.push(itemID);
        localStorage.setItem("cartItems", JSON.stringify(bagItem));
    }
}

function showDuplicateItemPopup() {
    let popUp = document.querySelector(".pop-up");
    popUp.textContent = "You Have Already Maximum Quantity In Cart!!";
    popUp.classList.add("pop-up-show");
    setTimeout(() => {
        popUp.classList.remove("pop-up-show");
    }, 5000); 
}

function cartCountDisplay(len) {
    let bagItemCount = document.querySelector('.bagItemCount');
    bagItemCount.innerText = len;
}