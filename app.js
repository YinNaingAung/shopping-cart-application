let partone = document.querySelector(".partone");
let showChosenCart = document.querySelector(".showchosencart");


products.forEach(productCard1 =>{
    console.log(productCard1)
    partone.innerHTML += `
                <div>
                         <div class="card1">
                                <img class="latopphoto" src="${productCard1.src}" alt="" srcset="">
                                <div class="cardinfo">
                                    <h2>${productCard1.name}</h2>
                                    <h2>Price - $ ${productCard1.price}</h2>
                                    <button onclick="addtocart(${productCard1.id})">Add to cart</button>
                                </div>
                                
                        </div>
                    </div>
    `
})

let carts = JSON.parse(localStorage.getItem("data"))||[];
function addtocart(id){
    if(carts.some(includedlist=>includedlist.id ===id)){
       changeQuantity("plus",id )
    }else{
        let selectedCart = products.find(list => list.id === id);
        carts.push({ 
        ...selectedCart,
        quantity :1,
    })
    }
    console.log(carts)
    savedata()
}

function showcartlist(){
    showChosenCart.innerHTML="";
     carts.forEach(productCard2=>{
        showChosenCart.innerHTML +=`
            <tr>
                                    <td><img src="${productCard2.src}" alt="" srcset=""></td>
                                    <td>$ ${productCard2.price}</td>
                                    <td>
                                        <button class="indebtn" onclick="changeQuantity('minus',${productCard2.id})">-</button>
                                        <span>${productCard2.quantity}</span>
                                        <button class="indebtn" onclick="changeQuantity('plus',${productCard2.id})">+</button>
                                    </td>
                                    <td ><button class="removebtn" onclick="removelist(${productCard2.id})">Remove</button></td>
                                </tr>
        `
    })
    nonelist()
}

// change quantity 
function changeQuantity(condition,id){
    carts =  carts.map(forquantity =>{
            let quantity = forquantity.quantity;
            if(forquantity.id===id){
                 if(condition === 'minus'){
                    quantity--
                }else if(condition ==='plus'){
                    quantity++
                }
            }
            return({
                    ...forquantity,
                      quantity
                })
    } );
    console.log(carts)
    savedata()  
}
//change quantity

// total Price and Quantity 

function PriceAndQuantity(){
    let totalprice = 0;
    let totalquantity = 0;
    carts.map(pricequantity =>{
        totalprice += pricequantity.price * pricequantity.quantity;
        console.log(totalprice)
        totalquantity += pricequantity.quantity;

    })
    console.log(carts)
    document.querySelector(".total-price span").innerText =`$ ${totalprice}`;
    document.querySelector(".shopcartcontainer button").innerText =`${totalquantity}`
}
//total price and quantity

// Remove list
function removelist(id){
    carts = carts.filter(list=> list.id !== id);
    savedata()
}
// remove list 

// to show info when nothing data 
function nonelist(){
    if(!showChosenCart.innerHTML){
        document.querySelector(".noitem").innerHTML = "<p>no data in here</p>"
    }else{
          document.querySelector(".noitem").innerHTML = ""
    }
}
// to show info when nothing data 

function savedata(){
    showcartlist();
    PriceAndQuantity();
    localStorage.setItem("data",JSON.stringify(carts));
}
savedata()