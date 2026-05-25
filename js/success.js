import { getUser, getCurrentUser } from "./auth";

function formatHarga(value) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

const orderData = JSON.parse(sessionStorage.getItem("naturaOrder") || "null");
const nameEl = document.getElementById("success-name");
const emailEl = document.getElementById("success-email");
const orderNumberEl = document.getElementById("success-order-number");
const addressNameEl = document.getElementById("success-address-name");
const addressLineEl = document.getElementById("success-address-line");
const addressCityEl = document.getElementById("success-address-city");
const totalEl = document.getElementById("success-total");
const itemsEl = document.getElementById("success-items");

if (!orderData) {
  if (nameEl) nameEl.textContent = "terima kasih!";
  if (emailEl)
    emailEl.textContent =
      "Data pesanan tidak ditemukan. Silakan kembali ke keranjang.";
  if (orderNumberEl) orderNumberEl.textContent = "No. Pesanan: -";
  if (addressNameEl) addressNameEl.textContent = "-";
  if (addressLineEl) addressLineEl.textContent = "-";
  if (addressCityEl) addressCityEl.textContent = "-";
  if (totalEl) totalEl.textContent = "Rp0";
  if (itemsEl) itemsEl.textContent = "0 item • 0 produk";
} else {
  const { customer, address, orderNumber, totals, items } = orderData;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const productCount = items.length;

  if (nameEl) nameEl.textContent = customer.name;
  if (email)
    emailEl.textContent = `Email konfirmasi sudah kami kirim ke ${email}`;
  if (orderNumberEl) orderNumberEl.textContent = `No. Pesanan: ${orderNumber}`;
  if (addressNameEl) addressNameEl.textContent = `${customer.name}`;
  if (addressLineEl)
    addressLineEl.textContent = `${address.street}, ${address.postalCode}`;
  if (addressCityEl)
    addressCityEl.textContent = `${address.city}, ${address.province}`;
  if (totalEl) totalEl.textContent = formatHarga(totals.total);
  if (itemsEl)
    itemsEl.textContent = `${itemCount} item • ${productCount} produk`;

  sessionStorage.removeItem("naturaOrder");
}
