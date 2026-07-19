// Daftar ID input yang harus dihubungkan
const inputFields = ['No', 'Nama', 'Terbilang', 'Untuk', 'Nominal', 'Tanggal', 'Penerima'];

inputFields.forEach(id => {
    const inputElement = document.getElementById(`input${id}`);
    const textElement = document.getElementById(`text${id}`);
    
    // Event listener setiap kali pengguna mengetik
    inputElement.addEventListener('input', function() {
        let value = this.value;

        // Jika input nominal, Anda bisa menambahkan format khusus di masa depan di sini
        // Saat ini, teks akan langsung ditampilkan apa adanya
        if (id === 'Nominal' && value !== '') {
            // Menambahkan spasi agar terlihat seperti format uang jika mau (opsional)
            textElement.innerText = value;
        } else {
            // Menggunakan innerText agar Enter pada Textarea tetap menjadi baris baru
            textElement.innerText = value;
        }
    });
});
