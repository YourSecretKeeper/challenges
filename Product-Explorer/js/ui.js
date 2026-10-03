function formatPrice(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

function renderProducts(productList, title = "Closest Products") {
  const results = document.getElementById("results");
  const emptyState = document.getElementById("empty-state");
  const resultCount = document.getElementById("result-count");
  const resultsTitle = document.getElementById("results-title");

  resultsTitle.textContent = title;
  resultCount.textContent = `${productList.length} result${productList.length === 1 ? "" : "s"}`;

  if (!productList.length) {
    results.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  results.innerHTML = productList.map(product => `
    <article class="product-card">
      <div class="product-image">Product image</div>
      <div class="product-body">
        <p class="brand">${escapeHtml(product.brand ?? "Unknown brand")}</p>
        <h3 class="product-name">${escapeHtml(product.name ?? "Unnamed product")}</h3>
        <p class="price">${formatPrice(Number(product.price) || 0)}</p>
        <p class="rating">★ ${Number(product.rating ?? 0).toFixed(1)} rating</p>
        <button class="view-btn" data-product-id="${product.id}">
          View Product
        </button>
      </div>
    </article>
  `).join("");
}

function showProduct(product) {
  const modal = document.getElementById("product-modal");
  const content = document.getElementById("modal-content");

  content.innerHTML = `
    <p class="eyebrow">${escapeHtml(product.brand ?? "Product")}</p>
    <h2>${escapeHtml(product.name ?? "Unnamed product")}</h2>
    <p class="price">${formatPrice(Number(product.price) || 0)}</p>
    <p>Rating: ★ ${Number(product.rating ?? 0).toFixed(1)}</p>
  `;

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeProductModal() {
  const modal = document.getElementById("product-modal");
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
