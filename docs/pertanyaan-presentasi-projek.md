# Pertanyaan Presentasi Ujian Praktik

## Analisis Singkat Project

Project ini adalah website toko online statis untuk produk aroma/essence. Alur utamanya dimulai dari halaman home (`index.html`) yang menampilkan produk unggulan, katalog (`catalog.html`) untuk mencari dan memfilter produk, detail produk (`detail.html`) untuk melihat informasi lengkap dan menambahkan barang ke keranjang, keranjang (`cart.html`) untuk memilih item dan mengatur quantity, checkout (`checkout.html`) untuk mengisi data pesanan, lalu success (`success.html`) untuk menampilkan ringkasan pesanan. Project juga punya login/register/profile sederhana melalui `auth.js`, menggunakan `users.json` sebagai sumber data user, `products.json` sebagai sumber data produk, `localStorage` untuk keranjang, dan `sessionStorage` untuk data login serta pesanan sementara.

Dokumen ini hanya berisi pertanyaan tanpa jawaban, supaya bisa dipakai latihan presentasi dan simulasi tanya jawab.

---

## Pertanyaan Tajam / Mendalam

1. Mengapa project ini memilih menyimpan keranjang di `localStorage`, bukan di `sessionStorage`?
2. Apa risiko jika data keranjang hanya disimpan di browser tanpa backend?
3. Bagaimana cara kerja alur data dari `detail.html` sampai produk muncul di `cart.html`?
4. Mengapa cart hanya menyimpan `id` dan `quantity`, bukan menyimpan seluruh object produk?
5. Apa konsekuensi jika harga produk di `products.json` berubah setelah item sudah masuk keranjang?
6. Bagaimana `cart.js` menggabungkan data cart dari `localStorage` dengan data produk dari `products.json`?
7. Mengapa `selected` pada item cart dibuat default `true`?
8. Apa yang terjadi kalau item di `localStorage` memiliki `id` produk yang sudah tidak ada di `products.json`?
9. Mengapa setiap perubahan di keranjang memanggil `renderCartWithProducts()` lagi?
10. Apa kelebihan dan kekurangan render ulang seluruh keranjang dibanding update DOM sebagian?
11. Bagaimana cara checkout hanya memproses item yang dicentang?
12. Mengapa item yang tidak dicentang tetap berada di keranjang setelah checkout?
13. Bagaimana `checkout.js` menghapus item yang sudah dibayar dari cart?
14. Apa risiko penggunaan `Math.random()` untuk membuat nomor pesanan?
15. Mengapa data pesanan disimpan di `sessionStorage`, bukan `localStorage`?
16. Apa yang terjadi jika user membuka `success.html` langsung tanpa checkout?
17. Mengapa `success.js` menghapus `naturaOrder` setelah data ditampilkan?
18. Apa kelemahan sistem login yang hanya memakai `users.json`?
19. Mengapa register di project ini tidak benar-benar membuat akun baru permanen?
20. Apa yang harus ditambahkan kalau ingin register benar-benar menyimpan user baru?
21. Mengapa password yang ada di `users.json` tidak aman untuk aplikasi nyata?
22. Bagaimana cara kerja `ensureUsersLoaded()` di `auth.js`?
23. Apa masalah yang bisa terjadi jika user menekan login sebelum `fetch users.json` selesai?
24. Mengapa `login()` dan `register()` dibuat `async`?
25. Mengapa email dibandingkan dengan `toLowerCase()`?
26. Mengapa password tidak ikut dibuat lowercase saat validasi?
27. Apa kelebihan `users.find()` dibanding `forEach()` dalam proses login?
28. Apa yang terjadi kalau `users.json` gagal dimuat?
29. Bagaimana `updateAuthUI()` tahu user sedang login atau belum?
30. Mengapa `updateAuthUI()` memakai `getElementById()`?
31. Apa akibatnya kalau beberapa elemen HTML memakai id yang sama dalam satu halaman?
32. Mengapa id `auth-guest`, `profile-initial`, dan `profile-name` perlu konsisten di semua halaman?
33. Apa yang terjadi kalau salah satu halaman tidak punya elemen `profile-name`?
34. Mengapa kode sering melakukan pengecekan `if (element)` sebelum mengubah DOM?
35. Apa risiko menggunakan `innerHTML` untuk render data?
36. Mengapa risiko `innerHTML` di project ini lebih rendah daripada aplikasi dengan input user bebas?
37. Bagaimana cara membuat render HTML lebih aman dari XSS?
38. Mengapa project memakai `fetch()` untuk mengambil JSON lokal?
39. Apa perbedaan mengambil data dari JSON lokal dengan mengambil data dari API backend?
40. Apa yang terjadi jika project dibuka langsung lewat file system dan browser memblokir `fetch()`?
41. Mengapa pada project statis sering perlu dijalankan lewat local server?
42. Apa fungsi `products.json` dalam project ini?
43. Apa fungsi `users.json` dalam project ini?
44. Mengapa format harga dibuat melalui fungsi `formatHarga()`?
45. Apa alasan memakai `toLocaleString("id-ID")`?
46. Apa bedanya `Rp 75.000` dengan `Rp75,000` dari sisi locale?
47. Mengapa fungsi `formatHarga()` muncul di beberapa file JS?
48. Bagaimana cara menghindari duplikasi fungsi `formatHarga()` di banyak file?
49. Apa kelebihan membuat file helper JS terpisah untuk fungsi umum?
50. Apa kekurangan membuat terlalu banyak file helper di project kecil?
51. Mengapa `catalog.js` memakai `URLSearchParams`?
52. Bagaimana alur kategori dari link footer seperti `catalog.html?category=floral` sampai checkbox kategori aktif?
53. Mengapa `filterProducts()` menggabungkan search, kategori, benefit, dan sort dalam satu fungsi?
54. Apa konsekuensi jika filter dan sort dipisah menjadi fungsi berbeda?
55. Mengapa saat sort memakai `filtered.slice().sort()`?
56. Apa masalah jika langsung memakai `filtered.sort()` pada array asli?
57. Bagaimana `some()` membantu proses pencarian produk?
58. Apa bedanya `filter()`, `find()`, dan `some()` dalam project ini?
59. Mengapa `uniqueValues()` memakai `Set`?
60. Apa yang terjadi jika data produk punya kategori kosong atau tidak konsisten?
61. Bagaimana project akan menangani produk dengan `badges` kosong?
62. Apa yang terjadi jika `product.badges` bukan array?
63. Apa yang terjadi jika `product.price` berupa string, bukan number?
64. Mengapa data produk perlu struktur yang konsisten?
65. Bagaimana cara validasi struktur `products.json` sebelum dirender?
66. Mengapa `detail.js` membaca id produk dari URL?
67. Apa kelebihan satu halaman `detail.html` dinamis dibanding banyak halaman detail statis?
68. Bagaimana `detail.js` menentukan produk serupa?
69. Apa kelemahan rekomendasi produk serupa hanya berdasarkan kategori?
70. Mengapa related products dibatasi dengan `.slice(0, 4)`?
71. Apa yang terjadi jika produk tidak ditemukan di halaman detail?
72. Mengapa `renderError()` diperlukan?
73. Bagaimana alur tombol plus dan minus quantity di detail produk?
74. Mengapa quantity minimal dibatasi 1?
75. Mengapa quantity di keranjang maksimal dibatasi 99?
76. Apa yang terjadi kalau user mengetik angka negatif langsung di input quantity?
77. Bagaimana cara memperkuat validasi quantity saat add to cart?
78. Mengapa toast berhasil ditambahkan ke keranjang disembunyikan lagi dengan `setTimeout()`?
79. Apa alternatif selain toast untuk memberi feedback ke user?
80. Mengapa `addToCart()` mengecek produk sudah ada atau belum?
81. Apa yang terjadi jika produk yang sama ditambahkan dua kali?
82. Mengapa `addToCart()` tidak langsung mengarahkan user ke cart?
83. Apa pertimbangan UX antara tetap di halaman detail atau langsung pindah ke cart?
84. Mengapa `cart.js` memakai `data-action` untuk tombol?
85. Apa kelebihan `data-action` dibanding membuat id unik untuk setiap tombol?
86. Bagaimana `data-id` membantu menemukan item cart yang benar?
87. Apa risiko jika dua produk punya id yang sama?
88. Mengapa `clear-cart` langsung menyimpan array kosong?
89. Apakah perlu konfirmasi sebelum mengosongkan keranjang?
90. Bagaimana cara menambahkan confirm dialog untuk tombol kosongkan keranjang?
91. Mengapa tombol checkout disabled saat tidak ada item dipilih?
92. Apa yang terjadi jika user memanipulasi HTML dan mengaktifkan tombol checkout secara manual?
93. Apakah `checkout.js` tetap mengecek item terpilih walau tombol dipaksa aktif?
94. Mengapa validasi tidak cukup hanya di frontend untuk aplikasi nyata?
95. Bagaimana cara kerja `checkoutForm.checkValidity()`?
96. Mengapa `checkoutForm.reportValidity()` dipakai setelah check invalid?
97. Apa yang terjadi jika input form checkout tidak punya atribut `required`?
98. Mengapa data customer checkout diambil dengan `querySelector("input[name='name']")`?
99. Apa risiko jika struktur HTML form berubah tapi selector JS tidak ikut diperbarui?
100. Mengapa mengambil teks shipping dengan `.closest("label").querySelector("div > div").textContent` bisa rapuh?
101. Apa alternatif yang lebih stabil untuk menyimpan nama metode shipping?
102. Mengapa radio button cocok untuk metode pengiriman?
103. Mengapa metode pembayaran juga memakai radio button?
104. Bagaimana cara kerja update total saat shipping berubah?
105. Mengapa `initShippingListeners()` dipanggil setelah data checkout berhasil dimuat?
106. Apa risiko jika listener shipping dipasang berkali-kali?
107. Bagaimana cara mencegah listener duplikat pada UI yang sering dirender ulang?
108. Mengapa voucher di project ini hanya menampilkan alert?
109. Apa yang perlu ditambahkan agar voucher benar-benar mengurangi total?
110. Mengapa `checkout.js` tidak menyimpan voucher ke cart?
111. Mengapa success page tidak mengambil data langsung dari cart?
112. Bagaimana data `orderData` berpindah dari checkout ke success?
113. Apa yang terjadi jika user refresh halaman success setelah order dihapus dari session?
114. Apakah project ini bisa digunakan multi-user?
115. Apa yang harus diubah agar project bisa mendukung banyak user sungguhan?
116. Bagaimana cara membuat auth yang aman dengan backend?
117. Bagaimana cara menyimpan password secara aman di backend?
118. Mengapa proyek ini cocok disebut simulasi e-commerce statis?
119. Apa batasan terbesar project ini dari sisi keamanan?
120. Apa batasan terbesar project ini dari sisi data persistence?

