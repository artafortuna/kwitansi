// 1. Logika Teks Input Real-time
const inputFields = ['No', 'Nama', 'Terbilang', 'Untuk', 'Nominal', 'Tanggal', 'Penerima'];

inputFields.forEach(id => {
    const inputElement = document.getElementById(`input${id}`);
    const textElement = document.getElementById(`text${id}`);
    
    inputElement.addEventListener('input', function() {
        textElement.innerText = this.value;
    });
});

// 2. Logika Tanda Tangan
const canvasInput = document.getElementById('canvasSignatureInput');
const ctxInput = canvasInput.getContext('2d');
const btnClear = document.getElementById('btnClearSignature');
const canvasPratinjau = document.getElementById('canvasSignaturePratinjau');
const ctxPratinjau = canvasPratinjau.getContext('2d');

// Pastikan ukuran canvas pratinjau sinkron dengan atributnya agar tidak blur
canvasPratinjau.width = 300; 
canvasPratinjau.height = 150;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Set gaya garis
ctxInput.strokeStyle = '#000000';
ctxInput.lineWidth = 2;
ctxInput.lineJoin = 'round';
ctxInput.lineCap = 'round';

// Fungsi untuk menyalin gambar dari canvas input ke canvas pratinjau (Optimasi)
function syncCanvas() {
    ctxPratinjau.clearRect(0, 0, canvasPratinjau.width, canvasPratinjau.height);
    ctxPratinjau.drawImage(canvasInput, 0, 0, canvasPratinjau.width, canvasPratinjau.height);
}

// Fungsi menggambar
function draw(e) {
    if (!isDrawing) return;
    
    // Mendapatkan posisi mouse/touch
    let clientX, clientY;
    if (e.touches) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    const rect = canvasInput.getBoundingClientRect();
    const currentX = clientX - rect.left;
    const currentY = clientY - rect.top;

    ctxInput.beginPath();
    ctxInput.moveTo(lastX, lastY);
    ctxInput.lineTo(currentX, currentY);
    ctxInput.stroke();
    
    lastX = currentX;
    lastY = currentY;
    
    // Panggil fungsi sinkronisasi yang ringan
    syncCanvas();
}

// Event Mouse
canvasInput.addEventListener('mousedown', (e) => {
    isDrawing = true;
    const rect = canvasInput.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
});

canvasInput.addEventListener('mousemove', draw);
canvasInput.addEventListener('mouseup', () => isDrawing = false);
canvasInput.addEventListener('mouseout', () => isDrawing = false);

// Event Sentuhan (Touch)
canvasInput.addEventListener('touchstart', (e) => {
    isDrawing = true;
    const rect = canvasInput.getBoundingClientRect();
    const touch = e.touches[0];
    lastX = touch.clientX - rect.left;
    lastY = touch.clientY - rect.top;
});

canvasInput.addEventListener('touchmove', (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    draw(e);
});

canvasInput.addEventListener('touchend', () => isDrawing = false);

// Fungsi Hapus
btnClear.addEventListener('click', function() {
    ctxInput.clearRect(0, 0, canvasInput.width, canvasInput.height);
    ctxPratinjau.clearRect(0, 0, canvasPratinjau.width, canvasPratinjau.height);
});
