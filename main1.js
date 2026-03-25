// ================== SELECT ELEMENTS ==================
const productContainer = document.querySelector(".partone");
const cartContainer = document.querySelector(".showchosencart");
const cartCount = document.querySelector(".cart-count");
const totalPriceEl = document.querySelector(".total");
const noItem = document.querySelector(".noitem");

// ================== STATE ==================
let carts = JSON.parse(localStorage.getItem("data")) || [];

// ================== RENDER PRODUCTS ==================
function renderProducts(){
    let html = "";

    products.forEach(product => {
        html += `
        <div class="card1">
            <img class="laptopphoto" src="${product.src}">
            <div class="cardinfo">
                <h2>${product.name}</h2>
                <h2>Price - $ ${product.price}</h2>
                <button class="add-btn" data-id="${product.id}">
                    Add to cart
                </button>
            </div>
        </div>
        `;
    });

    productContainer.innerHTML = html;
}

// ================== RENDER CART ==================
function renderCart(){
    let html = "";

    carts.forEach(item => {
        html += `
        <tr>
            <td><img src="${item.src}"></td>
            <td>$ ${item.price}</td>
            <td>
                <button class="qty-btn" data-action="minus" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" data-action="plus" data-id="${item.id}">+</button>
            </td>
            <td>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            </td>
        </tr>
        `;
    });

    cartContainer.innerHTML = html;

    // show / hide "no item"
    noItem.style.display = carts.length === 0 ? "block" : "none";
}

// ================== UPDATE TOTAL ==================
function updateSummary(){
    let totalPrice = 0;
    let totalQuantity = 0;

    carts.forEach(item => {
        totalPrice += item.price * item.quantity;
        totalQuantity += item.quantity;
    });

    cartCount.innerText = totalQuantity;
    totalPriceEl.innerText = `$${totalPrice.toFixed(2)}`;
}

// ================== SAVE ==================
function saveCart(){
    localStorage.setItem("data", JSON.stringify(carts));
}

// ================== MAIN UPDATE ==================
function updateUI(){
    renderCart();
    updateSummary();
    saveCart();
}

// ================== ACTIONS ==================
function addToCart(id){
    let existing = carts.find(item => item.id === id);

    if(existing){
        existing.quantity++;
    }else{
        let product = products.find(p => p.id === id);
        if(!product) return;

        carts.push({
            ...product,
            quantity: 1
        });
    }

    updateUI();
}

function changeQuantity(action, id){
    carts = carts.map(item => {
        if(item.id === id){
            let qty = item.quantity;

            if(action === "plus") qty++;
            if(action === "minus") qty--;

            return { ...item, quantity: qty };
        }
        return item;
    }).filter(item => item.quantity > 0);

    updateUI();
}

function removeItem(id){
    carts = carts.filter(item => item.id !== id);
    updateUI();
}

// ================== EVENTS ==================

// Add to cart
productContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("add-btn")){
        let id = parseInt(e.target.dataset.id);
        addToCart(id);
    }
});

// Cart actions
cartContainer.addEventListener("click", (e) => {
    let id = parseInt(e.target.dataset.id);

    if(e.target.classList.contains("qty-btn")){
        let action = e.target.dataset.action;
        changeQuantity(action, id);
    }

    if(e.target.classList.contains("remove-btn")){
        removeItem(id);
    }
});

// ================== INIT ==================
renderProducts();
updateUI();