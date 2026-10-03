// Challenge 2: Top K Popular Products


// Calculate how popular a product is
function calculatePopularity(product) {
    return product.rating * product.reviews;
}


// Get the top K products
function getTopPopularProducts(products, k) {

    const sortedProducts = [...products].sort(
        (a, b) => calculatePopularity(b) - calculatePopularity(a)
    );

    return sortedProducts.slice(0, k);
}


// Render popular products
function renderPopularProducts(products, container) {

    container.innerHTML = "";

    if (products.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <h3>No popular products found</h3>
                <p>There are currently no products to display.</p>
            </div>
        `;

        return;
    }


    products.forEach((product, index) => {

        const popularity = calculatePopularity(product);

        const card = document.createElement("div");

        card.className = "product-card popular-card";

        card.innerHTML = `
            
            <div class="product-rank">
                #${index + 1}
            </div>

            <div class="product-category">
                ${product.category || "Product"}
            </div>

            <h3 class="product-name">
                ${product.name}
            </h3>

            <p class="product-brand">
                ${product.brand || "Unknown Brand"}
            </p>

            <p class="product-price">
                ₹${Number(product.price).toLocaleString("en-IN")}
            </p>

            <div class="product-rating">
                ⭐ ${product.rating}
                <span>
                    (${Number(product.reviews).toLocaleString()} reviews)
                </span>
            </div>

            <div class="popularity-score">
                Popularity Score:
                <strong>${popularity.toLocaleString()}</strong>
            </div>

        `;

        container.appendChild(card);
    });
}