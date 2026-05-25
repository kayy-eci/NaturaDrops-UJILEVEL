# Dokumentasi File JavaScript

Dokumen ini menjelaskan file JavaScript utama di folder `js/`. File dari `node_modules` tidak dibahas karena itu dependency eksternal, bukan kode aplikasi.

Nomor baris mengikuti kondisi file saat dokumentasi ini dibuat. Kalau kode berubah, nomor baris bisa ikut bergeser.

## Ringkasan File

| File             | Kegunaan utama                                                                                            |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| `js/auth.js`     | Mengatur data user, login, register, logout, UI auth, dan halaman profil.                                 |
| `js/featured.js` | Menampilkan daftar produk unggulan di halaman home.                                                       |
| `js/catalog.js`  | Menampilkan katalog, filter kategori/manfaat, search, sort, dan reset filter.                             |
| `js/detail.js`   | Menampilkan detail produk, produk serupa, quantity, dan tambah ke keranjang.                              |
| `js/cart.js`     | Menampilkan isi keranjang, pilih item, tambah/kurang quantity, hapus, dan lanjut checkout.                |
| `js/checkout.js` | Menampilkan ringkasan checkout, ongkir, validasi form, membuat data pesanan, dan menghapus item terbayar. |
| `js/success.js`  | Menampilkan ringkasan pesanan setelah checkout berhasil.                                                  |

---

## `js/auth.js`

### Kegunaan

File ini bertugas mengatur autentikasi sederhana berbasis browser:

- mengambil data user dari `data/users.json`
- login berdasarkan email dan password yang cocok
- register hanya jika data cocok dengan `users.json`
- menyimpan user login ke `sessionStorage`
- mengubah tampilan navbar/profil
- menampilkan data akun di halaman profil
- logout

### Alur Utama

1. Saat file dimuat, `getUser()` dipanggil untuk mengambil `users.json`.
2. Saat DOM siap, `updateAuthUI()` mengubah tampilan auth.
3. Kalau halaman punya elemen `#profile`, `showProfile()` mengisi data profil.
4. Saat login/register diklik, kode memastikan data user sudah ter-load.
5. Kalau input cocok, nama dan email disimpan ke `sessionStorage`.
6. Logout menghapus data session.

### Penjelasan Baris

| Baris   | Penjelasan                                                                                   |
| ------- | -------------------------------------------------------------------------------------------- |
| 1       | Membuat variabel global `users` sebagai array kosong untuk menampung data dari `users.json`. |
| 3-15    | Fungsi `getUser()` mengambil data user secara async memakai `fetch`.                         |
| 5       | Mengambil file `./data/users.json`.                                                          |
| 6-8     | Mengecek response. Kalau file gagal dimuat, dibuat error manual.                             |
| 9       | Mengubah response JSON menjadi array user dan menyimpannya ke `users`.                       |
| 10      | Mengembalikan data user supaya bisa dipakai fungsi lain jika perlu.                          |
| 11-14   | Menangani error fetch dan mengembalikan array kosong.                                        |
| 17-28   | Fungsi `ensureUsersLoaded()` memastikan array `users` sudah terisi sebelum login/register.   |
| 18-20   | Kalau `users` masih kosong, panggil `getUser()` dulu.                                        |
| 22-25   | Kalau setelah fetch tetap kosong, tampilkan alert dan return `false`.                        |
| 27      | Kalau data aman, return `true`.                                                              |
| 30-33   | Fungsi `saveUserSession(user)` menyimpan nama dan email ke `sessionStorage`.                 |
| 35-39   | Fungsi `getCurrentUser()` membaca user yang sedang login dari `sessionStorage`.              |
| 36-37   | Mengambil `nama` dan `email`.                                                                |
| 38      | Kalau ada `nama`, return object user. Kalau tidak, return `null`.                            |
| 41-59   | Fungsi `updateAuthUI()` mengubah tampilan navbar sesuai status login.                        |
| 42      | Mengambil user aktif.                                                                        |
| 43-45   | Mengambil elemen HTML berdasarkan id: `auth-guest`, `profile-initial`, `profile-name`.       |
| 47-54   | Kalau user login, tombol login/register disembunyikan, inisial dan nama profil ditampilkan.  |
| 55-58   | Kalau user belum login, tombol login/register ditampilkan, nama profil disembunyikan.        |
| 61-103  | Fungsi `showProfile()` mengisi halaman profil.                                               |
| 62-63   | Mencari elemen `#profile`; kalau tidak ada, fungsi berhenti.                                 |
| 65-69   | Kalau tidak ada user aktif, arahkan ke `login.html`.                                         |
| 71-102  | Mengisi HTML profil: nama, email, dan tombol logout.                                         |
| 105-130 | Fungsi `login()` menjalankan proses login.                                                   |
| 106-107 | Mengambil email dan password dari input.                                                     |
| 109-112 | Validasi supaya email/password tidak kosong.                                                 |
| 114-115 | Memastikan data user sudah dimuat.                                                           |
| 117-121 | Mencari user dengan email dan password yang cocok. Email dibuat case-insensitive.            |
| 123-126 | Kalau tidak ketemu, tampilkan `Login gagal`.                                                 |
| 128-129 | Kalau cocok, simpan session dan arahkan ke `index.html`.                                     |
| 132-159 | Fungsi `register()` menjalankan register berbasis validasi data JSON.                        |
| 133-135 | Mengambil name, email, dan password dari input register.                                     |
| 137-140 | Validasi semua field harus terisi.                                                           |
| 142-143 | Memastikan data user sudah dimuat.                                                           |
| 145-150 | Mencari user yang nama, email, dan password-nya cocok dengan `users.json`.                   |
| 152-155 | Kalau tidak cocok, register ditolak.                                                         |
| 157-158 | Kalau cocok, simpan session dan arahkan ke home.                                             |
| 161-165 | Fungsi `logout()` menghapus session dan balik ke home.                                       |
| 167-170 | Saat DOM siap, update UI auth dan tampilkan profil jika halaman profil.                      |
| 171     | Memanggil `getUser()` saat file dimuat.                                                      |

