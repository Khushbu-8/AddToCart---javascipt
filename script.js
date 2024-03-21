const product = [
    {id : 0,name : "Garden Wall Light",price : 880, qnty : 1,  image : "assets/img/image_1.webp" },
    {id : 1,name : "Cristal Ball Light",price : 650, qnty : 1,  image : "assets/img/image_2.webp" },
    {id : 2,name : "Solar Dack",price : 940, qnty : 1,  image : "assets/img/image_3.webp" },
    {id : 3,name : "Outdoor Light",price : 850, qnty : 1,  image : "assets/img/image_4.webp" },
    {id : 4,name : "Henging Light",price : 990, qnty : 1,  image : "assets/img/image_5.webp" },
    {id : 5,name : "Deck Outdoor Light",price : 650, qnty : 1,  image : "assets/img/image_6.webp" },
    {id : 6,name : "Vibrant Light",price : 570, qnty : 1,  image : "assets/img/image_7.webp" },
    {id : 7,name : "Wireless Light",price : 890, qnty : 1,  image : "assets/img/image_8.webp" },
];


// product View

const viewProduct = () => {
    var tbl = "";
    
    product.map((val) =>{
        return (
            tbl += `
            <div class="col-3 p-3">
            <div class="card">
               <div class="img">
               <p style = "display : none;">${val.id}</p>
                <img src="${val.image}" class="img-fluid" alt="">
               </div>
               <h3>${val.name}</h3>
               <span>RS.${val.price}</span>
               <button onclick ="addcart(${val.id})">
                <i class="fa-solid fa-cart-shopping"></i>
               </button>
            </div>
        </div>
        `
        )
    })
    document.getElementById("allItems").innerHTML = tbl;
   

}
viewProduct();


// ADD to cart ....

let cart = [];
const addcart = (id) =>{

    // if product Allready Add...

    let allCart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [] ; 
    let duplicate = allCart.find((val)=>{
        return val.id == id;
    })
    if(duplicate){
        alert("Allready Addend in Cart...");
        return false;
    }



    if (localStorage.getItem("cart") === null || localStorage.getItem("cart") === undefined) {
        product.map((item)=>{
            if(item.id == id){
               cart.push(item);
           }
       })
        localStorage.setItem("cart", JSON.stringify(cart));

    }else {
        let old = JSON.parse(localStorage.getItem("cart"));
        product.map((item)=>{
            if(item.id == id){
               old.push(item);
           }
       })
        localStorage.setItem("cart", JSON.stringify(old));

    }
      alert("Product added on cart.."); 
    viewProduct();
    viewcart();
}

// View Cart...

const viewcart = () =>{
    let allcart = JSON.parse(localStorage.getItem("cart"));
    let tbl = "";
    let sum = 0;
    allcart.map((val) =>{
        sum = sum + (val.price * val.qnty);
        return (
            tbl += `
            <div class="col-12 d-flex justify-content-center align-items-center"  style = " border-top: 1px solid #333333; padding : 10px 0">
            <div class="col-4">
            <div style = "display : none;">${val.id}</div>
                <div class="img">
                    <img src="${val.image} " alt="">
                </div>
            </div>
            <div class="col-4 d-flex justify-content-center" >
                <div class="title">
                    <h2>${val.name}</h2>
                    <p>RS.${val.price}</p>
                    <span ><input id="id_${val.id}" value = "${val.qnty}" onchange="EdetCart(${val.id})" style = "width : 50%; padding-left : 10px;" type = "number"  /></span>
                     </div>
            </div>
            <div class="col-4">
                <div class="iconD d-flex justify-content-center">
                    <p>RS.${val.price * val.qnty} </p>
                    <i onclick = "DeleteItem(${val.id})" class="fa-solid fa-trash"></i>
                   </div>
            </div>
        </div>
                    `
        )
    })
    document.getElementById("cartItem").innerHTML = tbl;
    document.getElementById("Ftotle").innerHTML = `RS.${sum}`;
   
// cart counter...

    let count = allcart.length;
    document.getElementById("counter").innerHTML = count;
    viewProduct();

}
viewcart();

// Delet Card.... 

const DeleteItem = (id) => {
    let allCarts = JSON.parse(localStorage.getItem("cart"));

    let deletI = allCarts.filter((val)=>{
       return val.id != id;

    })
    localStorage.setItem("cart" , JSON.stringify(deletI))

    alert("Items Deleted...");
    viewcart();
}

// Edit Cart Qnantity...

 const EdetCart = (id) => {
    let qnty = document.getElementById(`id_${id}`).value;
    let allCart = JSON.parse(localStorage.getItem("cart"));
    allCart.map((item)=>{
        if(item.id == id){
            item.qnty = qnty
        }
    })
    localStorage.setItem("cart",JSON.stringify(allCart));
    alert("Update Successfully...");
    viewcart();
 }





