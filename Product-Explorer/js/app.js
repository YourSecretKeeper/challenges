const MAX_RESULTS = 3;

document.addEventListener("DOMContentLoaded", () => {
  if (!Array.isArray(products)) {
    console.error("Expected `products` array from data.js");
    return;
  }

  initializePriceFinder(products);
  renderProducts(findClosestProducts(Number(products[0]?.price ?? 0), MAX_RESULTS));

  document.getElementById("search-btn").addEventListener("click", handleTargetSearch);
  document.getElementById("range-btn").addEventListener("click", handleRangeSearch);

  document.getElementById("price-input").addEventListener("keydown", event => {
    if (event.key === "Enter") handleTargetSearch();
  });

  document.getElementById("results").addEventListener("click", event => {
    const button = event.target.closest("[data-product-id]");
    if (!button) return;

    const product = products.find(item => String(item.id) === button.dataset.productId);
    if (product) showProduct(product);
  });

  document.querySelectorAll("[data-close-modal]").forEach(element => {
    element.addEventListener("click", closeProductModal);
  });
});

function handleTargetSearch() {
  const input = document.getElementById("price-input");
  const target = Number(input.value);

  if (!Number.isFinite(target) || target < 0) {
    renderProducts([], "Closest Products");
    return;
  }

  const results = findClosestProducts(target, MAX_RESULTS);
  renderProducts(results, `Closest to ${formatPrice(target)}`);
}

function handleRangeSearch() {
  const minInput = document.getElementById("min-price");
  const maxInput = document.getElementById("max-price");

  const min = Number(minInput.value);
  const max = Number(maxInput.value);

  if (!Number.isFinite(min) || !Number.isFinite(max) || min < 0 || max < min) {
    renderProducts([], "Products in Range");
    return;
  }

  const results = findProductsInRange(min, max);
  renderProducts(
    results,
    `${formatPrice(min)} – ${formatPrice(max)}`
  );
}