### Alternatif dan Alasan

| Bagian                       | Alternatif                                              | Kenapa kode saat ini dipakai                                                                 |
| ---------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `let users = []`             | Langsung hardcode array user di JS                      | Lebih rapi mengambil dari `users.json`, data bisa diubah tanpa menyentuh logic JS.           |
| `fetch("./data/users.json")` | Backend API seperti `/api/users`                        | Project ini masih statis, jadi JSON lokal cukup dan mudah dijalankan.                        |
| `sessionStorage`             | `localStorage`                                          | `sessionStorage` hilang saat tab/browser session selesai, lebih cocok untuk login sederhana. |
| `getElementById`             | `querySelector("#id")` atau `querySelector("[data-*]")` | User meminta pakai id. `getElementById` juga jelas untuk satu elemen spesifik.               |
| `users.find(...)`            | `forEach` dengan flag `ditemukan`                       | `find` berhenti secara konsep saat data ditemukan dan langsung mengembalikan object user.    |
| `email.toLowerCase()`        | Perbandingan email case-sensitive                       | Email biasanya tidak ingin dibedakan hanya karena huruf besar/kecil.                         |
| `innerHTML` untuk profil     | `createElement` satu per satu                           | `innerHTML` lebih ringkas untuk template HTML yang cukup panjang.                            |
| Register validasi ke JSON    | Membuat user baru di JSON                               | Browser tidak bisa menulis permanen ke file JSON lokal tanpa backend.                        |

---

## `js/featured.js`

### Kegunaan

File ini menampilkan produk unggulan di halaman utama dari `data/products.json`.

### Alur Utama

1. Ambil elemen `#featured`.
2. Fetch data produk dari JSON.
3. Untuk setiap produk, buat HTML card.
4. Masukkan seluruh card ke halaman.
5. Kalau gagal, tampilkan pesan error.

### Penjelasan Baris

| Baris | Penjelasan                                                                                               |
| ----- | -------------------------------------------------------------------------------------------------------- |
| 1     | Menyimpan path JSON produk ke `apiUrl`.                                                                  |
| 2     | Mengambil elemen container `#featured`.                                                                  |
| 4-6   | Fungsi `formatHarga()` mengubah angka menjadi format rupiah Indonesia.                                   |
| 5     | `toLocaleString("id-ID")` membuat pemisah ribuan pakai titik.                                            |
| 8-37  | Fungsi `createCard(product)` membuat HTML card untuk satu produk.                                        |
| 9     | Menyiapkan string kosong untuk badge.                                                                    |
| 10-12 | Loop badge produk dan tambahkan HTML badge ke `badgesHTML`.                                              |
| 14-36 | Mengembalikan template card berisi link detail, gambar, badge, kategori, nama, deskripsi, harga, rating. |
| 15    | Link menuju `detail.html?id=...`, supaya halaman detail tahu produk mana yang dibuka.                    |
| 18    | Menampilkan gambar produk.                                                                               |
| 20    | Menyisipkan badge yang sudah dibuat.                                                                     |
| 25-27 | Menampilkan kategori, nama, dan deskripsi singkat.                                                       |
| 30    | Menampilkan harga dengan `formatHarga`.                                                                  |
| 31    | Menampilkan rating dan jumlah review.                                                                    |
| 39-47 | Mengambil data produk dan render card ke halaman.                                                        |
| 40    | Mengubah response menjadi JSON.                                                                          |
| 42    | Menyiapkan string HTML kosong.                                                                           |
| 43-45 | Membuat card untuk semua produk.                                                                         |
| 46    | Memasukkan semua card ke `#featured`.                                                                    |
| 48-51 | Jika fetch gagal, log error dan tampilkan pesan di halaman.                                              |

