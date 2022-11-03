/*
Navigation
*/

//

const navOpen = document.querySelector(".nav__hamburger");
const navClose = document.querySelector(".close__toggle");
const menu = document.querySelector(".nav__menu");

navOpen.addEventListener("click", () => {
  const navLeft = menu.getBoundingClientRect().left;
  if (navLeft < 0) {
    menu.style.left = "0";
    document.body.classList.add("active");
  } else {
    menu.style.left = "-40rem";
    document.body.classList.remove("active");
  }
});

navClose.addEventListener("click", () => {
  const navLeft = menu.getBoundingClientRect().left;
  if (navLeft > 0) {
    menu.style.left = "0";
  } else {
    menu.style.left = "-40rem";
    document.body.classList.remove("active");
  }
});

// Smooth Scroll

const navBar = document.querySelector(".navigation");
const scrollLinks = document.querySelectorAll(".scroll-link");

Array.from(scrollLinks).forEach(link => {
  link.addEventListener("click", e => {
    // Prevent Default
    e.preventDefault();

    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const navHeight = navBar.getBoundingClientRect().height;
    const fixNav = navBar.classList.contains("fix__nav");
    let position = element.offsetTop - navHeight;

    if (!fixNav) {
      position = position - navHeight;
    }

    window.scrollTo({
      left: "0",
      top: position,
    });

    menu.style.left = "-40rem";
    document.body.classList.remove("active");
  });
});

// FixNav

window.addEventListener("scroll", () => {
  const navHeight = navBar.getBoundingClientRect().height;
  const scrollHeight = window.pageYOffset;

  if (scrollHeight > navHeight) {
    navBar.classList.add("fix__nav");
  } else {
    navBar.classList.remove("fix__nav");
  }
});











// variables
const openCart = document.querySelector('.cart__icon')
const closeCart = document.querySelector('.close__cart')
const cartContent = document.querySelector('.cart__centent')
const productDom = document.querySelector('.featured__center')
const arriavlDom = document.querySelector('.arrival__center')
const cartOverlay = document.querySelector('.cart__overlay')
const cartDom = document.querySelector('.cart')
const itemsTotal = document.querySelector('.item__total');
const cartTotal = document.querySelector('.cart__total');
const clearCart = document.querySelector(".clear__cart")

// cart
let cart = [];
let buttonDom = [];


// ui 

class UI {
  // displayProudcts 

  displayProudcts(obj) {
    let result = "";
    let result2 = "";

    obj.forEach(({ image, title, id, price }) => {

      if(id <= 4)
      {

        result += `
        <div class="product">
        <div class="img__container">
          <img src=${image} alt="" />
        </div>
        <div class="product__bottom">
         
          <div class="price">$${price}</div>
  
          <h3>${title}</h3>
          <button class="addToCart"  data-id=${id} >Add To Cart</button>
        </div>
      </div>
  
        `
      }

      if(id>4)
      {
        result2 += `
        <div class="product">
        <div class="img__container">
          <img src=${image} alt="" />
        </div>
        <div class="product__bottom">
    
          <div class="price">$${price}</div>
  
          <h3>${title}</h3>
          <button class="addToCart"  data-id=${id} >Add To Cart</button>
        </div>
      </div>
  
        `
      }
      
    
     

   



    });
     arriavlDom.innerHTML=result
    productDom.innerHTML = result2
   


  }
  // getButtons 

