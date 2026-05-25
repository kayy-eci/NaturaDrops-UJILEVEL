const apiUrl = "data/products.json";
const catalogGrid = document.getElementById("catalog-grid");
const catalogMeta = document.getElementById("catalog-meta");
const catalogEmpty = document.getElementById("catalog-empty");
const searchInput = document.getElementById("search");
const categoryContainer = document.getElementById("category");
const benefitContainer = document.getElementById("benefit");
const sortSelect = document.getElementById("sort");
const resetButton = document.getElementById("reset");

let products = [];
let activeCategory = null;

function parseQueryCategory() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category") || null;
}

function formatHarga(value) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

function formatProductCount(count) {
  return `${count} produk ditemukan`;
}

function createCard(product) {
  return `
    <a href="detail.html?id=${product.id}" class="group block h-full transform transition duration-300 hover:-translate-y-1 hover:scale-[1.02]">
      <article class="h-full bg-white rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(76,38,12,0.08)] group-hover:shadow-2xl flex flex-col">
        <div class="relative overflow-hidden bg-[#F6EBDD]">
          <img src="${product.image}" alt="${product.name}" class="w-full h-72 object-cover" />
          <div class="absolute top-4 left-4 flex flex-wrap gap-2">
            ${(() => {
              let badgesHTML = "";
              product.badges.forEach((badge) => {
                badgesHTML += `<span class="px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.18em] font-semibold bg-[#3D1F0D]/10 text-[#3D1F0D]">${badge}</span>`;
              });
              return badgesHTML;
            })()}
          </div>
        </div>
        <div class="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div class="text-xs uppercase tracking-[0.28em] text-[#7B3F1A] mb-3">${product.category}</div>
            <h2 class="font-serif text-2xl text-[#3D1F0D] mb-3">${product.name}</h2>
            <p class="text-sm text-[#3D1F0D]/70 mb-6">${product.short}</p>
          </div>
          <div class="flex items-center justify-between gap-4 text-[#3D1F0D]">
            <span class="font-serif text-xl">${formatHarga(product.price)}</span>
            <span class="text-sm text-[#3D1F0D]/60">${product.volume}</span>
          </div>
        </div>
      </article>
    </a>
  `;
}

function renderProducts(list) {
  if (!list.length) {
    catalogGrid.innerHTML = "";
    catalogEmpty.classList.remove("hidden");
    catalogMeta.textContent = formatProductCount(0);
    return;
  }

  catalogEmpty.classList.add("hidden");
  catalogMeta.textContent = formatProductCount(list.length);
  let html = "";
  list.forEach((product) => {
    html += createCard(product);
  });
  catalogGrid.innerHTML = html;
}

function getActiveFilters(container) {
  const inputs = Array.from(
    container.querySelectorAll("input[type='checkbox']:checked"),
  );
  const values = [];
  inputs.forEach((input) => {
    values.push(input.value);
  });
  return values;
}

function filterProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedCategories = getActiveFilters(categoryContainer);
  const selectedBenefits = getActiveFilters(benefitContainer);

  let filtered = products.filter((product) => {
    const matchesSearch =
      !query ||
      [product.name, product.short, product.category, product.benefit].some(
        (field) => field.toLowerCase().includes(query),
      );

    const matchesCategory =
      !selectedCategories.length ||
      selectedCategories.includes(product.category);

    const matchesBenefit =
      !selectedBenefits.length || selectedBenefits.includes(product.benefit);

    return matchesSearch && matchesCategory && matchesBenefit;
  });

  switch (sortSelect.value) {
    case "price-asc":
      filtered = filtered.slice().sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered = filtered.slice().sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered = filtered.slice().sort((a, b) => b.rating - a.rating);
      break;
    default:
      filtered = filtered.slice();
  }

  renderProducts(filtered);
}

function createCheckbox(name, value, label, checked = false) {
  return `
    <label class="flex items-center gap-2">
      <input type="checkbox" name="${name}" value="${value}" ${checked ? "checked" : ""} class="h-4 w-4 rounded border-[#D9CABB] text-[#7B3F1A] focus:ring-[#7B3F1A]" />
      <span>${label}</span>
    </label>
  `;
}

function uniqueValues(key) {
  const values = [];
  products.forEach((product) => {
    values.push(product[key]);
  });
  return [...new Set(values)].sort();
}

function renderFilterOptions() {
  const categories = uniqueValues("category");
  const benefits = uniqueValues("benefit");
  const activeCategoryParam = activeCategory;

  let categoryHtml = "";
  categories.forEach((category) => {
    categoryHtml += createCheckbox(
      "category",
      category,
      category.charAt(0).toUpperCase() + category.slice(1),
      activeCategoryParam === category,
    );
  });
  categoryContainer.innerHTML = categoryHtml;

  let benefitHtml = "";
  benefits.forEach((benefit) => {
    benefitHtml += createCheckbox(
      "benefit",
      benefit,
      benefit.charAt(0).toUpperCase() + benefit.slice(1),
    );
  });
  benefitContainer.innerHTML = benefitHtml;
}

function setupListeners() {
  searchInput.addEventListener("input", filterProducts);
  categoryContainer.addEventListener("change", filterProducts);
  benefitContainer.addEventListener("change", filterProducts);
  sortSelect.addEventListener("change", filterProducts);
  resetButton.addEventListener("click", () => {
    searchInput.value = "";
    sortSelect.value = "popular";
    categoryContainer
      .querySelectorAll("input[type='checkbox']")
      .forEach((input) => {
        input.checked = false;
      });
    benefitContainer
      .querySelectorAll("input[type='checkbox']")
      .forEach((input) => {
        input.checked = false;
      });
    if (activeCategory) {
      const categoryInput = categoryContainer.querySelector(
        `input[value="${activeCategory}"]`,
      );
      if (categoryInput) categoryInput.checked = true;
    }
    filterProducts();
  });
}

function initCatalog() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      products = data;
      activeCategory = parseQueryCategory();
      renderFilterOptions();
      setupListeners();
      filterProducts();
    })
    .catch((error) => {
      console.error("Gagal memuat produk:", error);
      catalogEmpty.textContent = "Terjadi kesalahan saat memuat produk.";
      catalogEmpty.classList.remove("hidden");
    });
}

initCatalog();
