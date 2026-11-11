# PEMWEB-NEONDB-2026
BARRA AHZA FAKHRULLAH 5027251023

Aplikasi CRUD Manajemen Koleksi Buku menggunakan **Express.js** (Back-End), **HTML, CSS, JavaScript** (Front-End), dan **Prisma ORM** yang terhubung ke cloud database **Neon PostgreSQL**.

---

## 📸 Dokumentasi & Bukti Implementasi

### 1. Tampilan Web App (CRUD Koleksi Buku)
Menampilkan antarmuka aplikasi dengan fitur GET, POST (tambah buku), PUT (edit buku), dan DELETE (hapus buku).
![Tampilan Web App](screenshots/web-ui.jpg)

### 2. Database di Neon PostgreSQL
Data yang dimasukkan melalui web secara otomatis tersimpan secara real-time pada tabel `Book` di dashboard Neon PostgreSQL.
![Database Neon](screenshots/neon-db.png)

---

## 🛠️ Tech Stack
- **Back-End**: Express.js, Node.js
- **Database & ORM**: Neon PostgreSQL, Prisma ORM
- **Front-End**: HTML5, CSS3, JavaScript (Fetch API)

## 🚀 Cara Menjalankan Proyek
1. Clone repository ini:
   ```bash
   git clone https://github.com/bahzaff/PEMWEB-NEONDB-2026.git
   cd PEMWEB-NEONDB-2026
   ```
2. Install dependensi:
   ```bash
   npm install
   ```
3. Buat file `.env` dan masukkan connection string database Neon PostgreSQL:
   ```env
   DATABASE_URL="postgresql://username:password@ep-xyz.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
   PORT=3000
   ```
4. Generate Prisma Client & jalankan migrasi database:
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```
5. Jalankan server:
   ```bash
   npm start
   ```
6. Buka di browser: `http://localhost:3000`
