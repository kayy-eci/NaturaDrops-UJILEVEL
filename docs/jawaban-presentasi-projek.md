# Jawaban Pertanyaan Presentasi Ujian Praktik

File ini berisi jawaban untuk [pertanyaan-presentasi-projek.md](./pertanyaan-presentasi-projek.md). Nomor jawaban mengikuti nomor pertanyaan.

---

## Jawaban Pertanyaan Tajam / Mendalam

1. Karena keranjang sebaiknya tetap tersimpan walaupun tab ditutup. `sessionStorage` akan hilang saat sesi browser selesai.
2. Data bisa hilang jika browser storage dibersihkan, hanya berlaku di device tersebut, dan bisa dimanipulasi user.
3. User klik tambah di detail, `detail.js` menyimpan `{ id, quantity }` ke `localStorage`, lalu `cart.js` membaca data itu dan mencocokkannya dengan `products.json`.
4. Supaya data cart ringan dan detail produk tetap mengikuti sumber utama di `products.json`.
5. Saat cart dirender ulang, harga yang tampil mengikuti harga terbaru dari `products.json`.
6. `cart.js` membaca cart dari `localStorage`, fetch `products.json`, lalu mencari produk yang `id`-nya sama.
7. Karena barang yang baru masuk keranjang biasanya dianggap siap dibeli.
8. Item itu tidak dimasukkan ke tampilan karena tidak ada data produk yang cocok.
9. Supaya tampilan selalu sinkron setelah data cart berubah.
10. Render ulang lebih sederhana, tapi kurang efisien untuk data sangat besar dibanding update DOM sebagian.
11. Checkout membaca cart lalu memfilter item dengan `selected === true`.
12. Karena user mungkin ingin menyimpan item itu untuk dibeli nanti.
13. Setelah order dibuat, `checkout.js` menyimpan ulang cart dengan `cartItems.filter((item) => !item.selected)`.
14. Nomor bisa bentrok dan tidak benar-benar valid sebagai nomor transaksi produksi.
15. Karena data order hanya perlu sementara untuk halaman success.
16. Halaman menampilkan data fallback seperti pesanan tidak ditemukan.
17. Agar success page tidak terus menampilkan pesanan lama saat dibuka ulang.
18. Data user terbuka di frontend dan tidak aman untuk sistem login nyata.
19. Karena browser tidak bisa menulis permanen ke file JSON lokal tanpa backend.
20. Perlu backend/server, database, endpoint register, dan validasi.
21. Karena password terlihat oleh siapa pun yang membuka file JSON/source.
22. Fungsi itu mengecek apakah `users` sudah terisi; kalau belum, ia memanggil `getUser()`.
23. Tanpa pengecekan, login bisa gagal karena array `users` masih kosong.
24. Karena proses membaca JSON memakai `fetch` yang asynchronous.
25. Supaya email tidak gagal hanya karena beda huruf besar/kecil.
26. Karena password biasanya case-sensitive.
27. `find()` langsung mengembalikan user yang cocok, lebih sesuai untuk pencarian satu data.
28. Kode menampilkan error di console dan fungsi validasi akan memberi alert data belum bisa dimuat.
29. Dari `sessionStorage`, melalui fungsi `getCurrentUser()`.
30. Karena elemen auth sekarang memakai id, dan `getElementById()` jelas untuk satu elemen.
31. HTML menjadi tidak valid dan JavaScript bisa mengambil elemen yang salah.
32. Karena `auth.js` mencari id tersebut di setiap halaman.
33. Kode tetap aman karena dicek dengan `if (profileName)`.
34. Untuk mencegah error ketika elemen tidak ada di halaman tertentu.
35. Jika datanya tidak aman, `innerHTML` bisa membuka celah XSS.
36. Karena data berasal dari JSON lokal project, bukan input bebas dari user publik.
37. Gunakan `textContent`, validasi/sanitasi data, atau buat elemen dengan `createElement`.
38. Supaya data produk/user dipisah dari logic JavaScript.
39. JSON lokal statis, sedangkan API backend bisa membaca/menulis data secara dinamis.
40. Beberapa browser bisa memblokir fetch file lokal karena aturan keamanan.
41. Supaya `fetch()` dan path asset berjalan seperti website normal.
42. Menjadi sumber data produk seperti nama, harga, gambar, kategori, dan detail.
43. Menjadi sumber data akun untuk simulasi login/register.
44. Supaya format harga konsisten dan tidak ditulis berulang.
45. Agar pemisah ribuan memakai format Indonesia.
46. `Rp 75.000` format Indonesia, sedangkan `Rp75,000` format Inggris/US.
47. Karena belum ada file helper bersama, jadi tiap file punya fungsi sendiri.
48. Buat file helper seperti `utils.js`, lalu load sebelum file lain.
49. Mengurangi duplikasi dan memudahkan perubahan format global.
50. Untuk project kecil, terlalu banyak file bisa membuat struktur terasa rumit.
51. Untuk membaca query URL seperti `?category=floral`.
52. URL dibaca `parseQueryCategory()`, disimpan ke `activeCategory`, lalu checkbox kategori yang cocok dibuat checked.
53. Agar semua kondisi hasil produk dihitung dalam satu tempat.
54. Lebih modular, tapi perlu koordinasi state antar fungsi.
55. Agar array disalin dulu sebelum disortir.
56. Array asli bisa berubah urutan dan memengaruhi render berikutnya.
57. `some()` mengecek apakah minimal satu field produk cocok dengan kata pencarian.
58. `filter()` mengambil banyak item, `find()` satu item, `some()` menghasilkan true/false.
59. `Set` otomatis menghapus nilai duplikat.
60. Filter bisa menampilkan data aneh atau kategori duplikat.
61. Jika `badges` array kosong, loop tidak menambahkan badge.
62. Akan error karena `.forEach()` hanya ada pada array.
63. Format harga atau perhitungan bisa bermasalah karena operasi angka butuh number.
64. Agar render, filter, dan perhitungan tidak error.
65. Bisa cek field wajib sebelum render atau memakai schema validation.
66. Supaya satu halaman detail bisa menampilkan produk berbeda berdasarkan URL.
67. Lebih efisien, cukup satu file HTML untuk semua produk.
68. Produk serupa dipilih dari kategori yang sama dan id berbeda.
69. Rekomendasi kurang personal karena tidak mempertimbangkan harga, rating, atau benefit.
70. Agar tampilan tidak terlalu panjang dan tetap rapi.
71. `renderError()` menampilkan pesan produk tidak ditemukan.
72. Supaya halaman tetap punya tampilan jelas saat data tidak valid.
73. Tombol minus mengurangi value input, tombol plus menambah value input.
74. Karena quantity 0 atau negatif tidak masuk akal untuk pembelian.
75. Untuk membatasi jumlah agar tidak terlalu besar atau akibat typo.
76. Bisa terkirim nilai negatif jika tidak divalidasi ulang saat add cart.
77. Saat add cart, pakai `Math.max(1, Number(qtyInput.value) || 1)`.
78. Supaya feedback terlihat sebentar lalu UI bersih lagi.
79. Bisa pakai modal, snackbar, redirect ke cart, atau badge cart.
80. Agar produk yang sama tidak muncul dua kali, tapi quantity-nya bertambah.
81. Quantity produk yang sudah ada bertambah.
82. Supaya user bisa tetap melihat detail atau menambah item lain.
83. Tetap di detail lebih lancar untuk belanja lanjut, langsung ke cart lebih jelas untuk checkout cepat.
84. Karena tombol item dibuat dinamis dan butuh identitas aksi.
85. `data-action` membuat logic tombol lebih rapi tanpa membuat banyak id.
86. `data-id` memberi tahu item mana yang harus diubah.
87. Cart bisa mengubah produk yang salah karena id tidak unik.
88. Karena mengosongkan keranjang berarti data cart menjadi array kosong.
89. Sebaiknya perlu, agar user tidak tidak sengaja menghapus semua item.
90. Tambahkan `if (confirm("Yakin?")) { saveCart([]); ... }`.
91. Karena checkout tanpa item tidak punya pesanan untuk diproses.
92. Frontend bisa dimanipulasi, tapi `checkout.js` tetap mengecek data item.
93. Ya, `checkout.js` mengecek `cartProducts.length` dan selected cart items.
94. Karena user bisa memanipulasi frontend; validasi utama harus di backend.
95. Ia mengecek validasi bawaan form HTML seperti `required` dan tipe email.
96. Supaya browser menampilkan pesan validasi ke user.
97. Form bisa dianggap valid walaupun input kosong.
98. Karena input checkout memakai atribut `name`, bukan id.
99. Selector bisa gagal dan JavaScript error atau mengambil data salah.
100. Karena sangat tergantung susunan HTML; jika struktur label berubah, selector rusak.
101. Simpan nama shipping di `data-label` atau value object yang lebih jelas.
102. Karena jumlah pilihan sedikit dan user perlu melihat semua opsi langsung.
103. Karena user hanya boleh memilih satu metode pembayaran.
104. Event `change` pada radio shipping memanggil `updateTotals()`.
105. Karena total hanya perlu aktif setelah produk checkout tersedia.
106. Perubahan shipping bisa memanggil update berkali-kali.
107. Pasang listener sekali saat halaman load atau gunakan flag inisialisasi.
108. Karena belum ada sistem voucher dan perhitungan diskon sebenarnya.
109. Perlu data voucher, validasi kode, nilai diskon, dan update total.
110. Voucher termasuk data checkout/order, bukan data keranjang.
111. Karena setelah checkout cart bisa berubah, sedangkan success perlu snapshot order.
112. `checkout.js` menyimpan `orderData` ke `sessionStorage`, lalu `success.js` membacanya.
113. Karena data order sudah dihapus, halaman menampilkan fallback.
114. Tidak sungguhan; data hanya lokal di browser.
115. Tambahkan backend, database user, autentikasi, dan penyimpanan order.
116. Gunakan server, database, hashing password, session/token, dan validasi server.
117. Password disimpan dalam bentuk hash kuat seperti bcrypt, bukan plaintext.
118. Karena semua data dan proses terjadi di browser tanpa backend.
119. Auth dan data bisa dilihat serta dimanipulasi dari sisi client.
120. Data tidak tersimpan di server dan hanya ada di browser masing-masing.

