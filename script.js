const productDetails = {
    1: {
        name: "Modern Laptop",
        description: "A high-performance laptop with 16GB RAM, 512GB SSD, and a stunning 4K display. Ideal for coding and design work.",
        specs: "15-inch, Intel i7, 1.8kg"
    },
    2: {
        name: "Espresso Machine",
        description: "Professional-grade espresso machine with a built-in grinder and steam wand. Brews perfect shots every time.",
        specs: "15-bar pump, Stainless Steel, 1.7L Tank"
    },
    3: {
        name: "Organic Cotton Tee",
        description: "Soft, breathable t-shirt made from 100% certified organic cotton. Available in multiple colors and sizes.",
        specs: "180 gsm fabric, Crew Neck, Eco-friendly dye"
    },
    4: {
        name: "Wireless Headphones",
        description: "Industry-leading noise cancellation headphones with a 30-hour battery life. Perfect for travel and focus.",
        specs: "Bluetooth 5.0, Active Noise Cancelling, USB-C Charging"
    },
    5: {
        name: "High-Power Blender",
        description: "A kitchen essential with a powerful motor, ideal for smoothies, soups, and crushing ice in seconds.",
        specs: "1500W Motor, 64 oz Jar, Pulse Function"
    },
    6: {
        name: "Professional Notebook",
        description: "A sleek A5 notebook with lined pages and a durable hard cover. Perfect for notes, journaling, or lab reports!",
        specs: "200 Pages, A5 Size, Lay-flat binding"
    }
};

const searchInput = document.getElementById('search-input');
const productCards = document.querySelectorAll('.product-card');
const detailButtons = document.querySelectorAll('.details-button');

let cartItemCount = 0;

if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();

            if (productName.includes(searchTerm)) {
                card.style.display = 'grid';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

detailButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productId = e.target.getAttribute('data-id');
        const item = productDetails[productId];

        if (item) {
            const message = 
                `--- ${item.name} Details ---
                
                Description: ${item.description}
                
                Key Specs: ${item.specs}
                
                Product ID: ${productId}`;

            alert(message);
        } else {
            alert("Sorry, details for this product are currently unavailable.");
        }
    });
});

function updateCartDisplay() {
    const cartDisplay = document.getElementById('cart-count');
    if (cartDisplay) {
        cartDisplay.textContent = cartItemCount;
    }
    
    console.log(`Cart updated! Total items: ${cartItemCount}`);
}

detailButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation(); 
        
        cartItemCount += 1;
        updateCartDisplay();
        
        e.target.textContent = 'Added!';
        setTimeout(() => {
            e.target.textContent = 'View Details';
        }, 500);
    });
});