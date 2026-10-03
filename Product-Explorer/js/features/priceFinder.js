/*
 * Challenge 01 — Smart Price Finder
 *
 * Basic approach:
 *   Scan every product and calculate the distance from the target.
 *
 * Optimized approach:
 *   1. Sort products by price once.
 *   2. Use binary search to locate the insertion point of the target.
 *   3. Expand around that point to find nearby prices.
 *
 * The sorted array is cached so repeated searches do not sort again.
 */

let productsByPrice = [];

function initializePriceFinder(productList) {
  productsByPrice = [...productList].sort(
    (a, b) => Number(a.price) - Number(b.price)
  );
}

function binarySearchInsertionPoint(target) {
  let left = 0;
  let right = productsByPrice.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (Number(productsByPrice[mid].price) < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

function findClosestProducts(target, limit = 3) {
  if (!productsByPrice.length) return [];

  const index = binarySearchInsertionPoint(target);
  let left = index - 1;
  let right = index;
  const result = [];

  while (result.length < limit && (left >= 0 || right < productsByPrice.length)) {
    const leftProduct = left >= 0 ? productsByPrice[left] : null;
    const rightProduct = right < productsByPrice.length ? productsByPrice[right] : null;

    if (!leftProduct) {
      result.push(rightProduct);
      right++;
      continue;
    }

    if (!rightProduct) {
      result.push(leftProduct);
      left--;
      continue;
    }

    const leftDistance = Math.abs(Number(leftProduct.price) - target);
    const rightDistance = Math.abs(Number(rightProduct.price) - target);

    if (leftDistance <= rightDistance) {
      result.push(leftProduct);
      left--;
    } else {
      result.push(rightProduct);
      right++;
    }
  }

  return result;
}

function findProductsInRange(minPrice, maxPrice) {
  return productsByPrice.filter(product => {
    const price = Number(product.price);
    return price >= minPrice && price <= maxPrice;
  });
}

/*
 * Basic solution kept for learning/comparison.
 * Complexity: O(n)
 */
function findClosestProductsBasic(productList, target, limit = 3) {
  return [...productList]
    .map(product => ({
      product,
      distance: Math.abs(Number(product.price) - target)
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
    .map(item => item.product);
}
