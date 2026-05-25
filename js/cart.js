const apiUrl = "data/products.json";
const cartRoot = document.getElementById("cart-root");

function formatHarga(value) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

function loadCart() {
  const raw = localStorage.getItem("naturaCart");
  const cart = raw ? JSON.parse(raw) : [];
  return cart.map((item) => ({
    ...item,
    selected: item.selected !== false,
  }));
}

function saveCart(cart) {
  localStorage.setItem("naturaCart", JSON.stringify(cart));
}

function getCartTotal(items) {
  return items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
}

function getSelectedItems(items) {
  return items.filter((item) => item.selected);
}

function renderEmptyCart() {
  cartRoot.innerHTML = `
    <section class="rounded-[32px] bg-white p-10 shadow-[0_20px_60px_rgba(76,38,12,0.08)] text-center">
      <div class="mx-auto mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#EBF1E5] text-4xl text-[#3D1F0D]">🛒</div>
      <h2 class="text-3xl font-serif text-[#3D1F0D] mb-3">Keranjangmu masih kosong</h2>
      <p class="max-w-xl mx-auto text-sm leading-7 text-[#3D1F0D]/75 mb-8">Tambahkan produk favoritmu ke keranjang terlebih dahulu. Kami sudah siapkan pilihan aroma terbaik untuk kamu.</p>
      <a href="catalog.html" class="inline-flex items-center justify-center rounded-full bg-[#3D1F0D] px-8 py-4 text-sm font-semibold text-[#F9F3EE] hover:bg-[#5A2E14] transition">Jelajahi Katalog</a>
    </section>
  `;
}

