const apiUrl = "data/products.json";
const featured = document.getElementById("featured");

function formatHarga(value) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

function createCard(product) {
  let badgesHTML = "";
  product.badges.forEach((badge) => {
    badgesHTML += `<span class="px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.18em] font-semibold bg-[#3D1F0D]/10 text-[#3D1F0D]">${badge}</span>`;
  });

  return `
    <a href="detail.html?id=${product.id}" class="group block h-full transform transition duration-300 hover:-translate-y-1 hover:scale-[1.02]">
      <article class="h-full bg-white rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(76,38,12,0.08)] group-hover:shadow-2xl flex flex-col">
        <div class="relative overflow-hidden bg-[#F6EBDD]">
          <img src="${product.image}" alt="${product.name}" class="w-full h-72 object-cover" />
          <div class="absolute top-4 left-4 flex flex-wrap gap-2">
            ${badgesHTML}
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
            <span class="text-sm text-[#3D1F0D]/60">★ ${product.rating} (${product.reviews})</span>
          </div>
        </div>
      </article>
    </a>
  `;
}

fetch(apiUrl)
  .then((response) => response.json())
  .then((products) => {
    let card = "";
    products.forEach((product) => {
      card += createCard(product);
    });
    featured.innerHTML = card;
  })
  .catch((error) => {
    console.error("Gagal memuat produk unggulan:", error);
    featured.innerHTML = '<div class="col-span-full text-center text-[#3D1F0D]/70">Terjadi kesalahan saat memuat produk.</div>';
  });
