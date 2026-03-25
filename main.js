let partone = document.querySelector(".partone");
let showchosencart = document.querySelector(".showchosencart");

let carts = [];

try {
    carts = JSON.parse(localStorage.getItem("data")) || [];
} catch (e) {
    carts = [];
}

window.addtocart = addtocart;
window.changeQuantity = changeQuantity;
window.removelist = removelist;

// to dispaly each card on website 
let html = "";
products.forEach(info=>{
    html += `
          <div>
                         <div class="card1">
                                <img class="laptopphoto" src="${info.src}" alt="" srcset="">
                                <div class="cardinfo">
                                    <h2>${info.name}</h2>
                                    <h2>Price - $ ${info.price}</h2>
                                    <button onclick="addtocart(${info.id})">Add to cart</button>
                                </div>
                                
                        </div>
                    </div>
    `
})
partone.innerHTML = html;

//click btn to dispaly the card on website that have chosen

function addtocart(id){
    if(carts.some(data=>data.id === id)){
        changeQuantity("plus",id)
    }else{
            let selectcard = products.find(data=>data.id === id);
            console.log(selectcard)
            carts.push({
                ...selectcard,
                quantity:1,
            })
            console.log(carts)
    }
    updatedata()
}
//click btn to dispaly the card on website that have chosen

// real function to show chosen card 
function chosencardlist(){
    showchosencart.innerHTML ="";
    carts.forEach(chosencard =>{
        showchosencart.innerHTML += `
        <tr>
                                    <td><img src="${chosencard.src}" alt="" srcset=""></td>
                                    <td>$ ${chosencard.price}</td>
                                    <td>
                                        <button class="indebtn" onclick="changeQuantity('minus',${chosencard.id})">-</button>
                                        <span>${chosencard.quantity}</span>
                                        <button class="indebtn" onclick="changeQuantity('plus',${chosencard.id})">+</button>
                                    </td>
                                    <td ><button class="removebtn" onclick="removelist(${chosencard.id})">Remove</button></td>
                                </tr>
    `
    })
    forNoItem()
}
// real function to show chosen card 

// change quantity 
function changeQuantity(condition,id){
    carts = carts.map(addquantity=>{
        let quantity = addquantity.quantity;
        if(addquantity.id===id){
            if(condition === "plus"){
                quantity++
            }else if(condition === "minus"){
                quantity--
            }
        }
        return({
            ...addquantity,
            quantity
        })
       
    }).filter(addquantity=>addquantity.quantity>0)
    //use filter to show only quantity that more than 0
    updatedata()
}
// change quantity 

//show total price and quantity
function priceAndquantity(){
    let totalprice = 0;
    let totalquantity = 0;
    let price = "$000.00"
    carts.forEach(pAndq=>{
        totalprice += pAndq.price*pAndq.quantity;
        totalquantity += pAndq.quantity;
    });
    document.querySelector(".shopcartcontainer span").innerText = `${totalquantity}`;
    document.querySelector(".total-price span").innerText = `$${totalprice.toFixed(2)}`;
}
//show total price and quantity

// remove list using filter 
function removelist(id){
    carts = carts.filter(filterlist => filterlist.id !== id)
    updatedata()
}
// remove list using filter 

// to show no data message 
function forNoItem(){
   let noItem = document.querySelector(".noitem");
   if(carts.length ===0){
    noItem.style.display = "block";
   }else{
    noItem.style.display = "none";
   }
}
// to show no data message 


function updatedata(){
    chosencardlist()
    priceAndquantity()
    localStorage.setItem("data",JSON.stringify(carts))
}
updatedata()