const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  autoHeight: true,
  slidesPerView: 4,

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // Responsive Breakpoints
  breakpoints: {
    250: {
       slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
    },
    710: {
      slidesPerView: 3,
    },
    1400: {
      slidesPerView: 4,
    },
  },
});

const categories = document.querySelector("#categories");
const productsContainer = document.querySelector(".swiper-wrapper");


async function getData() {
  const response = await fetch("product-list.json");
  const data = await response.json();
  const userCategories = await data.responses[0][0].params.userCategories;
  const products = await data.responses[0][0].params.recommendedProducts;
  return {userCategories, products}
}

getData()
.then(response => {
  const {products ,userCategories} = response;

  products["Size Özel"].forEach(product => {
    productsContainer.innerHTML +=  `<div class="swiper-slide">
    <div class="product">
        <div class="productImg">
            <img src=${
              product.image
            } width="200px" height="200px" loading="lazy">
        </div>
        <h3 class="productTitle">${
          product.name.length > 51
            ? product.name.slice(
                0,
                product.name.length - (product.name.length - 51)
              ) + "..."
            : product.name
        }</h3>
        <p class="price">${product.priceText}</p>
        ${
          product.params.shippingFee === "FREE"
            ? `<div class="shipping">
            <div id="icon">
              <i class="fa-solid fa-truck"></i>
            </div>
            <div>
              <p>Ücretsiz Kargo</p>
            </div>
          </div>`
            : ""
        }
        <div class="addToBasket">
        <button>Sepete Ekle</button>
      </div>
    </div>
</div>`
  });
  const addToBasket = document.querySelector(".addToBasket>button");
  addToBasket.addEventListener("click", () => {
    var x = document.getElementById("popup");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  })
})
.catch((err) => console.error(err));

categories.addEventListener("click", e => {

  if(e.target.id !== "categories") {
    let current = document.querySelector(".active");
    current && current.classList.remove("active");
    e.target.classList.add("active");


  getData()
  .then(response => {

    let { products, userCategories } = response;
    productsContainer.innerHTML = "";
    changeTabTitle(e.target.textContent, userCategories);

    function getKey(categoryName) {
      let value = categoryName;
      Object.keys(products).forEach((key) => {
        if (key.includes(">")) {
          let index = key.indexOf(">");
          if (key.slice(index + 2) == categoryName) {
            value = key;
          }
        }
      });
      return value;
    }

    products[`${getKey(e.target.textContent)}`].forEach(product => {
      productsContainer.innerHTML += `
          <div class="swiper-slide">
          <div class="product">
              <div class="productImg">
                  <img src=${
                    product.image
                  } width="200px" height="200px" loading="lazy">
              </div>
              <h3 class="productTitle">${
                product.name.length > 51
                  ? product.name.slice(
                      0,
                      product.name.length - (product.name.length - 51)
                    ) + "..."
                  : product.name
              }</h3>
              <p class="price">${product.priceText}</p>
              ${
                product.params.shippingFee === "FREE"
                  ? `<div class="shipping">
                  <div id="icon">
                    <i class="fa-solid fa-truck"></i>
                  </div>
                  <div>
                    <p>Ücretsiz Kargo</p>
                  </div>
                </div>`
                  : ""
              }
              <div class="addToBasket">
              <button>Sepete Ekle</button>
            </div>
          </div>
    </div>
          `;
    });
  })
  .catch(err => console.error(err));
}})

function changeTabTitle(selected, categories) {
  const tabDOM = document.querySelector("#header>h1");

  categories.forEach((category) => {
    if (category.includes(">")) {
      let index = category.indexOf(">");
      if (category.slice(index + 2) == selected) {
        tabDOM.innerHTML = category;
      }
    } else {
      tabDOM.innerHTML = "Sizin için Seçtiklerimiz";
    }
  });
}