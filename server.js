require('dotenv').config();
const express = require('express');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 1. GET: Menampilkan seluruh data buku dari database Neon PostgreSQL
app.get('/api/books', async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      orderBy: { id: 'asc' }
    });
    res.json(books);
  } catch (error) {
    console.error('Error GET /api/books:', error);
    res.status(500).json({ message: 'Gagal mengambil data dari database', error: error.message });
  }
});

// 2. POST: Menambahkan data buku baru ke Neon PostgreSQL
app.post('/api/books', async (req, res) => {
  try {
    const { judul, penulis, tahun, kategori } = req.body;

    if (!judul || !penulis || !tahun || !kategori) {
      return res.status(400).json({ message: 'Semua field wajib diisi!' });
    }

    const newBook = await prisma.book.create({
      data: {
        judul,
        penulis,
        tahun: Number(tahun),
        kategori
      }
    });

    res.status(201).json({
      message: 'POST berhasil: Data buku tersimpan di Neon PostgreSQL',
      data: newBook
    });
  } catch (error) {
    console.error('Error POST /api/books:', error);
    res.status(500).json({ message: 'Gagal menambahkan buku', error: error.message });
  }
});

// 3. PUT: Mengubah data buku di Neon PostgreSQL berdasarkan ID
app.put('/api/books/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { judul, penulis, tahun, kategori } = req.body;

    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        ...(judul && { judul }),
        ...(penulis && { penulis }),
        ...(tahun && { tahun: Number(tahun) }),
        ...(kategori && { kategori })
      }
    });

    res.json({
      message: 'PUT berhasil: Data buku diperbarui di Neon PostgreSQL',
      data: updatedBook
    });
  } catch (error) {
    console.error(`Error PUT /api/books/${req.params.id}:`, error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }
    res.status(500).json({ message: 'Gagal memperbarui buku', error: error.message });
  }
});

// 4. DELETE: Menghapus data buku di Neon PostgreSQL berdasarkan ID
app.delete('/api/books/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const deletedBook = await prisma.book.delete({
      where: { id }
    });

    res.json({
      message: 'DELETE berhasil: Data buku dihapus dari Neon PostgreSQL',
      data: deletedBook
    });
  } catch (error) {
    console.error(`Error DELETE /api/books/${req.params.id}:`, error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }
    res.status(500).json({ message: 'Gagal menghapus buku', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server Express & Prisma berjalan di http://localhost:${PORT}`);
});