### Alternatif dan Alasan

| Bagian                  | Alternatif                                         | Kenapa kode saat ini dipakai                                                |
| ----------------------- | -------------------------------------------------- | --------------------------------------------------------------------------- |
| `apiUrl` sebagai const  | Menulis `"data/products.json"` langsung di `fetch` | Lebih mudah diganti kalau path API berubah.                                 |
| `formatHarga()`         | Menulis format harga langsung di template          | Menghindari pengulangan dan menjaga format harga konsisten.                 |
| `forEach` + string HTML | `map(...).join("")`                                | `forEach` mudah dipahami untuk pemula dan jelas proses penambahan HTML-nya. |
| `innerHTML`             | Membuat DOM pakai `createElement`                  | Card cukup panjang, template literal lebih ringkas.                         |
| `fetch(...).then(...)`  | `async/await`                                      | Chain `.then()` sederhana untuk proses ambil data lalu render.              |

---

## `js/catalog.js`

### Kegunaan

File ini mengatur halaman katalog:

- mengambil produk dari JSON
- render card produk
- search produk
- filter kategori dan manfaat
- sort harga/rating
- membaca category dari query URL
- reset filter

### Alur Utama

1. Ambil semua elemen UI filter.
2. Fetch produk dari `products.json`.
3. Simpan data ke `products`.
4. Render pilihan filter kategori/manfaat dari data unik.
5. Pasang event listener.
6. Jalankan filter awal.
7. Render hasil ke grid katalog.

### Penjelasan Baris

| Baris   | Penjelasan                                                                                             |
| ------- | ------------------------------------------------------------------------------------------------------ |
| 1       | Path ke file produk.                                                                                   |
| 2-9     | Mengambil elemen HTML katalog, filter, sort, dan reset.                                                |
| 11      | Menyiapkan array global `products`.                                                                    |
| 12      | Menyimpan kategori aktif dari query URL, misalnya `catalog.html?category=floral`.                      |
| 14-17   | Fungsi `parseQueryCategory()` membaca parameter `category` dari URL.                                   |
| 19-21   | Fungsi format rupiah.                                                                                  |
| 23-25   | Menghasilkan teks jumlah produk ditemukan.                                                             |
| 27-57   | Fungsi `createProductCard(product)` membuat HTML card produk.                                          |
| 28-56   | Template card berisi link detail, image, badge, kategori, nama, deskripsi, harga, volume.              |
| 34-40   | IIFE untuk membuat HTML badge langsung di dalam template.                                              |
| 36-38   | Loop semua badge dan gabungkan jadi string HTML.                                                       |
| 50      | Menampilkan harga dengan `formatHarga`.                                                                |
| 59-74   | Fungsi `renderProducts(list)` menampilkan hasil produk ke grid.                                        |
| 60-65   | Kalau list kosong, kosongkan grid, tampilkan empty state, dan set meta 0 produk.                       |
| 67-73   | Kalau ada produk, sembunyikan empty state, update meta, dan render card.                               |
| 76-85   | Fungsi `getActiveFilters(container)` mengambil checkbox yang sedang dicentang.                         |
| 77-79   | Mengubah NodeList checkbox menjadi array.                                                              |
| 80-84   | Mengambil value setiap checkbox terpilih.                                                              |
| 87-124  | Fungsi `filterProducts()` menjalankan search, filter, sort, lalu render.                               |
| 88      | Mengambil input search dan dibuat lowercase.                                                           |
| 89-90   | Mengambil kategori dan manfaat yang dipilih.                                                           |
| 92-107  | Filter produk berdasarkan search, category, dan benefit.                                               |
| 93-97   | Search cocok jika query kosong atau teks produk mengandung query.                                      |
| 99-101  | Filter kategori cocok jika tidak ada kategori dipilih atau kategori produk termasuk yang dipilih.      |
| 103-104 | Filter manfaat cocok dengan cara yang sama.                                                            |
| 109-121 | Sort berdasarkan pilihan dropdown.                                                                     |
| 110-112 | Harga termurah.                                                                                        |
| 113-115 | Harga termahal.                                                                                        |
| 116-118 | Rating tertinggi.                                                                                      |
| 119-121 | Default hanya copy array tanpa sort khusus.                                                            |
| 123     | Render hasil filter.                                                                                   |
| 126-133 | Fungsi `createCheckbox()` membuat HTML checkbox filter.                                                |
| 135-141 | Fungsi `uniqueValues(key)` mengambil nilai unik dari data produk.                                      |
| 137-139 | Mengumpulkan nilai berdasarkan key, misalnya category.                                                 |
| 140     | Menghapus duplikat dengan `Set` lalu sort.                                                             |
| 143-168 | Fungsi `renderFilterOptions()` membuat checkbox kategori dan benefit.                                  |
| 144-145 | Mengambil category dan benefit unik.                                                                   |
| 148-157 | Render checkbox kategori.                                                                              |
| 159-167 | Render checkbox benefit.                                                                               |
| 170-196 | Fungsi `setupListeners()` memasang event filter.                                                       |
| 171     | Search langsung memfilter saat user mengetik.                                                          |
| 172-173 | Checkbox filter memfilter saat berubah.                                                                |
| 174     | Sort memfilter ulang saat berubah.                                                                     |
| 175-195 | Tombol reset mengosongkan filter, mengembalikan sort, dan mempertahankan category dari query jika ada. |
| 198-213 | Fungsi `initCatalog()` mengambil data produk dan menjalankan setup awal.                               |
| 199-201 | Fetch dan parse JSON.                                                                                  |
| 202     | Simpan data produk ke global `products`.                                                               |
| 203     | Ambil kategori aktif dari URL.                                                                         |
| 204-206 | Render filter, pasang listener, lalu filter produk.                                                    |
| 208-212 | Error handling jika produk gagal dimuat.                                                               |
| 215     | Memulai katalog.                                                                                       |

