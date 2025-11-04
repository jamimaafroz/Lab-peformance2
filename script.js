const heroSection = document.querySelector(".hero-section");
const searchInput = document.getElementById("search-input");
const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", () => {
  const text = searchInput.value.toLowerCase().trim();
   heroSection.style.display = "none";
     const products = document.querySelectorAll(".product-card");
     products.forEach((product) => {
     const name = product.querySelector("h3").textContent.toLowerCase();

     if (name.includes(text)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
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