---

## Jawaban Pertanyaan Menengah

121. Halaman home untuk pengenalan brand, navigasi, dan produk unggulan.
122. Halaman daftar produk dengan search, filter, dan sort.
123. Halaman informasi lengkap satu produk.
124. Halaman untuk melihat dan mengatur isi keranjang.
125. Halaman untuk mengisi data pembelian dan melihat ringkasan pesanan.
126. Halaman konfirmasi setelah pembayaran simulasi berhasil.
127. Halaman input email dan password untuk masuk.
128. Halaman input nama, email, dan password untuk simulasi register.
129. Halaman informasi akun user yang sedang login.
130. Karena navbar dan status login muncul di banyak halaman.
131. Karena home perlu render produk unggulan ke elemen `#featured`.
132. Karena catalog perlu filter, search, sort, dan render produk.
133. Karena detail perlu membaca id produk dan menampilkan produk detail.
134. Karena cart perlu membaca dan mengatur keranjang.
135. Karena checkout perlu ringkasan, total, validasi, dan order.
136. Karena success perlu menampilkan data order.
137. Container untuk card produk unggulan.
138. Container untuk daftar card produk katalog.
139. Tampilan saat hasil katalog kosong.
140. Teks informasi jumlah produk ditemukan.
141. Input pencarian produk.
142. Container checkbox kategori.
143. Container checkbox manfaat.
144. Dropdown pilihan sorting produk.
145. Tombol mengembalikan filter ke kondisi awal.
146. Container utama isi halaman detail produk.
147. Container utama isi halaman keranjang.
148. Container daftar produk di ringkasan checkout.
149. Elemen teks subtotal checkout.
150. Elemen teks ongkir checkout.
151. Elemen teks total checkout.
152. Tombol untuk memproses checkout.
153. Input kode voucher.
154. Tombol memakai voucher.
155. Container isi profil user.
156. Elemen nama customer di halaman success.
157. Elemen pesan email konfirmasi.
158. Elemen nomor pesanan.
159. Elemen nama penerima.
160. Elemen alamat jalan dan kode pos.
161. Elemen kota dan provinsi.
162. Elemen total pembayaran.
163. Elemen jumlah item dan produk.
164. Navbar menjadi navigasi utama antar halaman.
165. Karena itu halaman utama yang dibutuhkan user saat belanja.
166. Tombol login/register disembunyikan, nama dan inisial profil ditampilkan.
167. Data session dihapus, tombol login/register tampil lagi.
168. Karena user sudah masuk, jadi tidak perlu tombol auth guest.
169. Untuk memberi identitas profil ringkas di navbar.
170. Karena Tailwind mempercepat styling langsung lewat class utility.
171. `hidden` menyembunyikan elemen dengan CSS.
172. Menambahkan class `hidden` agar elemen tidak tampil.
173. Menghapus class `hidden` agar elemen tampil.
174. Mengatur display elemen menjadi tidak tampil.
175. `hidden` berbasis class CSS, `style.display` langsung menulis inline style.
176. Menjalankan kode setelah struktur HTML selesai dimuat.
177. Agar script menunggu HTML diparse sebelum berjalan.
178. JavaScript bisa gagal karena elemen belum ditemukan.
179. Karena id unik dan mudah dipanggil.
180. Karena perlu mengambil banyak elemen yang cocok dengan selector.
181. `getElementById()` khusus id, `querySelector()` bisa memakai selector CSS.
182. `querySelector()` mengambil elemen pertama, `querySelectorAll()` mengambil semua.
183. Memasang fungsi yang dijalankan saat event terjadi.
184. `click` untuk klik, `change` untuk perubahan pilihan, `input` untuk perubahan teks langsung.
185. Agar hasil search berubah saat user mengetik.
186. Karena checkbox berubah saat dicentang atau dilepas.
187. Karena tombol bereaksi saat diklik.
188. Mengambil data/resource dari file atau server.
189. Menjalankan proses berikutnya setelah fetch selesai.
190. Menangani error dari proses fetch.
191. Karena response fetch masih mentah dan perlu diubah menjadi data JS.
192. Parsing gagal dan masuk ke error/catch.
193. Mengubah object/array JavaScript menjadi string JSON.
194. Mengubah string JSON menjadi object/array JavaScript.
195. Karena `localStorage` hanya menyimpan string.
196. Agar string kembali menjadi data yang bisa diproses.
197. Mengembalikan nilai dari fungsi atau menghentikan fungsi.
198. Menghentikan proses jika item tidak ditemukan.
199. Agar kode berhenti lebih cepat saat kondisi tidak memenuhi.
200. Guard clause membuat kode lebih datar dan mudah dibaca.

