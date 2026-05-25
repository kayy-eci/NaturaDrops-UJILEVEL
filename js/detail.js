const apiUrl = "data/products.json";
const param = new URLSearchParams(window.location.search);
const productId = param.get("id");
const root = document.getElementById("detail-product");

function formatHarga(value) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

function createCard(item) {
  return `
    <a href="detail.html?id=${item.id}" class="group block rounded-[28px] overflow-hidden bg-white shadow-[0_16px_40px_rgba(76,38,12,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(76,38,12,0.12)]">
      <div class="relative overflow-hidden bg-[#F6EBDD]">
        <img src="${item.image}" alt="${item.name}" class="w-full h-52 object-cover transition duration-300 group-hover:scale-105" />
        <span class="absolute top-4 left-4 inline-flex rounded-full bg-[#3D1F0D]/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#3D1F0D]">${item.category}</span>
        </div>
      <div class="p-5">
        <div class="text-xs uppercase tracking-[0.28em] text-[#7B3F1A] mb-2">${item.category} • ${item.volume}</div>
        <h3 class="font-serif text-xl text-[#3D1F0D] mb-2">${item.name}</h3>
        <p class="text-sm text-[#3D1F0D]/70 mb-4">${item.description}</p>
        <div class="flex items-center justify-between text-sm text-[#3D1F0D]/80">
        <span class="font-semibold">${formatHarga(item.price)}</span>
          <span>★ ${item.rating}</span>
        </div>
      </div>
      </a>
  `;
}