### Alternatif dan Alasan

| Bagian                                 | Alternatif                   | Kenapa kode saat ini dipakai                                                         |
| -------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------ | -------- | ----------------------------------------------------- |
| `URLSearchParams`                      | Parsing manual string URL    | API browser bawaan ini lebih aman dan jelas.                                         |
| `Array.from(NodeList)`                 | Loop langsung NodeList       | Array lebih enak diproses dengan `forEach`, `map`, dan method array lain.            |
| `filter()`                             | Loop manual dan `push`       | `filter()` memang dibuat untuk menyaring array, jadi lebih ekspresif.                |
| `some()` untuk search                  | Banyak kondisi `             |                                                                                      | ` manual | Lebih pendek untuk mengecek beberapa field sekaligus. |
| `slice().sort()`                       | `products.sort()` langsung   | `slice()` membuat copy agar array asli tidak berubah.                                |
| `Set` untuk unique                     | Cek manual dengan `includes` | `Set` lebih ringkas untuk menghapus duplikat.                                        |
| Event delegation di container checkbox | Listener per checkbox        | Container listener lebih hemat dan tetap bekerja untuk checkbox yang dibuat dinamis. |

---

## `js/detail.js`

### Kegunaan

File ini mengatur halaman detail produk:

- membaca id produk dari URL
- mengambil data produk
- menampilkan detail produk
- menampilkan produk serupa
- mengatur quantity
- menambahkan produk ke keranjang

### Alur Utama

1. Ambil `id` dari URL.
2. Kalau tidak ada id, tampilkan error.
3. Fetch semua produk.
4. Cari produk sesuai id.
5. Cari produk serupa berdasarkan kategori.
6. Render detail produk.
7. Setelah render, pasang event quantity dan tambah keranjang.

### Penjelasan Baris