---

## Jawaban Pertanyaan Simpel / Dasar

201. HTML adalah bahasa markup untuk membuat struktur halaman web.
202. JavaScript adalah bahasa pemrograman untuk membuat halaman web interaktif.
203. CSS adalah bahasa untuk mengatur tampilan halaman web.
204. DOM adalah representasi struktur HTML yang bisa dimanipulasi JavaScript.
205. Tag `<script>` digunakan untuk memuat atau menjalankan JavaScript.
206. `id` memberi identitas unik pada elemen.
207. `class` memberi nama kelompok styling atau selector pada elemen.
208. `href` menentukan tujuan link.
209. `src` menentukan sumber file gambar.
210. `alt` memberi teks alternatif jika gambar gagal tampil dan membantu aksesibilitas.
211. `<main>` menandai konten utama halaman.
212. `<section>` membagi konten menjadi bagian.
213. `<nav>` menandai area navigasi.
214. `<footer>` menandai bagian bawah halaman.
215. `<form>` membungkus input yang berhubungan dengan pengisian data.
216. `<input>` digunakan untuk menerima input user.
217. `<button>` membuat tombol.
218. `<select>` membuat dropdown pilihan.
219. `<option>` adalah item pilihan di dalam `<select>`.
220. `<label>` memberi label untuk input.
221. `const` membuat variabel yang referensinya tidak bisa diganti.
222. `let` membuat variabel yang nilainya bisa diganti.
223. `const` tidak bisa di-assign ulang, `let` bisa.
224. Function adalah blok kode yang bisa dipanggil untuk menjalankan tugas tertentu.
225. Parameter adalah nilai masukan untuk function.
226. Return value adalah nilai yang dikembalikan function.
227. Array adalah kumpulan data berurutan.
228. Object adalah data berisi pasangan key dan value.
229. String adalah data teks.
230. Number adalah data angka.
231. Boolean adalah data true atau false.
232. Template literal adalah string dengan backtick yang bisa menyisipkan ekspresi.
233. Backtick menandai template literal.
234. `${...}` menyisipkan nilai JavaScript ke dalam template literal.
235. Arrow function adalah bentuk singkat penulisan function.
236. Callback function adalah function yang dikirim sebagai argumen ke function lain.
237. Event adalah kejadian seperti klik, input, atau perubahan pilihan.
238. localStorage adalah penyimpanan browser yang bertahan walau tab ditutup.
239. sessionStorage adalah penyimpanan browser yang bertahan selama sesi tab.
240. localStorage lebih permanen, sessionStorage hilang saat sesi selesai.
241. JSON adalah format data teks untuk menyimpan object/array.
242. JSON biasanya berbentuk object `{}` atau array `[]`.
243. Array of object adalah array yang berisi beberapa object.
244. `forEach()` menjalankan fungsi untuk setiap item array.
245. `map()` membuat array baru dari hasil transformasi item.
246. `filter()` membuat array baru berisi item yang lolos kondisi.
247. `find()` mencari satu item pertama yang cocok.
248. `reduce()` mengubah array menjadi satu nilai akhir.
249. `sort()` mengurutkan array.
250. `slice()` mengambil salinan sebagian array.
251. `includes()` mengecek apakah array/string mengandung nilai tertentu.
252. `toLowerCase()` mengubah teks menjadi huruf kecil.
253. `trim()` menghapus spasi di awal dan akhir teks.
254. `Number()` mengubah nilai menjadi angka.
255. `Math.max()` mengambil angka terbesar.
256. `Math.min()` mengambil angka terkecil.
257. `Math.random()` menghasilkan angka acak antara 0 dan kurang dari 1.
258. `setTimeout()` menjalankan kode setelah jeda waktu tertentu.
259. `window.location.href` mengubah halaman tujuan browser.
260. `alert()` menampilkan pesan pop-up sederhana.
261. `console.error()` menampilkan pesan error di console.
262. `innerHTML` membaca atau mengisi HTML di dalam elemen.
263. `textContent` membaca atau mengisi teks di dalam elemen.
264. `innerHTML` bisa memuat tag HTML, `textContent` hanya teks.
265. `value` adalah nilai input.
266. `checked` menunjukkan checkbox/radio sedang dipilih.
267. `disabled` membuat elemen tidak bisa digunakan.
268. `required` membuat input wajib diisi.
269. `type="email"` membuat input divalidasi sebagai email.
270. `type="password"` menyembunyikan karakter input.
271. `type="radio"` membuat pilihan satu dari beberapa opsi.
272. `type="checkbox"` membuat pilihan centang bisa lebih dari satu.
273. Responsive design adalah tampilan yang menyesuaikan ukuran layar.
274. Grid layout adalah sistem tata letak berbasis baris dan kolom.
275. Flexbox adalah sistem layout fleksibel satu dimensi.
276. `flex` membuat elemen menjadi flex container.
277. `grid` membuat elemen menjadi grid container.
278. `hidden` menyembunyikan elemen.
279. `rounded-*` mengatur lengkung sudut.
280. `bg-*` mengatur warna background.
281. `text-*` mengatur warna atau ukuran teks.
282. `px-*` padding horizontal, `py-*` padding vertical.
283. `hover:*` memberi style saat elemen di-hover.
284. `lg:*` style aktif pada breakpoint layar besar.
285. `sm:*` style aktif pada breakpoint layar kecil ke atas.
286. `src/input.css` adalah file input CSS/Tailwind.
287. `src/output.css` adalah hasil build CSS yang dipakai HTML.
288. `<link>` menghubungkan HTML dengan file CSS.
289. Agar elemen HTML sudah tersedia sebelum JS dijalankan.
290. Halaman statis adalah halaman tanpa backend dinamis.
291. Data dinamis di project ini adalah data JSON yang dirender dengan JavaScript.
292. Browser membuka `detail.html?id=...` sesuai id produk.
293. Produk disimpan ke `localStorage` sebagai item cart.
294. Quantity bertambah.
295. Quantity berkurang, biasanya tidak kurang dari 1.
296. Item dihapus dari cart.
297. Semua item berubah status selected sesuai checkbox pilih semua.
298. Browser pindah ke `checkout.html` jika ada item dipilih.
299. Form divalidasi, order dibuat, cart diperbarui, lalu pindah ke success.
300. Data login dihapus dan user kembali ke home.

