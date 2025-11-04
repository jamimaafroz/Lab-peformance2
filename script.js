const heroSection = document.querySelector(".hero-section");
const searchInput = document.getElementById("search-input");
const searchButton = document.querySelector(".search-button");
const productContainer = document.getElementById("productContainer");
const loading = document.querySelector(".loading");

let productsData = [];

fetch("products.json")
  .then((response) => {
    if (!response.ok) throw new Error("Failed to fetch JSON data");
    return response.json();
  })
  .then((data) => {
    productsData = data.data;
    renderProducts(productsData); 
  })
  .catch((error) => console.error("Error loading products:", error));

function renderProducts(products) {
  productContainer.innerHTML = ""; 
  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.dataset.id = index;
    card.dataset.name = product.phone_name;
    card.dataset.brand = product.brand;

    card.innerHTML = `
      <img src="${product.image}" alt="${product.phone_name}">
      <h3>${product.phone_name}</h3>
      <p class="brand">${product.brand}</p>
      <button class="details-button" data-id="${index}">View Details</button>
    `;
    productContainer.appendChild(card);
  });
}

searchButton.addEventListener("click", () => {
  const text = searchInput.value.toLowerCase().trim();

  if (text === "") {
    heroSection.style.display = "block";
    renderProducts(productsData);
    return;
  }

  heroSection.style.display = "none";
  loading.style.display = "block";

  setTimeout(() => {
    const filtered = productsData.filter(
      (product) =>
        product.phone_name.toLowerCase().includes(text) ||
        product.brand.toLowerCase().includes(text)
    );
    renderProducts(filtered);
    loading.style.display = "none";
  }, 300);
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("details-button")) {
    const id = parseInt(e.target.dataset.id);
    const product = productsData[id];
    if (product) {
      showProductDetails(product);
    } else {
      alert("Product details not found!");
    }
  }
});

function showProductDetails(product) {
  const details = `
Brand: ${product.brand}
Name: ${product.phone_name}
Slug: ${product.slug}
Image URL: ${product.image}
  `;
  alert(details);
}