| Baris   | Penjelasan                                                                                           |
| ------- | ---------------------------------------------------------------------------------------------------- |
| 1       | Path data produk.                                                                                    |
| 2       | Membaca query string dari URL.                                                                       |
| 3       | Mengambil parameter `id`.                                                                            |
| 4       | Mengambil elemen container detail.                                                                   |
| 6-8     | Fungsi format harga.                                                                                 |
| 10-28   | Fungsi `createCard(item)` membuat card produk serupa.                                                |
| 12      | Link card menuju detail produk yang dipilih.                                                         |
| 14-15   | Menampilkan gambar dan kategori.                                                                     |
| 18-23   | Menampilkan kategori, volume, nama, deskripsi, harga, rating.                                        |
| 30-147  | Fungsi `renderProduct(product, relatedProducts)` menampilkan halaman detail lengkap.                 |
| 31-131  | Template HTML detail produk.                                                                         |
| 34      | Breadcrumb berisi nama produk.                                                                       |
| 35-53   | Layout gambar utama dan thumbnail.                                                                   |
| 41-51   | Membuat 4 thumbnail dari gambar produk yang sama.                                                    |
| 55-63   | Menampilkan badge produk.                                                                            |
| 64-77   | Menampilkan kategori, volume, nama, rating, review, stock, dan harga.                                |
| 78      | Deskripsi singkat produk.                                                                            |
| 80-85   | Kontrol quantity dan tombol tambah keranjang.                                                        |
| 87      | Toast pesan berhasil ditambahkan.                                                                    |
| 92-129  | Section manfaat, penggunaan, komposisi, dan produk serupa.                                           |
| 97-103  | Loop manfaat produk menjadi list.                                                                    |
| 119-125 | Loop produk serupa menjadi card.                                                                     |
| 133     | Mengambil input quantity setelah HTML dirender.                                                      |
| 134-136 | Tombol minus mengurangi quantity, minimal 1.                                                         |
| 137-139 | Tombol plus menambah quantity.                                                                       |
| 140-146 | Tombol tambah keranjang menyimpan produk, menampilkan toast, lalu menyembunyikannya setelah 2 detik. |
| 149-156 | Fungsi `renderError(message)` menampilkan pesan error dan link kembali ke katalog.                   |
| 158-161 | Fungsi `loadCart()` membaca keranjang dari `localStorage`.                                           |
| 163-165 | Fungsi `saveCart(cart)` menyimpan keranjang ke `localStorage`.                                       |
| 167-176 | Fungsi `addToCart(product, quantity)` menambahkan produk ke keranjang.                               |
| 168     | Baca keranjang saat ini.                                                                             |
| 169     | Cari apakah produk sudah ada di keranjang.                                                           |
| 170-172 | Kalau sudah ada, tambahkan quantity dengan batas maksimal 99.                                        |
| 173     | Kalau belum ada, push item baru berisi id dan quantity.                                              |
| 175     | Simpan ulang keranjang.                                                                              |
| 178-180 | Kalau URL tidak punya id, tampilkan error.                                                           |
| 181-201 | Kalau ada id, fetch produk, cari produk, render detail, atau tampilkan error.                        |
| 184     | Cari produk berdasarkan id.                                                                          |
| 185-188 | Kalau produk tidak ditemukan, tampilkan error.                                                       |
| 189-194 | Ambil produk serupa: kategori sama, id berbeda, maksimal 4.                                          |
| 195     | Render halaman detail.                                                                               |
| 197-200 | Error handling kalau fetch gagal.                                                                    |

### Alternatif dan Alasan

| Bagian                               | Alternatif                                      | Kenapa kode saat ini dipakai                                         |
| ------------------------------------ | ----------------------------------------------- | -------------------------------------------------------------------- |
| Query `?id=...`                      | Membuat halaman HTML terpisah untuk tiap produk | Satu halaman detail lebih efisien dan data produk bisa dinamis.      |
| `find()` untuk produk                | Loop manual                                     | `find()` langsung cocok untuk mencari satu item.                     |
| `filter().slice(0, 4)`               | Menulis manual produk terkait                   | Otomatis mengambil produk satu kategori dan membatasi jumlah.        |
| `localStorage` untuk cart            | `sessionStorage`                                | Keranjang biasanya tetap ada meski user menutup tab sementara.       |
| Simpan cart hanya `{ id, quantity }` | Simpan semua data produk di cart                | Lebih ringan dan harga/nama tetap mengikuti `products.json` terbaru. |
| Batas maksimal 99                    | Tanpa batas                                     | Mencegah quantity tidak masuk akal atau typo angka terlalu besar.    |
| Toast sederhana                      | Modal                                           | Toast tidak mengganggu flow user saat belanja.                       |

---

## `js/cart.js`

### Kegunaan

File ini mengatur halaman keranjang:

- membaca cart dari `localStorage`
- mengambil detail produk dari JSON
- render keranjang kosong atau isi keranjang
- memilih item yang akan dibayar
- pilih semua item
- tambah/kurang quantity
- hapus item
- kosongkan keranjang
- lanjut ke checkout

### Alur Utama

1. Baca cart dari `localStorage`.
2. Kalau kosong, tampilkan empty cart.
3. Kalau ada, fetch `products.json`.
4. Cocokkan id cart dengan data produk.
5. Render item dan ringkasan.
6. Pasang event untuk semua aksi cart.
7. Setiap aksi menyimpan cart dan render ulang.

### Penjelasan Baris

