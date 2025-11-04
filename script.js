const heroSection = document.querySelector(".hero-section");
const searchInput = document.getElementById("search-input");
const searchButton = document.querySelector(".search-button");


searchButton.addEventListener("click", () => {
  const text = searchInput.value.toLowerCase().trim();
  const products = document.querySelectorAll(".product-card");
  const loading = document.querySelector(".loading");

  if (text === "") {
    loading.style.display = "none";
    heroSection.style.display = "block";
    products.forEach(product => product.style.display = "block");
    return;
  }

  loading.style.display = "block";
  heroSection.style.display = "none";

  setTimeout(() => {
    products.forEach(product => {
      const name = product.querySelector("h3").textContent.toLowerCase();
      product.style.display = name.includes(text) ? "block" : "none";
    });
    loading.style.display = "none";
  }, 500);
});


let productsData = {};

fetch("products.json")

  .then((response) => {
    if (!response.ok) throw new Error("Failed to fetch JSON data");
    return response.json();
  })
  .then((data) => {
    productsData = data;
  })
  .catch((error) => console.error("Error loading products:", error));


document.addEventListener("click", (e) => {
  if (e.target.classList.contains("details-button")) {
    const productId = e.target.dataset.id;

    if (productsData[productId]) {
      const item = productsData[productId];
      showProductDetails(item);
    } else {
      alert("Product details not found!");
    }
  }
});

function showProductDetails(product) {
  const details = `
    ${product.name}
    ${product.description}
    
    Specs: ${product.specs}
  `;
  alert(details);
}