function renderProduct(product, relatedProducts) {
  root.innerHTML = `
      <section class="space-y-10">
        <div class="rounded-[32px] bg-white p-8 shadow-[0_20px_60px_rgba(76,38,12,0.08)]">
          <div class="text-xs uppercase tracking-[0.28em] text-[#7B3F1A] mb-3">Beranda / Katalog / ${product.name}</div>
          <div class="grid gap-10 lg:grid-cols-[460px_minmax(0,1fr)] items-start">
            <div class="space-y-4">
              <div class="rounded-[32px] overflow-hidden bg-[#F2E9DF]">
                <img src="${product.image}" alt="${product.name}" class="w-full h-[460px] object-cover" />
              </div>
              <div class="grid grid-cols-4 gap-3">
                ${(() => {
                  let html = "";
                  [1, 2, 3, 4].forEach(() => {
                    html += `
                  <div class="aspect-square overflow-hidden rounded-3xl bg-[#F2E9DF] border border-[#E4D7C8]">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover" />
                  </div>
                `;
                  });
                  return html;
                })()}
              </div>
            </div>
            <div class="space-y-6">
              <div class="inline-flex items-center gap-3 rounded-full bg-[#EBF1E5] px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#3D1F0D]">
                ${(() => {
                  let badges = [];
                  product.badges.forEach((badge) => {
                    badges.push(badge);
                  });
                  return badges.join(" • ");
                })()}
              </div>
              <div class="flex flex-wrap items-center gap-4 text-sm text-[#7B3F1A] uppercase tracking-[0.28em]">
                <span>${product.category}</span>
                <span>•</span>
                <span>${product.volume}</span>
              </div>
              <h1 class="font-serif text-5xl text-[#3D1F0D] leading-tight">${product.name}</h1>
              <div class="flex flex-wrap items-center gap-4 text-sm text-[#3D1F0D]/70">
                <span>★ ${product.rating}</span>
                <span>•</span>
                <span>${product.reviews} ulasan</span>
                <span>•</span>
                <span class="font-medium text-[#8A9E7B]">${product.stock} stok tersedia</span>
              </div>
              <div class="text-4xl font-serif text-[#3D1F0D]">${formatHarga(product.price)}</div>
              <p class="text-[#3D1F0D]/75 leading-relaxed">${product.short}</p>
              <div class="flex flex-wrap gap-3">
                <div class="inline-flex items-center rounded-full border border-[#3D1F0D]/20 bg-white px-4 py-3 text-[#3D1F0D] shadow-sm">
                  <button id="qty-minus" class="text-xl px-3">−</button>
                  <input id="qty" type="number" min="1" value="1" class="w-14 bg-transparent text-center text-lg outline-none" />
                  <button id="qty-plus" class="text-xl px-3">+</button>
                </div>
                <button id="add-cart" class="rounded-full bg-[#3D1F0D] px-8 py-3 text-sm font-semibold text-[#F9F3EE] hover:bg-[#5A2E14] transition">Tambah ke Keranjang</button>
              </div>
              <div id="add-toast" class="hidden rounded-3xl bg-[#E9F3E4] px-4 py-3 text-sm text-[#3D1F0D]">✓ Ditambahkan ke keranjang</div>
            </div>
          </div>
        </div>
  
        <div class="grid gap-8 lg:grid-cols-[1fr_minmax(0,420px)]">
          <div class="space-y-8">
            <section class="rounded-[32px] bg-white p-8 shadow-[0_20px_60px_rgba(76,38,12,0.08)]">
              <div class="text-xs uppercase tracking-[0.28em] text-[#7B3F1A] mb-4">Manfaat Utama</div>
              <ul class="space-y-3 text-[#3D1F0D]/80">
                ${(() => {
                  let html = "";
                  product.benefits.forEach((item) => {
                    html += `<li class="flex gap-3"><span class="mt-1 h-2.5 w-2.5 rounded-full bg-[#7B3F1A]"></span>${item}</li>`;
                  });
                  return html;
                })()}
              </ul>
            </section>
            <section class="rounded-[32px] bg-white p-8 shadow-[0_20px_60px_rgba(76,38,12,0.08)]">
              <div class="text-xs uppercase tracking-[0.28em] text-[#7B3F1A] mb-4">Cara Penggunaan</div>
              <p class="text-[#3D1F0D]/75 leading-relaxed">${product.usage}</p>
            </section>
            <section class="rounded-[32px] bg-white p-8 shadow-[0_20px_60px_rgba(76,38,12,0.08)]">
              <div class="text-xs uppercase tracking-[0.28em] text-[#7B3F1A] mb-4">Komposisi</div>
              <p class="text-[#3D1F0D]/75 leading-relaxed">${product.composition}</p>
            </section>
          </div>
          <div class="space-y-6">
            <section class="rounded-[32px] bg-white p-8 shadow-[0_20px_60px_rgba(76,38,12,0.08)]">
              <div class="text-xs uppercase tracking-[0.28em] text-[#7B3F1A] mb-4">Produk Serupa</div>
              <div class="grid gap-4">
                ${(() => {
                  let html = "";
                  relatedProducts.forEach((item) => {
                    html += createCard(item);
                  });
                  return html;
                })()}
              </div>
            </section>
          </div>
        </div>
      </section>
    `;

  const qtyInput = document.getElementById("qty");
  document.getElementById("qty-minus").onclick = () => {
    qtyInput.value = Math.max(1, +qtyInput.value - 1);
  };
  document.getElementById("qty-plus").onclick = () => {
    qtyInput.value = +qtyInput.value + 1;
  };
  document.getElementById("add-cart").onclick = () => {
    addToCart(product, +qtyInput.value);
    const t = document.getElementById("add-toast");
    t.textContent = "Produk berhasil ditambahkan ke keranjang.";
    t.classList.remove("hidden");
    setTimeout(() => t.classList.add("hidden"), 2000);
  };
}


function loadCart() {
  const raw = localStorage.getItem("naturaCart");
  return raw ? JSON.parse(raw) : [];
}

function saveCart(cart) {
  localStorage.setItem("naturaCart", JSON.stringify(cart));
}

function addToCart(product, quantity) {
  const cart = loadCart();
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity = Math.min(99, existing.quantity + quantity);
  } else {
    cart.push({ id: product.id, quantity });
  }
  saveCart(cart);
}

if (!productId) {
  renderError("Produk tidak ditemukan.");
} else {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((products) => {
      const product = products.find((item) => item.id === productId);
      if (!product) {
        renderError("Produk tidak ditemukan.");
        return;
      }
      const relatedProducts = products
        .filter(
          (item) =>
            item.id !== product.id && item.category === product.category,
        )
        .slice(0, 4);
      renderProduct(product, relatedProducts);
    })
    .catch((error) => {
      console.error("Gagal memuat produk:", error);
      renderError("Terjadi kesalahan saat memuat detail produk.");
    });
}