---

## Jawaban Pertanyaan Alur Presentasi

301. Jelaskan dulu tujuan project, lalu flow belanja, lalu fitur utama.
302. Mulai dari home, katalog, detail produk, keranjang, checkout, lalu success.
303. Tunjukkan `products.json`, lalu tunjukkan `fetch(apiUrl)` di JS.
304. Tambahkan produk, buka DevTools Application/Local Storage, lalu lihat `naturaCart`.
305. Centang/lepas item di cart, lalu tunjukkan checkout hanya mengambil item yang dicentang.
306. Jelaskan bahwa checkout memfilter item dengan property `selected`.
307. Masukkan email/password yang cocok dengan `users.json`, lalu tunjukkan navbar berubah.
308. Masukkan data salah, lalu tunjukkan alert login gagal.
309. Jelaskan bahwa register project ini masih simulasi validasi, bukan membuat akun baru.
310. Catalog menampilkan banyak produk, detail menampilkan satu produk berdasarkan id.
311. Jelaskan input search, checkbox category/benefit, dan fungsi `filterProducts()`.
312. Jelaskan pilihan sort memanggil `sort()` berdasarkan harga atau rating.
313. Jelaskan search mencocokkan query dengan nama, deskripsi, kategori, dan benefit.
314. Jelaskan ringkasan mengambil item selected, menghitung subtotal, ongkir, dan total.
315. Jelaskan success membaca `naturaOrder` dari `sessionStorage`.
316. Jelaskan cart perlu bertahan walau tab ditutup, jadi memakai `localStorage`.
317. Jelaskan login/order sementara cocok memakai `sessionStorage`.
318. Sebutkan jujur bahwa project belum punya backend, auth belum aman, dan data masih lokal.
319. Tambahkan backend, database, auth aman, dashboard admin, dan payment gateway simulasi.
320. Jawab belum aman untuk produksi karena auth, order, dan data masih sepenuhnya di frontend.