---

## Pertanyaan Menengah

121. Apa fungsi utama `index.html` dalam project ini?
122. Apa fungsi utama `catalog.html`?
123. Apa fungsi utama `detail.html`?
124. Apa fungsi utama `cart.html`?
125. Apa fungsi utama `checkout.html`?
126. Apa fungsi utama `success.html`?
127. Apa fungsi utama `login.html`?
128. Apa fungsi utama `register.html`?
129. Apa fungsi utama `profile.html`?
130. Mengapa hampir semua halaman memuat `auth.js`?
131. Mengapa halaman home memuat `featured.js`?
132. Mengapa halaman catalog memuat `catalog.js`?
133. Mengapa halaman detail memuat `detail.js`?
134. Mengapa halaman cart memuat `cart.js`?
135. Mengapa halaman checkout memuat `checkout.js`?
136. Mengapa halaman success memuat `success.js`?
137. Apa fungsi elemen `#featured` di `index.html`?
138. Apa fungsi elemen `#catalog-grid` di `catalog.html`?
139. Apa fungsi elemen `#catalog-empty` di `catalog.html`?
140. Apa fungsi elemen `#catalog-meta` di `catalog.html`?
141. Apa fungsi input `#f-search`?
142. Apa fungsi container `#f-category`?
143. Apa fungsi container `#f-benefit`?
144. Apa fungsi select `#f-sort`?
145. Apa fungsi tombol `#f-reset`?
146. Apa fungsi elemen `#detail-product`?
147. Apa fungsi elemen `#cart-root`?
148. Apa fungsi elemen `#summary-products`?
149. Apa fungsi elemen `#summary-subtotal`?
150. Apa fungsi elemen `#summary-shipping`?
151. Apa fungsi elemen `#summary-total`?
152. Apa fungsi tombol `#checkout-submit`?
153. Apa fungsi input `#voucher-code`?
154. Apa fungsi tombol `#voucher-button`?
155. Apa fungsi elemen `#profile`?
156. Apa fungsi `#success-name`?
157. Apa fungsi `#success-email`?
158. Apa fungsi `#success-order-number`?
159. Apa fungsi `#success-address-name`?
160. Apa fungsi `#success-address-line`?
161. Apa fungsi `#success-address-city`?
162. Apa fungsi `#success-total`?
163. Apa fungsi `#success-items`?
164. Apa fungsi navbar pada setiap halaman?
165. Mengapa navbar punya link ke home, catalog, profile, dan cart?
166. Bagaimana tampilan auth berubah setelah user login?
167. Bagaimana tampilan auth berubah setelah user logout?
168. Mengapa tombol login/register disembunyikan setelah login?
169. Mengapa inisial profile diambil dari huruf pertama nama user?
170. Mengapa project memakai Tailwind utility class di HTML?
171. Apa fungsi class `hidden` dalam project ini?
172. Apa fungsi `classList.add("hidden")`?
173. Apa fungsi `classList.remove("hidden")`?
174. Apa fungsi `style.display = "none"`?
175. Apa bedanya menyembunyikan elemen dengan `hidden` dan `style.display`?
176. Apa fungsi `DOMContentLoaded` di `auth.js`?
177. Mengapa beberapa script memakai `defer` di HTML?
178. Apa yang terjadi jika script dijalankan sebelum elemen HTML tersedia?
179. Mengapa beberapa kode mengambil elemen dengan `document.getElementById()`?
180. Mengapa beberapa kode mengambil elemen dengan `querySelectorAll()`?
181. Apa perbedaan `getElementById()` dan `querySelector()`?
182. Apa perbedaan `querySelector()` dan `querySelectorAll()`?
183. Apa fungsi `addEventListener()`?
184. Apa perbedaan event `click`, `change`, dan `input`?
185. Mengapa search catalog memakai event `input`?
186. Mengapa checkbox filter memakai event `change`?
187. Mengapa tombol memakai event `click`?
188. Apa fungsi `fetch()`?
189. Apa fungsi `.then()` setelah `fetch()`?
190. Apa fungsi `.catch()` pada proses fetch?
191. Mengapa response perlu diubah dengan `.json()`?
192. Apa yang terjadi jika JSON tidak valid?
193. Apa fungsi `JSON.stringify()`?
194. Apa fungsi `JSON.parse()`?
195. Mengapa data cart harus diubah ke string sebelum disimpan ke `localStorage`?
196. Mengapa data cart harus di-parse lagi setelah dibaca?
197. Apa fungsi `return` di dalam fungsi?
198. Apa fungsi `if (!item) return;`?
199. Mengapa banyak fungsi menggunakan guard clause?
200. Apa kelebihan guard clause dibanding nested if yang panjang?

