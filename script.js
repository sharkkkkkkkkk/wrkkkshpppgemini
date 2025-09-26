document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const submitBtn = document.getElementById('submit-btn');
    const loadingDiv = document.getElementById('loading');
    const responseMsg = document.getElementById('response-message');
    
    // GANTI DENGAN URL WEB APP ANDA DARI GOOGLE APPS SCRIPT
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwEaANk8FxfTIvYsUjztNkaFrkdfZE5vYJ3PWyTRK4d90Sz0WhJsnR3jthtNtUNOn14/exec';

     fetch(scriptURL)
        .then(response => response.json())
        .then(data => {
            if (data.count >= 70) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Pendaftaran Penuh';
                form.classList.add('disabled'); // opsional bisa untuk CSS
            }
        })
        .catch(err => console.error('Gagal cek kuota:', err));
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.textContent = 'MENGIRIM...'; // Ubah teks tombol saat proses
        loadingDiv.classList.remove('hidden');
        responseMsg.textContent = '';
        responseMsg.className = '';

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    // SUKSES! Langsung alihkan ke Grup WhatsApp
                    window.location.href = 'https://chat.whatsapp.com/K8IBowULuuzADWCCcPCzJg';
                } else {
                    // Jika Gagal, tampilkan pesan error
                    throw new Error(data.error || 'Terjadi kesalahan yang tidak diketahui.');
                }
            })
            .catch(error => {
                console.error('Error!', error.message);
                responseMsg.textContent = 'Gagal mendaftar. Silakan coba lagi nanti.';
                responseMsg.classList.add('error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Daftar Sekarang'; // Kembalikan teks tombol
                loadingDiv.classList.add('hidden');
            });
    });

});




