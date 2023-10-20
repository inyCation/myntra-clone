bagItem = JSON.parse(localStorage.getItem("cartItems")) || [];
let livePrice;
let MRP;
let bagItemsObjects;
onLoadCalls();

let bag = document.querySelector('.bag');
let bagContainer = document.querySelector('.bag-container');
let bag_icon = document.querySelector('.shopping_bag');
let count = document.querySelector('.bagItemCount');

bag.addEventListener('click', () => {
    displayBagItems();
    checkout();
    bagContainer.classList.toggle('bag-display');
    if (bag_icon.innerText === "shopping_bag") {
        bag_icon.innerText = "close";
        count.style.display = "none";
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);
    }
    else {
        bag_icon.innerText = "shopping_bag";
        bag_icon.style.color = "black";
        count.style.display = "block";
        document.body.style.overflow = "auto";


    }

})




function onLoadCalls() {
    loadBagItems();
    displayBagItems();
    checkout();
}

function loadBagItems() {
    livePrice = 0;
    MRP = 0;
    bagItemsObjects = bagItem.map(itemID => {
        for (let i = 0; i < items.length; i++) {
            if (itemID == items[i].itemId) {
                livePrice += items[i].livePrice;
                MRP += items[i].MRP;
                return items[i];
            }
        }
    });
}

function displayBagItems() {
    let cartItem = document.querySelector('.cart-items');
    let innerHtml = "";
    bagItemsObjects.forEach(bagItem => {
        innerHtml += generateHtml(bagItem);
    });
    cartItem.innerHTML = innerHtml;
}

function generateHtml(item) {
    return `<div class="items">
        <div class="image">
            <img src="${item.itemImage}" alt="product_image">
        </div>
        <div class="product-detail">
            <div class="product-name">${item.productName}</div>
            <div class="brand-name">${item.brandName}</div>
        </div>
        <div class="discount">
            <h2>Discount</h2>
            Rs. ${item.discount}%
        </div>
        <div class="total">
            <h2>Total</h2>
            Rs. ${item.livePrice}
        </div>
        <div class="card-menu">
            <li class="remove-items" onclick="removeitems(${item.itemId});" >Remove</li>
            <li>Move To WishList</li>
        </div>
    </div>`;
}



function removeitems(removeItemId) {
    // let removeBtn = document.querySelector('.remove-items');
    bagItem = bagItem.filter(item => item !== removeItemId);
    localStorage.setItem("cartItems", JSON.stringify(bagItem));

    loadBagItems();
    displayBagItems();
    checkout();
}

function checkout() {
    let checkoutArea = document.querySelector(".checkout-area");
    let shipping = 0;

    if (bagItem.length >= 1) {
        if (livePrice <= 249) {
            shipping = 49;
        }
    }

    let innerHtml = `
    <div class="promo">
        <input type="text" name="promo" id="promo" class="promo-input" placeholder="Promo Code">
        <div class="promo-submit-btn">Apply</div>
    </div>
    <div class="cost-calc">
        <div class="shipping">
            <h3>Shipping cost</h3>
            <h4 class="discount">Discount</h4>
            <h3>Estimated Total </h3>
        </div>
        <div class="price">
            <h3>${shipping}</h3>
            <h4 class="discount">Rs. ${MRP.toFixed(2)}</h4>
            <h3>Rs. ${livePrice.toFixed(2)}</h3>
        </div>
    </div>
    <div class="checkout">
        <span class="material-symbols-outlined">
            lock
        </span> <span>Checkout</span>
    </div>`;

    checkoutArea.innerHTML = innerHtml;
}