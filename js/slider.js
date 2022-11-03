let prev = document.getElementById("prev");
let next = document.getElementById("next");
let containerSlider = document.getElementById("containerSlider")

const imgArr = [
    `
    <div class="slider">
      <div class="image__holder">
        <img src="images/pic6.png" alt="" />
      </div>
      <div class="cart__details">
        <h1>Polar Skate Co Devil T Shirt</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Doloremque eius, laborum sunt dolorem
          necessitatibus incidunt aut ducimus, quis, veritatis
          cum dolore tempora? Corporis, nostrum alias.
        </p>
        <div class="colors">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="btn__group">
          <button>Add To Cart</button>
          <button>$75</button>
        </div>
      </div>
    </div>`,
    `
    <div class="slider">
      <div class="image__holder">
        <img src="images/pic7.png" alt="" />
      </div>
      <div class="cart__details">
        <h1>Polar Skate Co Devil T Shirt</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Doloremque eius, laborum sunt dolorem
        
        </p>
        <div class="colors">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="btn__group">
          <button>Add To Cart</button>
          <button>$75</button>
        </div>
      </div>
    </div>`,
    `
    <div class="slider">
      <div class="image__holder">
        <img src="images/pic8.png" alt="" />
      </div>
      <div class="cart__details">
        <h1>Polar Skate Co Devil T Shirt</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Doloremque eius, laborum sunt dolorem
          necessitatibus incidunt aut ducimus, quis, veritatis
          cum dolore tempora? Corporis, nostrum alias.
        </p>
        <div class="colors">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="btn__group">
          <button>Add To Cart</button>
          <button>$75</button>
        </div>
      </div>
    </div>`,
    `
    <div class="slider">
      <div class="image__holder">
        <img src="images/pic9.png" alt="" />
      </div>
      <div class="cart__details">
        <h1>Polar Skate Co Devil T Shirt</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing
          cum dolore tempora? Corporis, nostrum alias.
        </p>
        <div class="colors">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="btn__group">
          <button>Add To Cart</button>
          <button>$75</button>
        </div>
      </div>
    </div>`,
    
]

// اظهار العنثر اول مره ف الصفحه
let i = 0;
containerSlider.innerHTML += imgArr[i]
prev.setAttribute("disabled", "")

/* click with next change img and num of p */
next.addEventListener("click", () => {
    prev.removeAttribute("disabled")
    i++;
    containerSlider.innerHTML = imgArr[i]
    if (i + 1 == imgArr.length) {
        next.setAttribute("disabled", "")
    }

})



/* click with prev change img and num of p */

prev.addEventListener("click", () => {
    next.removeAttribute("disabled")
    i--;
    containerSlider.innerHTML = imgArr[i]
    if (i + 1 == 1) {
        prev.setAttribute("disabled", "")
    }
    parentnum.getElementsByClassName("active-num")[0].classList.remove("active-num")
    parentnum.getElementsByTagName("button")[i].classList.add("active-num")
})

/* click with num change img and num of p */

const mynum = document.querySelectorAll(".mynum")
const parentnum = document.getElementsByClassName("numbers")[0]
mynum.forEach((element, index) => {
    element.addEventListener("click", () => {
        containerSlider.innerHTML = imgArr[index]
        i = index;
        if (index == imgArr.length - 1) {
            next.setAttribute("disabled", "")
            prev.removeAttribute("disabled")
        }

        else if (index == 0) {
            prev.setAttribute("disabled", "")
            next.removeAttribute("disabled")
        }


        else
        {
            prev.removeAttribute("disabled")
            next.removeAttribute("disabled")
        }



    })


});