---

## Pertanyaan Simpel / Dasar

201. Apa itu HTML?
202. Apa itu JavaScript?
203. Apa itu CSS?
204. Apa itu DOM?
205. Apa itu tag `<script>`?
206. Apa fungsi atribut `id` di HTML?
207. Apa fungsi atribut `class` di HTML?
208. Apa fungsi atribut `href` pada tag `<a>`?
209. Apa fungsi atribut `src` pada tag `<img>`?
210. Apa fungsi atribut `alt` pada gambar?
211. Apa fungsi tag `<main>`?
212. Apa fungsi tag `<section>`?
213. Apa fungsi tag `<nav>`?
214. Apa fungsi tag `<footer>`?
215. Apa fungsi tag `<form>`?
216. Apa fungsi tag `<input>`?
217. Apa fungsi tag `<button>`?
218. Apa fungsi tag `<select>`?
219. Apa fungsi tag `<option>`?
220. Apa fungsi tag `<label>`?
221. Apa fungsi `const` di JavaScript?
222. Apa fungsi `let` di JavaScript?
223. Apa perbedaan `const` dan `let`?
224. Apa itu function?
225. Apa itu parameter function?
226. Apa itu return value?
227. Apa itu array?
228. Apa itu object?
229. Apa itu string?
230. Apa itu number?
231. Apa itu boolean?
232. Apa itu template literal?
233. Apa fungsi backtick dalam template literal?
234. Apa fungsi `${...}` di template literal?
235. Apa itu arrow function?
236. Apa itu callback function?
237. Apa itu event?
238. Apa itu localStorage?
239. Apa itu sessionStorage?
240. Apa perbedaan localStorage dan sessionStorage?
241. Apa itu JSON?
242. Apa bentuk umum data JSON?
243. Apa itu array of object?
244. Apa fungsi `forEach()`?
245. Apa fungsi `map()`?
246. Apa fungsi `filter()`?
247. Apa fungsi `find()`?
248. Apa fungsi `reduce()`?
249. Apa fungsi `sort()`?
250. Apa fungsi `slice()`?
251. Apa fungsi `includes()`?
252. Apa fungsi `toLowerCase()`?
253. Apa fungsi `trim()`?
254. Apa fungsi `Number()`?
255. Apa fungsi `Math.max()`?
256. Apa fungsi `Math.min()`?
257. Apa fungsi `Math.random()`?
258. Apa fungsi `setTimeout()`?
259. Apa fungsi `window.location.href`?
260. Apa fungsi `alert()`?
261. Apa fungsi `console.error()`?
262. Apa fungsi `innerHTML`?
263. Apa fungsi `textContent`?
264. Apa perbedaan `innerHTML` dan `textContent`?
265. Apa fungsi `value` pada input?
266. Apa fungsi `checked` pada checkbox atau radio?
267. Apa fungsi `disabled` pada button?
268. Apa fungsi `required` pada input form?
269. Apa fungsi `type="email"`?
270. Apa fungsi `type="password"`?
271. Apa fungsi `type="radio"`?
272. Apa fungsi `type="checkbox"`?
273. Apa itu responsive design?
274. Apa itu grid layout?
275. Apa itu flexbox?
276. Apa arti class Tailwind `flex`?
277. Apa arti class Tailwind `grid`?
278. Apa arti class Tailwind `hidden`?
279. Apa arti class Tailwind `rounded-*`?
280. Apa arti class Tailwind `bg-*`?
281. Apa arti class Tailwind `text-*`?
282. Apa arti class Tailwind `px-*` dan `py-*`?
283. Apa arti class Tailwind `hover:*`?
284. Apa arti class Tailwind `lg:*`?
285. Apa arti class Tailwind `sm:*`?
286. Apa fungsi file `src/input.css`?
287. Apa fungsi file `src/output.css`?
288. Mengapa HTML menghubungkan stylesheet dengan tag `<link>`?
289. Mengapa JavaScript diletakkan di akhir body pada beberapa halaman?
290. Apa yang dimaksud halaman statis?
291. Apa yang dimaksud data dinamis di project ini?
292. Apa yang terjadi saat user klik produk di katalog?
293. Apa yang terjadi saat user klik tambah ke keranjang?
294. Apa yang terjadi saat user klik tombol plus quantity?
295. Apa yang terjadi saat user klik tombol minus quantity?
296. Apa yang terjadi saat user klik hapus item?
297. Apa yang terjadi saat user klik pilih semua item?
298. Apa yang terjadi saat user klik lanjut ke pembayaran?
299. Apa yang terjadi saat user klik bayar sekarang?
300. Apa yang terjadi saat user klik logout?