function renderCart(items) {
  const selectedItems = getSelectedItems(items);
  const subtotal = getCartTotal(selectedItems);
  const selectedQuantity = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const allSelected = selectedItems.length === items.length;
  cartRoot.innerHTML = `
    <div class="grid gap-8 xl:grid-cols-[1.5fr_0.9fr]">
      <section class="rounded-[32px] bg-white p-8 shadow-[0_20px_60px_rgba(76,38,12,0.08)]">
        <div class="flex items-center justify-between gap-4 mb-8">
          <div>
            <p class="text-xs uppercase tracking-[0.28em] text-[#7B3F1A]">Keranjang</p>
            <h2 class="mt-2 text-3xl font-serif text-[#3D1F0D]">Barang di dalam keranjang</h2>
          </div>
          <button id="clear-cart" class="rounded-full bg-[#F2E9DF] px-4 py-2 text-sm font-semibold text-[#3D1F0D] hover:bg-[#E6E0D7] transition">Kosongkan Keranjang</button>
        </div>
        <label class="mb-6 flex w-fit cursor-pointer items-center gap-3 rounded-full border border-[#D9D3C5] bg-[#F9F3EE] px-4 py-3 text-sm font-semibold text-[#3D1F0D]">
          <input id="select-all-cart" type="checkbox" class="h-4 w-4 accent-[#3D1F0D]" ${allSelected ? "checked" : ""} />
          Pilih semua item
        </label>
        <div class="space-y-6">
          ${(() => {
            let html = "";
            items.forEach((item) => {
              html += `
              <article class="grid gap-4 rounded-[28px] border border-[#E4D7C8] p-5 md:grid-cols-[120px_minmax(0,1fr)]">
                <img src="${item.product.image}" alt="${item.product.name}" class="h-32 w-full rounded-3xl object-cover md:h-full" />
                <div class="space-y-4">
                  <div class="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-[#7B3F1A]">
                    <span>${item.product.category}</span>
                    <span>•</span>
                    <span>${item.product.volume}</span>
                  </div>
                  <div>
                    <h3 class="font-serif text-xl text-[#3D1F0D]">${item.product.name}</h3>
                    <p class="text-sm text-[#3D1F0D]/70">${item.product.short}</p>
                    <label class="mt-3 flex w-fit cursor-pointer items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7B3F1A]">
                      <input type="checkbox" data-action="select" data-id="${item.product.id}" class="h-4 w-4 accent-[#3D1F0D]" ${item.selected ? "checked" : ""} aria-label="Pilih ${item.product.name}" />
                      Pilih
                    </label>
                  </div>
                  <div class="flex flex-wrap items-center justify-between gap-4">
                    <div class="inline-flex items-center rounded-full border border-[#D9D3C5] bg-[#F9F3EE] px-3 py-2 text-sm text-[#3D1F0D]">
                      <button data-action="decrease" data-id="${item.product.id}" class="px-3 text-lg">−</button>
                      <span class="mx-3 min-w-[2rem] text-center font-semibold">${item.quantity}</span>
                      <button data-action="increase" data-id="${item.product.id}" class="px-3 text-lg">+</button>
                    </div>
                    <div class="text-right">
                      <p class="text-sm text-[#3D1F0D]/70">Harga satuan</p>
                      <p class="mt-1 text-lg font-semibold">${formatHarga(item.product.price)}</p>
                    </div>
                  </div>
                  <div class="flex flex-wrap items-center justify-between gap-4 text-sm">
                    <span class="text-[#3D1F0D]/75">Subtotal:</span>
                    <strong class="text-[#3D1F0D]">${formatHarga(item.product.price * item.quantity)}</strong>
                  </div>
                  <button data-action="remove" data-id="${item.product.id}" class="text-sm font-semibold text-[#B02A2A] hover:text-[#7B1D1D]">Hapus</button>
                </div>
              </article>
            `;
            });
            return html;
          })()}
        </div>
      </section>

      <aside class="space-y-6">
        <section class="rounded-[32px] bg-white p-8 shadow-[0_20px_60px_rgba(76,38,12,0.08)]">
          <div class="text-xs uppercase tracking-[0.28em] text-[#7B3F1A] mb-4">Ringkasan Pesanan</div>
            <div class="space-y-4 text-sm text-[#3D1F0D]/75">
              <div class="flex justify-between"><span>Subtotal</span><span>${formatHarga(subtotal)}</span></div>
              <div class="flex justify-between"><span>Estimasi ongkir</span><span>${formatHarga(subtotal > 0 ? 18000 : 0)}</span></div>
              <div class="border-t border-[#E4D7C8] pt-4 flex justify-between text-base font-semibold text-[#3D1F0D]"><span>Total</span><span>${formatHarga(subtotal + (subtotal > 0 ? 18000 : 0))}</span></div>
              <div class="text-xs text-[#3D1F0D]/60">${selectedQuantity} item dipilih dari ${items.length} produk</div>
            </div>
          </section>
          <section class="rounded-[32px] bg-white p-8 shadow-[0_20px_60px_rgba(76,38,12,0.08)]">
            <h3 class="text-lg font-serif text-[#3D1F0D] mb-4">Lanjutkan ke pembayaran</h3>
          <p class="text-sm leading-7 text-[#3D1F0D]/75 mb-6">Pilih barang yang ingin dibayar sekarang. Item yang tidak dicentang akan tetap tersimpan di keranjang.</p>
          <button id="go-to-checkout" class="w-full rounded-full bg-[#3D1F0D] px-6 py-4 text-sm font-semibold text-[#F9F3EE] hover:bg-[#5A2E14] transition${selectedItems.length ? "" : " cursor-not-allowed opacity-50"}" ${selectedItems.length ? "" : "disabled"}>Lanjutkan ke Pembayaran</button>
        </section>
      </aside>
    </div>
  `;

  document.getElementById("clear-cart").onclick = () => {
    saveCart([]);
    renderEmptyCart();
  };

  const checkoutButton = document.getElementById("go-to-checkout");
  if (checkoutButton) {
    checkoutButton.onclick = () => {
      if (!getSelectedItems(loadCart()).length) return;
      window.location.href = "checkout.html";
    };
  }

  const selectAll = document.getElementById("select-all-cart");
  if (selectAll) {
    selectAll.addEventListener("change", () => {
      const cart = loadCart().map((item) => ({
        ...item,
        selected: selectAll.checked,
      }));
      saveCart(cart);
      renderCartWithProducts(cart);
    });
  }

  cartRoot.querySelectorAll("input[data-action='select']").forEach((input) => {
    const itemId = input.dataset.id;

    input.addEventListener("change", () => {
      const cart = loadCart();
      const item = cart.find((entry) => entry.id === itemId);
      if (!item) return;

      item.selected = input.checked;
      saveCart(cart);
      renderCartWithProducts(cart);
    });
  });

  cartRoot.querySelectorAll("button[data-action]").forEach((button) => {
    const action = button.dataset.action;
    const itemId = button.dataset.id;

    button.addEventListener("click", () => {
      const cart = loadCart();
      const item = cart.find((entry) => entry.id === itemId);
      if (!item) return;

      if (action === "remove") {
        const updatedCart = cart.filter((entry) => entry.id !== itemId);
        saveCart(updatedCart);
        renderCartWithProducts(updatedCart);
      }

      if (action === "decrease") {
        item.quantity = Math.max(item.quantity - 1, 1);
        saveCart(cart);
        renderCartWithProducts(cart);
      }

      if (action === "increase") {
        item.quantity = Math.min(item.quantity + 1, 99);
        saveCart(cart);
        renderCartWithProducts(cart);
      }
    });
  });
}

function renderCartWithProducts(cartItems) {
  if (!cartItems.length) {
    renderEmptyCart();
    return;
  }

  fetch(apiUrl)
    .then((response) => response.json())
    .then((products) => {
      const itemsWithProduct = [];
      cartItems.forEach((item) => {
        const product = products.find((product) => product.id === item.id);
        if (product) {
          itemsWithProduct.push({
            product: product,
            quantity: item.quantity,
            selected: item.selected !== false,
          });
        }
      });

      if (!itemsWithProduct.length) {
        renderEmptyCart();
        return;
      }

      renderCart(itemsWithProduct);
    })
    .catch((error) => {
      console.error("Gagal memuat produk keranjang:", error);
      cartRoot.innerHTML = `<div class="rounded-[32px] bg-white p-10 shadow-[0_20px_60px_rgba(76,38,12,0.08)] text-center">Tidak dapat memuat data keranjang. Silakan coba lagi.</div>`;
    });
}

renderCartWithProducts(loadCart());