  getButtons() {
    const buttons = [...document.querySelectorAll('.addToCart')];
    buttonDom = buttons;
    buttons.forEach(button => {
      const id = button.dataset.id;
      const inCart = cart.find(item => item.id === id , 10);
      if (inCart) {
        button.innerText = "In Cart";
        button.disabled = true;
      }
      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.target.innerText = "In Cart";
        e.target.disabled = true;
        // get product from products
        const cartItem = { ...Storage.getProudcts(id), amount: 1 }
        // add product to cart
        cart = [...cart, cartItem]
        // store the product in local storage 
        Storage.saveCart(cart);
        // setItems 
         this.setItemsValue(cart);
        // display the item in cart
        this.addToCart(cartItem);



      })

    });
  }
  // setItemsValue 

  setItemsValue(cart) {
    let tempTotal = 0;
    let itemTotal = 0;
    cart.map(item => {
      tempTotal += item.price * item.amount;
      itemTotal += item.amount
    })
    itemsTotal.innerText = itemTotal;
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2))

  }
  // addToCart 

  addToCart({ title, price, id, image }) {
    let div = document.createElement("div")
    div.classList.add("cart__item")
    div.innerHTML = `
    <img src=${image} alt="">
    <div>
      <h3>${title}</h3>
      <h3 class="price">$${price}</h3>
    </div>
    <div>
      <span class="increase" data-id=${id}>
        <svg>
          <use xlink:href="./images/sprite.svg#icon-angle-up"></use>
        </svg>
      </span>
      <p class="item__amount">1</p>
      <span class="decrease" data-id=${id}>
        <svg>
          <use xlink:href="./images/sprite.svg#icon-angle-down"></use>
        </svg>
      </span>
    </div>
    
    <div>
    <span class="remove__item" data-id=${id}>
      <svg>
        <use xlink:href="./images/sprite.svg#icon-trash"></use>
      </svg>
    </span>
  </div>`
    cartContent.appendChild(div)
  }
// show 

  show() {
    cartDom.classList.add("show");
    cartOverlay.classList.add("show");
  }
  // hide 

  hide() {
    cartDom.classList.remove("show");
    cartOverlay.classList.remove("show");
  }
  // populate 

  populate(cart) {
    cart.forEach(item => this.addToCart(item));
  }
  // setApp 

  setApp() {
    cart = Storage.getCart();
    this.setItemsValue(cart);
    this.populate(cart);
    openCart.addEventListener("click", this.show)
    closeCart.addEventListener("click", this.hide)


  }
  // cartLogic 

  cartLogic() {
    // Clear Cart
    clearCart.addEventListener("click", () => {
      this.clearCart();
      this.hide();
    });

    // Cart Functionality
    cartContent.addEventListener("click", e => {
      const target = e.target.closest("span");
      const targetElement = target.classList.contains("remove__item");
      if (!target) return;

      if (targetElement) {
        const id = parseInt(target.dataset.id);
        this.removeItem(id);
        cartContent.removeChild(target.parentElement.parentElement);
      } else if (target.classList.contains("increase")) {
        const id = parseInt(target.dataset.id, 10);
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount++;
        Storage.saveCart(cart);
        this. setItemsValue(cart);
        target.nextElementSibling.innerText = tempItem.amount;
      } else if (target.classList.contains("decrease")) {
        const id = parseInt(target.dataset.id, 10);
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount--;

        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this. setItemsValue(cart);
          target.previousElementSibling.innerText = tempItem.amount;
        } else {
          this.removeItem(id);
          cartContent.removeChild(target.parentElement.parentElement);
        }
      }
    });
  }
  // clearCart 

  clearCart() {
    const cartItems = cart.map(item => item.id);
    cartItems.forEach(id => this.removeItem(id));

    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
  }
  // removeItem 

  removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    this.setItemsValue(cart);
    Storage.saveCart(cart);

    let button = this.singleButton(id);
    button.disabled = false;
    button.innerText = "Add to Cart";
  }
  // singleButton 

  singleButton(id) {
    return buttonDom.find(button => parseInt(button.dataset.id) === id);
  }
}


// products

class Products {

  async getProducts() {
    try {
      const results = await fetch('products.json')
      const data = await results.json()
      let product = data.items;
      return product
    } catch (error) {
      console.log(err);
    }
  }
}

// storage 

class Storage {
  static saveProduct(obj) {
    localStorage.setItem("proudcts", JSON.stringify(obj))
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  static getProudcts(id) {
    const proudcts = JSON.parse(localStorage.getItem("proudcts"));
    return proudcts.find(item => item.id === parseInt(id))

  }
  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const products = new Products();
  const ui = new UI();
  ui.setApp()
  const productObje = await products.getProducts();
  ui.displayProudcts(productObje);
  Storage.saveProduct(productObje);
  ui.getButtons();
  ui.cartLogic()

})

