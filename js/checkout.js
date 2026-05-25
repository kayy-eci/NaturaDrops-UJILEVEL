const apiUrl = "data/products.json";

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

function formatHarga(value) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

const summaryProducts = document.getElementById("summary-products");
const summarySubtotal = document.getElementById("summary-subtotal");
const summaryShipping = document.getElementById("summary-shipping");
const summaryTotal = document.getElementById("summary-total");
const checkoutButton = document.getElementById("checkout-submit");
const voucherButton = document.getElementById("voucher-button");
const voucherCode = document.getElementById("voucher-code");
const shippingInputs = Array.from(
  document.querySelectorAll("input[name='shipping']"),
);
const checkoutForm = document.getElementById("checkout-form");

let cartItems = loadCart();
let cartProducts = [];

function getSelectedCartItems() {
  return cartItems.filter((item) => item.selected);
}

function getShippingCost() {
  const shipping = shippingInputs.find((input) => input.checked);
  return shipping ? Number(shipping.value) : 18000;
}

function calculateTotals(items) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = items.length ? getShippingCost() : 0;
  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
  };
}

function renderEmptySummary() {
  summaryProducts.innerHTML = `
    <div class="rounded-3xl border border-[#D9CABB] bg-[#FCF7F1] p-6 text-center text-sm text-[#3D1F0D]/80">
      Belum ada item yang dipilih. <a href="cart.html" class="font-semibold underline text-[#3D1F0D]">Kembali ke keranjang</a> untuk mencentang produk yang ingin dibayar.
    </div>
  `;
  summarySubtotal.textContent = "Rp0";
  summaryShipping.textContent = "Rp0";
  summaryTotal.textContent = "Rp0";
  checkoutButton.disabled = true;
  checkoutButton.classList.add("opacity-50", "cursor-not-allowed");
}

function renderSummary(items) {
  if (!items.length) {
    renderEmptySummary();
    return;
  }

  let summaryHtml = "";
  items.forEach((item) => {
    summaryHtml += `
        <div class="flex items-center gap-4 rounded-[28px] border border-[#E4D7C8] p-4">
          <img src="${item.product.image}" alt="${item.product.name}" class="h-16 w-16 rounded-3xl object-cover" />
          <div class="flex-1">
            <div class="font-semibold text-[#3D1F0D]">${item.product.name}</div>
            <div class="text-sm text-[#3D1F0D]/70">${item.quantity} × ${formatHarga(item.product.price)}</div>
          </div>
          <div class="text-sm font-semibold text-[#3D1F0D]">${formatHarga(item.product.price * item.quantity)}</div>
        </div>
      `;
  });
  summaryProducts.innerHTML = summaryHtml;

  updateTotals();
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("opacity-50", "cursor-not-allowed");
}

function updateTotals() {
  const { subtotal, shipping, total } = calculateTotals(cartProducts);
  summarySubtotal.textContent = formatHarga(subtotal);
  summaryShipping.textContent = formatHarga(shipping);
  summaryTotal.textContent = formatHarga(total);
}

function initShippingListeners() {
  shippingInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (!cartProducts.length) return;
      updateTotals();
    });
  });
}

function initCheckoutButton() {
  if (!checkoutButton) return;

  checkoutButton.addEventListener("click", () => {
    if (!cartProducts.length) return;

    if (!checkoutForm.checkValidity()) {
      checkoutForm.reportValidity();
      return;
    }

    const orderData = {
      orderNumber: `AN-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      customer: {
        name: checkoutForm.querySelector("input[name='name']").value,
        email: checkoutForm.querySelector("input[name='email']").value,
        phone: checkoutForm.querySelector("input[name='phone']").value,
      },
      address: {
        street: checkoutForm.querySelector("input[name='address']").value,
        city: checkoutForm.querySelector("input[name='city']").value,
        postalCode: checkoutForm.querySelector("input[name='postalCode']")
          .value,
        province: checkoutForm.querySelector("select[name='province']").value,
      },
      shipping: checkoutForm
        .querySelector("input[name='shipping']:checked")
        .closest("label")
        .querySelector("div > div").textContent,
      shippingCost: getShippingCost(),
      payment: checkoutForm.querySelector("input[name='payment']:checked")
        .value,
      voucher: voucherCode.value.trim() || null,
      totals: calculateTotals(cartProducts),
      items: (() => {
        const items = [];
        cartProducts.forEach((item) => {
          items.push({
            id: item.product.id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
          });
        });
        return items;
      })(),
    };

    sessionStorage.setItem("naturaOrder", JSON.stringify(orderData));
    saveCart(cartItems.filter((item) => !item.selected));
    window.location.href = "success.html";
  });
}

function initVoucherButton() {
  if (!voucherButton || !voucherCode) return;

  voucherButton.addEventListener("click", () => {
    if (!voucherCode.value.trim()) {
      alert("Masukkan kode voucher terlebih dahulu.");
      return;
    }
    alert(`Voucher ${voucherCode.value.trim()} berhasil digunakan!`);
  });
}

function loadCheckoutData() {
  const selectedCartItems = getSelectedCartItems();

  if (!selectedCartItems.length) {
    renderEmptySummary();
    return;
  }

  fetch(apiUrl)
    .then((response) => response.json())
    .then((products) => {
      cartProducts = [];
      selectedCartItems.forEach((item) => {
        const product = products.find((product) => product.id === item.id);
        if (product) {
          cartProducts.push({
            product: product,
            quantity: item.quantity,
          });
        }
      });

      if (!cartProducts.length) {
        renderEmptySummary();
        return;
      }

      renderSummary(cartProducts);
      initShippingListeners();
    })
    .catch((error) => {
      console.error("Gagal memuat data checkout:", error);
      summaryProducts.innerHTML = `<div class="rounded-3xl border border-[#D9CABB] bg-[#FCF7F1] p-6 text-center text-sm text-[#3D1F0D]/80">Tidak dapat memuat ringkasan pesanan. Silakan muat ulang halaman.</div>`;
    });
}

initVoucherButton();
initCheckoutButton();
loadCheckoutData();