| Baris   | Penjelasan                                                                           |
| ------- | ------------------------------------------------------------------------------------ |
| 1       | Path data produk.                                                                    |
| 2       | Elemen root untuk render halaman keranjang.                                          |
| 4-6     | Fungsi format harga.                                                                 |
| 8-15    | Fungsi `loadCart()` membaca cart dari `localStorage`.                                |
| 9       | Ambil string JSON cart.                                                              |
| 10      | Parse JSON kalau ada, kalau tidak gunakan array kosong.                              |
| 11-14   | Pastikan setiap item punya `selected`; default-nya `true`.                           |
| 17-19   | Fungsi `saveCart()` menyimpan cart ke `localStorage`.                                |
| 21-26   | Fungsi `getCartTotal()` menghitung total harga item.                                 |
| 22-25   | `reduce` menjumlahkan `price * quantity`.                                            |
| 28-30   | Fungsi `getSelectedItems()` mengambil item yang dicentang.                           |
| 32-41   | Fungsi `renderEmptyCart()` menampilkan keranjang kosong.                             |
| 43-197  | Fungsi `renderCart(items)` menampilkan keranjang yang ada isinya dan memasang event. |
| 44      | Ambil item terpilih.                                                                 |
| 45      | Hitung subtotal item terpilih.                                                       |
| 46-49   | Hitung jumlah quantity item terpilih.                                                |
| 50      | Cek apakah semua item terpilih.                                                      |
| 51-128  | Template HTML halaman cart.                                                          |
| 59      | Tombol kosongkan keranjang.                                                          |
| 62      | Checkbox pilih semua.                                                                |
| 66-107  | Loop item cart dan membuat card item.                                                |
| 70-103  | HTML satu item cart.                                                                 |
| 82      | Checkbox pilih item dengan `data-action="select"` dan `data-id`.                     |
| 88-90   | Tombol decrease dan increase quantity.                                               |
| 94      | Harga satuan.                                                                        |
| 99      | Subtotal per item.                                                                   |
| 101     | Tombol hapus item.                                                                   |
| 111-126 | Area ringkasan dan checkout.                                                         |
| 115-117 | Subtotal, ongkir, dan total.                                                         |
| 124     | Tombol checkout disabled kalau tidak ada item dipilih.                               |
| 130-133 | Event tombol kosongkan keranjang.                                                    |
| 135-141 | Event tombol checkout. Kalau ada item dipilih, pindah ke `checkout.html`.            |
| 143-153 | Event checkbox pilih semua.                                                          |
| 146-149 | Ubah `selected` semua item sesuai checkbox pilih semua.                              |
| 150-151 | Simpan dan render ulang.                                                             |
| 155-167 | Event checkbox per item.                                                             |
| 159-160 | Load cart dan cari item berdasarkan id.                                              |
| 163-165 | Update selected, simpan, render ulang.                                               |
| 169-196 | Event tombol item berdasarkan `data-action`.                                         |
| 170-171 | Ambil action dan id dari dataset tombol.                                             |
| 174-176 | Load cart dan cari item.                                                             |
| 178-182 | Action `remove`: hapus item.                                                         |
| 184-188 | Action `decrease`: kurangi quantity, minimal 1.                                      |
| 190-194 | Action `increase`: tambah quantity, maksimal 99.                                     |
| 199-231 | Fungsi `renderCartWithProducts(cartItems)` menggabungkan cart dengan data produk.    |
| 200-203 | Kalau cart kosong, tampilkan empty cart.                                             |
| 205-207 | Fetch data produk.                                                                   |
| 208     | Array untuk item cart yang sudah punya detail produk.                                |
| 209-218 | Loop item cart, cari produk berdasarkan id, lalu push data lengkap.                  |
| 220-223 | Kalau tidak ada produk yang cocok, tampilkan empty cart.                             |
| 225     | Render cart lengkap.                                                                 |
| 227-230 | Error handling kalau produk gagal dimuat.                                            |
| 233     | Memulai render cart dari data `localStorage`.                                        |

### Alternatif dan Alasan

| Bagian                    | Alternatif                           | Kenapa kode saat ini dipakai                                             |
| ------------------------- | ------------------------------------ | ------------------------------------------------------------------------ |
| `localStorage`            | Database/backend                     | Project statis, jadi `localStorage` cukup untuk cart lokal browser.      |
| `selected` default true   | Semua item default false             | Lebih natural: barang yang masuk cart biasanya siap dibayar.             |
| Cart menyimpan id saja    | Cart menyimpan object produk lengkap | Id saja lebih ringan dan data detail selalu ikut `products.json`.        |
| `reduce` untuk total      | Loop manual `for`                    | `reduce` pas untuk mengubah array item menjadi satu angka total.         |
| `data-action`             | Membuat banyak id unik per tombol    | `data-action` lebih fleksibel untuk item dinamis.                        |
| Render ulang setelah aksi | Update DOM sebagian                  | Render ulang lebih sederhana dan mengurangi state UI yang tidak sinkron. |
| `Math.max` dan `Math.min` | If manual                            | Lebih ringkas untuk batas minimal/maksimal quantity.                     |

---

## `js/checkout.js`

### Kegunaan

File ini mengatur halaman checkout:

- membaca item cart yang dipilih
- menampilkan ringkasan produk
- menghitung subtotal, ongkir, total
- mengganti total saat shipping berubah
- validasi form checkout
- membuat data order
- menyimpan order sementara ke `sessionStorage`
- menghapus item yang sudah dibayar dari cart
- pindah ke halaman success

### Alur Utama

