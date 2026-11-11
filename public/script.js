const bookForm = document.getElementById('book-form');
const bookList = document.getElementById('book-list');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const totalCount = document.getElementById('total-count');

const bookIdInput = document.getElementById('book-id');
const judulInput = document.getElementById('judul');
const penulisInput = document.getElementById('penulis');
const tahunInput = document.getElementById('tahun');
const kategoriInput = document.getElementById('kategori');

const statusLog = document.getElementById('status-log');
const statusBadge = document.getElementById('status-badge');
const statusText = document.getElementById('status-text');

let booksData = [];

// Menampilkan notifikasi metode HTTP (GET, POST, PUT, DELETE) di bagian atas
function showStatus(method, message) {
  statusLog.classList.remove('hidden');
  statusBadge.className = `badge badge-${method.toLowerCase()}`;
  statusBadge.textContent = method;
  statusText.textContent = message;
}

// 1. GET: Mengambil dan menampilkan seluruh data buku
async function fetchBooks(showBanner = false) {
  try {
    const response = await fetch('/api/books');
    booksData = await response.json();
    renderTable(booksData);
    if (showBanner) {
      showStatus('GET', 'GET /api/books — Berhasil memuat seluruh data buku pada halaman web.');
    }
  } catch (error) {
    console.error('Gagal mengambil data:', error);
  }
}

function renderTable(books) {
  bookList.innerHTML = '';
  totalCount.textContent = `${books.length} Buku`;

  if (books.length === 0) {
    bookList.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding: 20px; color: #64748b;">
          Belum ada data buku. Silakan tambahkan melalui form di samping.
        </td>
      </tr>
    `;
    return;
  }

  books.forEach((book) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>#${book.id}</strong></td>
      <td>${book.judul}</td>
      <td>${book.penulis}</td>
      <td>${book.tahun}</td>
      <td><span class="category-tag">${book.kategori}</span></td>
      <td>
        <button class="btn btn-edit" onclick="startEdit(${book.id})">Edit</button>
        <button class="btn btn-delete" onclick="deleteBook(${book.id})">Hapus</button>
      </td>
    `;
    bookList.appendChild(tr);
  });
}

// 2. POST & 3. PUT: Menangani submit form untuk Tambah atau Edit
bookForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = bookIdInput.value;
  const payload = {
    judul: judulInput.value.trim(),
    penulis: penulisInput.value.trim(),
    tahun: Number(tahunInput.value),
    kategori: kategoriInput.value
  };

  try {
    if (id) {
      // Metode PUT (Edit Data)
      const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (response.ok) {
        showStatus('PUT', `PUT /api/books/${id} — Berhasil mengubah data buku "${result.data.judul}"`);
        resetForm();
        fetchBooks(false);
      }
    } else {
      // Metode POST (Tambah Data Baru)
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (response.ok) {
        showStatus('POST', `POST /api/books — Berhasil menambahkan buku baru "${result.data.judul}"`);
        resetForm();
        fetchBooks(false);
      }
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
});

// Mengisi form saat tombol Edit diklik (Persiapan PUT)
window.startEdit = function (id) {
  const book = booksData.find((b) => b.id === id);
  if (!book) return;

  bookIdInput.value = book.id;
  judulInput.value = book.judul;
  penulisInput.value = book.penulis;
  tahunInput.value = book.tahun;
  kategoriInput.value = book.kategori;

  formTitle.textContent = `✏️ Edit Buku #${book.id} (PUT)`;
  submitBtn.textContent = 'Update Data (PUT)';
  submitBtn.className = 'btn btn-warning';
  cancelBtn.classList.remove('hidden');
  judulInput.focus();
};

// Batal Edit
cancelBtn.addEventListener('click', () => {
  resetForm();
});

function resetForm() {
  bookForm.reset();
  bookIdInput.value = '';
  formTitle.textContent = '➕ Tambah Buku Baru (POST)';
  submitBtn.textContent = 'Simpan Data (POST)';
  submitBtn.className = 'btn btn-primary';
  cancelBtn.classList.add('hidden');
}

// 4. DELETE: Menghapus data saat tombol Hapus diklik
window.deleteBook = async function (id) {
  const book = booksData.find((b) => b.id === id);
  if (!book) return;

  try {
    const response = await fetch(`/api/books/${id}`, {
      method: 'DELETE'
    });
    const result = await response.json();

    if (response.ok) {
      showStatus('DELETE', `DELETE /api/books/${id} — Berhasil menghapus buku "${result.data.judul}"`);
      if (bookIdInput.value == id) {
        resetForm();
      }
      fetchBooks(false);
    }
  } catch (error) {
    console.error('Gagal menghapus buku:', error);
  }
};

// Muat data pertama kali saat halaman dibuka
fetchBooks(true);

