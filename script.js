// Daftar ID input yang harus dihubungkan untuk teks
const inputFields = ['No', 'Nama', 'Terbilang', 'Untuk', 'Nominal', 'Tanggal', 'Penerima'];

// 1. Logika Teks Input Real-time
inputFields.forEach(id => {
    const inputElement = document.getElementById(`input${id}`);
    const textElement = document.getElementById(`text${id}`);
    
    inputElement.addEventListener('input', function() {
        textElement.innerText = this.value;
    });
});

// 2. Logika Tanda Tangan dengan Goresan (Canvas)
const canvasInput = document.getElementById('canvasSignatureInput');
const ctxInput = canvasInput.getContext('2d');
const btnClear = document.getElementById('btnClearSignature');
const canvasPratinjau = document.getElementById('canvasSignaturePratinjau');
const ctxPratinjau = canvasPratinjau.getContext('2d');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Mengatur gaya garis (pilih warna yang natural, misal biru tua atau hitam)
ctxInput.strokeStyle = '#000000'; // Warna tanda tangan
ctxInput.lineWidth = 2; // Ketebalan garis
ctxInput.lineJoin = 'round'; // Garis halus
ctxInput.lineCap = 'round'; // Ujung garis halus

// Fungsi Menggambar
function draw(e) {
    if (!isDrawing) return;
    
    const rect = canvasInput.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    ctxInput.beginPath();
    ctxInput.moveTo(lastX, lastY);
    ctxInput.lineTo(currentX, currentY);
    ctxInput.stroke();
    
    lastX = currentX;
    lastY = currentY;
    
    // Salin goresan ke pratinjau setiap kali menggambar agar real-time
    salinSignature KePratinjau();
}

// Event Listener untuk Mouse
canvasInput.addEventListener('mousedown', (e) => {
    isDrawing = true;
    const rect = canvasInput.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
});
canvasInput.addEventListener('mousemove', draw);
canvasInput.addEventListener('mouseup', () => isDrawing = false);
canvasInput.addEventListener('mouseout', () => isDrawing = false);

// Event Listener untuk Sentuhan (Touchscreen)
canvasInput.addEventListener('touchstart', (e) => {
    isDrawing = true;
    const rect = canvasInput.getBoundingClientRect();
    const touch = e.touches[0];
    lastX = touch.clientX - rect.left;
    lastY = touch.clientY - rect.top;
});
canvasInput.addEventListener('touchmove', (e) => {
    if (!isDrawing) return;
    e.preventDefault(); // Mencegah scrolling saat menggambar
    const rect = canvasInput.getBoundingClientRect();
    const touch = e.touches[0];
    const currentX = touch.clientX - rect.left;
    const currentY = touch.clientY - rect.top;

    ctxInput.beginPath();
    ctxInput.moveTo(lastX, lastY);
    ctxInput.lineTo(currentX, currentY);
    ctxInput.stroke();
    
    lastX = currentX;
    lastY = currentY;
    
    salinSignatureKePratinjau();
});
canvasInput.addEventListener('touchend', () => isDrawing = false);

// Fungsi Hapus Tanda Tangan
btnClear.addEventListener('click', function() {
    ctxInput.clearRect(0, 0, canvasInput.width, canvasInput.height);
    ctxPratinjau.clearRect(0, 0, canvasPratinjau.width, canvasPratinjau.height);
});

// Fungsi untuk Menyalin Kanvas Input ke Kanvas Pratinjau
function salinSignatureKePratinjau() {
    // Bersihkan pratinjau dulu
    ctxPratinjau.clearRect(0, 0, canvasPratinjau.width, canvasPratinjau.height);
    
    // Set gaya garis di pratinjau agar sama
    ctxPratinjau.strokeStyle = '#000000'; // Warna tanda tangan
    ctxPratinjau.lineWidth = 1; // Ketebalan garis (sesuaikan dengan skala)
    ctxPratinjau.lineJoin = 'round';
    ctxPratinjau.lineCap = 'round';

    // Salin gambar sebagai data URL dan gambarkan ke kanvas pratinjau dengan skala
    const signatureImage = new Image();
    signatureImage.src = canvasInput.toDataURL();
    
    signatureImage.onload = function() {
        // Skala tanda tangan dari kanvas input (300x150) ke kanvas pratinjau (sesuai CSS)
        // Kita gunakan drawImage untuk penskalaan
        ctxPratinjau.drawImage(signatureImage, 0, 0, canvasPratinjau.width, canvasPratinjau.height);
    };
}
