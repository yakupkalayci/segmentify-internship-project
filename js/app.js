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
      768: {
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
            : undefined
        }
    </div>
</div>`
  });
})