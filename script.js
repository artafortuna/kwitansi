document.addEventListener("DOMContentLoaded", function() {
    console.log("Aplikasi siap dijalankan...");

    // 1. Logika Teks Input Real-time
    const inputFields = ['No', 'Nama', 'Terbilang', 'Untuk', 'Nominal', 'Tanggal', 'Penerima'];

    inputFields.forEach(id => {
        const inputElement = document.getElementById(`input${id}`);
        const textElement = document.getElementById(`text${id}`);
        
        if (inputElement && textElement) {
            inputElement.addEventListener('input', function() {
                textElement.innerText = this.value;
            });
        }
    });

    // 2. Logika Tanda Tangan
    const canvasInput = document.getElementById('canvasSignatureInput');
    const canvasPratinjau = document.getElementById('canvasSignaturePratinjau');
    const btnClear = document.getElementById('btnClearSignature');

    // Pastikan kedua canvas memiliki konteks
    const ctxInput = canvasInput.getContext('2d');
    const ctxPratinjau = canvasPratinjau.getContext('2d');

    // Atur dimensi canvas pratinjau agar sama dengan input secara programatik
    canvasPratinjau.width = canvasInput.width;
    canvasPratinjau.height = canvasInput.height;

    // Set gaya garis (Warna Hitam)
    ctxInput.strokeStyle = '#000000';
    ctxInput.lineWidth = 2;
    ctxInput.lineJoin = 'round';
    ctxInput.lineCap = 'round';

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Fungsi menggambar
    function draw(e) {
        if (!isDrawing) return;
        
        // Dapatkan posisi koordinat
        const rect = canvasInput.getBoundingClientRect();
        let clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
        let clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);
        
        const currentX = clientX - rect.left;
        const currentY = clientY - rect.top;

        // Gambar di input
        ctxInput.beginPath();
        ctxInput.moveTo(lastX, lastY);
        ctxInput.lineTo(currentX, currentY);
        ctxInput.stroke();
        
        lastX = currentX;
        lastY = currentY;

        // Gambar di pratinjau (copy secara langsung)
        ctxPratinjau.clearRect(0, 0, canvasPratinjau.width, canvasPratinjau.height);
        ctxPratinjau.drawImage(canvasInput, 0, 0);
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

    // Event Sentuhan
    canvasInput.addEventListener('touchstart', (e) => {
        isDrawing = true;
        const rect = canvasInput.getBoundingClientRect();
        const touch = e.touches[0];
        lastX = touch.clientX - rect.left;
        lastY = touch.clientY - rect.top;
    });

    canvasInput.addEventListener('touchmove', (e) => {
        if (isDrawing) {
            e.preventDefault(); // Mencegah scroll layar
            draw(e);
        }
    });

    canvasInput.addEventListener('touchend', () => isDrawing = false);

    // Fungsi Hapus
    if (btnClear) {
        btnClear.addEventListener('click', function() {
            ctxInput.clearRect(0, 0, canvasInput.width, canvasInput.height);
            ctxPratinjau.clearRect(0, 0, canvasPratinjau.width, canvasPratinjau.height);
        });
    }
});
