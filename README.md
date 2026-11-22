# Culture Roleplay V2 — Setup (gratis)
## 1. Firebase
Buat project, aktifkan **Authentication (Email/Password)** dan **Firestore Database**. Isi `config.js`.
Buat user admin di Authentication > Users, lalu di Firestore buat dokumen `admins/{UID}` (isi field apa saja).
## 2. Rules Firestore
```
rules_version='2';service cloud.firestore{match /databases/{d}/documents{
 function adm(){return request.auth!=null&&exists(/databases/$(d)/documents/admins/$(request.auth.uid))}
 match /secrets/{i}{allow read,write:if adm()}
 match /admins/{i}{allow read:if request.auth!=null&&request.auth.uid==i}
 match /{c}/{i}{
  allow read:if c in ['content','blacklist','team','partners','settings','types']||(c in ['claims','finance']&&adm());
  allow write:if c in ['content','blacklist','team','partners','settings','types']&&adm()}
 match /apps/{i}{allow create:if request.resource.data.typeId=='admin_recruit'?(!exists(/databases/$(d)/documents/settings/admin_recruit)||get(/databases/$(d)/documents/settings/admin_recruit).data.get('open',true)!=false):get(/databases/$(d)/documents/types/$(request.resource.data.typeId)).data.get('open',true)!=false;allow read,update,delete:if adm()}
 match /orders/{i}{allow create:if request.resource.data.status=='menunggu pembayaran'&&request.resource.data.total is number;allow get:if true;allow list,update,delete:if adm()}
}}
```
## 3. Tes di localhost
```
npm install
npm i -g netlify-cli
cp .env.example .env     # isi FIREBASE_SERVICE_ACCOUNT, FIVEM_SECRET, dll
netlify dev              # web di http://localhost:8888
```
Dashboard: `http://localhost:8888/kontrol-cr2.html#masuk` — isi webhook (whitelist, admin_recruit, **orders**) di sana.
## 4. FiveM
Salin `fivem/cr_donation` ke `resources/`. Edit `config.lua` (`Site` dan `Secret` = `FIVEM_SECRET`). Di `server.cfg`:
```
ensure cr_donation
add_ace group.admin cr_donation.admin allow
```
Pemain: `/donation`. Admin (in-game atau konsol): `/cekcoin id`, `/setcoin id jumlah`, `/addcoin id jumlah`.
Script lain: `exports.cr_donation:GetCoins(src)` dan `exports.cr_donation:AddCoins(src,-jumlah,'alasan')`.
### Koneksi dashboard ke FiveM
Resource `cr_donation` membuka endpoint HTTP di `http://IP:30120/cr_donation/` (dijaga `Config.Secret`). Isi `FIVEM_API` dan `FIVEM_SECRET` di `.env` / Netlify. Dashboard lalu bisa: daftar pemain online, log kota, daftar ban + ban/unban, cek inventory, dan set koin. Command in-game: `/cban id alasan`, `/cunban license:xxx`. Saat web sudah online, port 30120 server harus bisa diakses dari internet.
Inventory otomatis mendukung ox_inventory, qb-core, dan es_extended (fungsi `inventory()` di `server.lua`).
## 5. Alur donasi
Pembeli isi nama + jumlah > order dibuat > ke Discord ticket > admin klik **Sudah bayar** di dashboard > kode claim dibuat dan muncul di webhook Discord > admin kasih kode ke pemain > pemain `/donation` > Redeem > saldo CR bertambah. Pemasukan otomatis masuk menu Keuangan.
## 6. Publish
Upload ke GitHub (`.env` sudah di `.gitignore`), hubungkan ke Netlify, isi env var yang sama di Netlify. Ganti `Config.Site` ke URL Netlify.
Foto produk: `catalog.json` + `assets/images/shop/`. Tim dan partner: langsung di `index.html` (bagian TIM dan PARTNERSHIP), foto di `assets/images/team/` dan `assets/images/partner/`.