---

## Pertanyaan Alur Presentasi

301. Jika diminta menjelaskan project dalam satu menit, bagian mana yang akan kamu jelaskan dulu?
302. Bagaimana kamu menjelaskan flow belanja dari awal sampai akhir?
303. Bagaimana kamu menunjukkan bahwa data produk berasal dari JSON?
304. Bagaimana kamu membuktikan cart tersimpan di browser?
305. Bagaimana kamu mendemonstrasikan perbedaan item dipilih dan tidak dipilih di cart?
306. Bagaimana kamu menjelaskan mengapa checkout hanya mengambil item yang dipilih?
307. Bagaimana kamu mendemonstrasikan login berhasil?
308. Bagaimana kamu mendemonstrasikan login gagal?
309. Bagaimana kamu menjelaskan kenapa register harus cocok dengan `users.json`?
310. Bagaimana kamu menjelaskan perbedaan halaman catalog dan detail?
311. Bagaimana kamu menjelaskan filter produk ke penguji?
312. Bagaimana kamu menjelaskan sorting harga ke penguji?
313. Bagaimana kamu menjelaskan search produk ke penguji?
314. Bagaimana kamu menjelaskan ringkasan checkout ke penguji?
315. Bagaimana kamu menjelaskan halaman success ke penguji?
316. Bagaimana kamu menjelaskan alasan memakai `localStorage`?
317. Bagaimana kamu menjelaskan alasan memakai `sessionStorage`?
318. Bagaimana kamu menjelaskan kekurangan project secara jujur?
319. Bagaimana kamu menjelaskan pengembangan lanjutan project ini?
320. Bagaimana kamu menjawab jika penguji bertanya apakah project ini sudah aman untuk produksi?
