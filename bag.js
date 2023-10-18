bagItem =  JSON.parse(localStorage.getItem("cartItems")) || [];
let bagItemsObjects;
onLoadCalls();

let bag = document.querySelector('.bag');
let bagContainer = document.querySelector('.bag-container');
let bag_icon = document.querySelector('.shopping_bag');
let count = document.querySelector('.bagItemCount');

bag.addEventListener('click',() =>{
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


function onLoadCalls(){
    loadBagItems();
    displayBagItems();
}

function loadBagItems(){
    bagItemsObjects =  bagItem.map(itemID => {
        for(let i = 0; i<items.length;i++){
            if(itemID == items[i].itemId){
                return items[i];
            }
        }
    });
}

function displayBagItems(){
    let cartItem = document.querySelector('.cart-items');
    let innerHtml = "";
    bagItemsObjects.forEach(bagItem => {
        innerHtml += generateHtml(bagItem);
    });
    cartItem.innerHTML = innerHtml;
}

function generateHtml(item){
    return `<div class="items">
        <div class="image">
            <img src="${item.itemImage}" alt="product_image">
        </div>
        <div class="product-detail">
            <div class="product-name">${item.productName}</div>
            <div class="brand-name">${item.brandName}</div>
        </div>
        <div class="each-price">
            <h2>Each</h2>Rs. ${item.livePrice}
        </div>
        <div class="quantity">
            <h2>Quantity</h2>
            <select name="quantity" id="quantity" de>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
        </div>
        <div class="total">
            <h2>Total</h2>
            Rs. ${item.livePrice}
        </div>
        <div class="card-menu">
            <li>Remove</li>
            <li>Move To WishList</li>
        </div>
    </div>`;
}