1. Baca cart dari `localStorage`.
2. Ambil item yang `selected`.
3. Fetch data produk.
4. Render ringkasan produk.
5. Hitung total sesuai shipping terpilih.
6. Saat tombol bayar diklik, validasi form.
7. Buat object `orderData`.
8. Simpan order ke `sessionStorage`.
9. Simpan ulang cart hanya item yang belum dipilih.
10. Pindah ke `success.html`.

### Penjelasan Baris

| Baris   | Penjelasan                                                                           |
| ------- | ------------------------------------------------------------------------------------ |
| 1       | Path data produk.                                                                    |
| 3-10    | Fungsi `loadCart()` membaca cart dan default selected.                               |
| 12-14   | Fungsi `saveCart()` menyimpan cart.                                                  |
| 16-18   | Fungsi format harga.                                                                 |
| 20-30   | Mengambil elemen HTML ringkasan, tombol, voucher, shipping, dan form.                |
| 27-29   | Mengubah radio shipping menjadi array.                                               |
| 32      | Menyimpan cart yang dibaca dari localStorage.                                        |
| 33      | Menyimpan data produk lengkap yang dipakai checkout.                                 |
| 35-37   | Fungsi `getSelectedCartItems()` mengambil item terpilih.                             |
| 39-42   | Fungsi `getShippingCost()` mengambil ongkir dari radio yang checked.                 |
| 44-55   | Fungsi `calculateTotals(items)` menghitung subtotal, ongkir, dan total.              |
| 45-48   | Subtotal dihitung dengan `reduce`.                                                   |
| 49      | Ongkir 0 kalau tidak ada item.                                                       |
| 50-54   | Return object total.                                                                 |
| 57-68   | Fungsi `renderEmptySummary()` menampilkan ringkasan kosong dan disable tombol bayar. |
| 58-62   | HTML pesan belum ada item dipilih.                                                   |
| 63-65   | Set subtotal, shipping, total jadi 0.                                                |
| 66-67   | Disable tombol checkout.                                                             |
| 70-94   | Fungsi `renderSummary(items)` menampilkan produk checkout.                           |
| 71-74   | Kalau item kosong, pakai empty summary.                                              |
| 76-89   | Loop item dan buat HTML ringkasan produk.                                            |
| 91      | Update total setelah produk dirender.                                                |
| 92-93   | Enable tombol checkout.                                                              |
| 96-101  | Fungsi `updateTotals()` menghitung ulang dan menampilkan subtotal, ongkir, total.    |
| 103-110 | Fungsi `initShippingListeners()` memasang event radio shipping.                      |
| 105-108 | Kalau shipping berubah dan ada produk, update total.                                 |
| 112-164 | Fungsi `initCheckoutButton()` memasang event tombol bayar.                           |
| 113     | Guard kalau tombol tidak ada.                                                        |
| 115     | Event click bayar.                                                                   |
| 116     | Stop kalau tidak ada produk.                                                         |
| 118-121 | Validasi form HTML5. Kalau invalid, browser menampilkan pesan required.              |
| 123-158 | Membuat object `orderData`.                                                          |
| 124     | Membuat nomor pesanan random.                                                        |
| 125-129 | Data customer dari form.                                                             |
| 130-136 | Data alamat dari form.                                                               |
| 137-140 | Nama metode pengiriman dari label radio terpilih.                                    |
| 141     | Ongkir angka.                                                                        |
| 142-143 | Metode pembayaran dari radio terpilih.                                               |
| 144     | Voucher, null kalau kosong.                                                          |
| 145     | Total belanja.                                                                       |
| 146-157 | Membuat daftar item pesanan dari `cartProducts`.                                     |
| 160     | Simpan order ke `sessionStorage`.                                                    |
| 161     | Simpan cart yang tersisa, yaitu item yang tidak dipilih.                             |
| 162     | Pindah ke halaman success.                                                           |
| 166-176 | Fungsi `initVoucherButton()` memasang event voucher.                                 |
| 167     | Guard kalau elemen voucher tidak ada.                                                |
| 169-175 | Alert saat voucher kosong atau berhasil digunakan.                                   |
| 178-212 | Fungsi `loadCheckoutData()` memuat data produk untuk checkout.                       |
| 179     | Ambil item cart terpilih.                                                            |
| 181-184 | Kalau tidak ada item, tampilkan summary kosong.                                      |
| 186-188 | Fetch data produk.                                                                   |
| 189     | Reset `cartProducts`.                                                                |
| 190-198 | Cocokkan item cart dengan produk JSON.                                               |
| 200-203 | Kalau tidak ada produk cocok, tampilkan summary kosong.                              |
| 205     | Render summary.                                                                      |
| 206     | Pasang listener shipping.                                                            |
| 208-211 | Error handling fetch.                                                                |
| 214-216 | Inisialisasi voucher, checkout button, dan data checkout.                            |

### Alternatif dan Alasan

