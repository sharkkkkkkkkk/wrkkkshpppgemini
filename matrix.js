const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

// Atur ukuran canvas sesuai ukuran window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Karakter yang akan ditampilkan (bilangan biner)
const binary = "01";
const characters = binary.split("");

const fontSize = 16;
// Hitung jumlah kolom berdasarkan lebar canvas dan ukuran font
const columns = canvas.width / fontSize;

// Array untuk menyimpan posisi Y (vertikal) dari setiap kolom karakter
const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function draw() {
    // Memberi efek pudar pada frame sebelumnya untuk menciptakan jejak
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Warna hijau stabilo
    ctx.fillStyle = "#39FF14"; 
    ctx.font = fontSize + "px arial";

    // Loop untuk setiap kolom
    for (let i = 0; i < drops.length; i++) {
        // Pilih karakter acak dari '0' atau '1'
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        // Gambar karakter di posisi x dan y
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Kirim kembali karakter ke atas layar secara acak setelah melewati batas bawah
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Pindahkan posisi y ke bawah
        drops[i]++;
    }
}

// Menjalankan fungsi draw setiap 33 milidetik untuk menciptakan animasi
setInterval(draw, 33);

// Menyesuaikan ukuran canvas jika window di-resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});