| Bagian                                   | Alternatif                  | Kenapa kode saat ini dipakai                                              |
| ---------------------------------------- | --------------------------- | ------------------------------------------------------------------------- |
| `sessionStorage` untuk order             | `localStorage`              | Order success hanya perlu sementara setelah checkout.                     |
| `checkValidity()` dan `reportValidity()` | Validasi manual semua input | HTML5 validation sudah menangani `required`, email, dan validasi browser. |
| `Math.random()` untuk nomor order        | Nomor dari backend/database | Project belum punya backend; random cukup untuk simulasi.                 |
| Menghapus item selected setelah checkout | Menghapus seluruh cart      | Item yang tidak dicentang tetap tersimpan sesuai flow cart.               |
| Radio shipping                           | Select dropdown             | Radio membuat pilihan ongkir langsung terlihat.                           |
| Voucher hanya alert                      | Sistem diskon nyata         | Belum ada data voucher/diskon, jadi dibuat simulasi ringan.               |

---

## `js/success.js`

### Kegunaan

File ini menampilkan data pesanan setelah checkout berhasil.

### Alur Utama

1. Ambil `naturaOrder` dari `sessionStorage`.
2. Ambil elemen-elemen success page.
3. Kalau order tidak ada, tampilkan fallback kosong.
4. Kalau order ada, tampilkan nama, email, nomor pesanan, alamat, total, dan jumlah item.
5. Hapus data order dari `sessionStorage`.

### Penjelasan Baris

| Baris | Penjelasan                                                          |
| ----- | ------------------------------------------------------------------- |
| 1-3   | Fungsi `formatHarga()` untuk format rupiah.                         |
| 5     | Membaca order dari `sessionStorage`. Kalau tidak ada, parse `null`. |
| 6-13  | Mengambil semua elemen HTML yang akan diisi data.                   |
| 15-26 | Kondisi kalau data order tidak ada.                                 |
| 16-25 | Isi semua elemen dengan fallback aman.                              |
| 27    | Kalau order ada, destructuring data order.                          |
| 28    | Menghitung total quantity item.                                     |
| 29    | Menghitung jumlah produk berbeda.                                   |
| 31    | Isi nama customer.                                                  |
| 32-33 | Isi pesan email konfirmasi.                                         |
| 34    | Isi nomor pesanan.                                                  |
| 35    | Isi nama penerima.                                                  |
| 36-37 | Isi alamat dan kode pos.                                            |
| 38-39 | Isi kota dan provinsi.                                              |
| 40    | Isi total harga.                                                    |
| 41-42 | Isi jumlah item dan jumlah produk.                                  |
| 44    | Hapus order dari `sessionStorage` agar tidak tampil ulang terus.    |

### Alternatif dan Alasan

| Bagian                                  | Alternatif                           | Kenapa kode saat ini dipakai                                         |
| --------------------------------------- | ------------------------------------ | -------------------------------------------------------------------- |
| `sessionStorage.getItem("naturaOrder")` | Query string order id                | Tanpa backend, data lengkap lebih mudah dikirim lewat session.       |
| Fallback ketika order kosong            | Redirect ke cart                     | Fallback membuat halaman tetap informatif jika dibuka langsung.      |
| Hapus session order setelah tampil      | Biarkan tetap tersimpan              | Menghindari success page menampilkan pesanan lama saat dibuka ulang. |
| `if (element)` guard                    | Langsung `element.textContent = ...` | Mencegah error kalau ada elemen yang belum ada di HTML.              |

---

## Pola Kode yang Berulang

### Format Harga

Dipakai di beberapa file:

```js
function formatHarga(value) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}
```

Alternatif:

```js
new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
}).format(value);
```

Alasan pilihan saat ini:

- lebih pendek
- hasilnya sesuai gaya UI project: `Rp 75.000`
- mudah dipahami untuk pemula

### Fetch JSON Lokal

Contoh:

```js
fetch(apiUrl).then((response) => response.json());
```

Alternatif:

- hardcode data langsung di JS
- memakai backend API
- memakai module import JSON

Alasan pilihan saat ini:

- project statis masih bisa jalan
- data terpisah dari logic
- mudah diubah tanpa edit banyak JS

### Penyimpanan Browser

Project memakai:

- `localStorage` untuk cart
- `sessionStorage` untuk login sederhana dan order sementara

Alasan:

- cart lebih baik tahan lama di browser
- session login/order tidak harus permanen

### Render dengan `innerHTML`

Alternatifnya adalah `document.createElement()`.

Alasan `innerHTML` dipakai:

- UI card cukup panjang
- template literal lebih cepat ditulis
- lebih mudah dibaca untuk project statis sederhana

Catatan:

- Untuk app besar atau data user bebas, perlu hati-hati karena `innerHTML` bisa rentan XSS.
- Di project ini data berasal dari file JSON lokal, jadi risikonya lebih rendah.
  