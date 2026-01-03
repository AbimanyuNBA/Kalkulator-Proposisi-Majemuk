// load-navbar.js
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk memuat navbar
    function loadNavbar() {
        fetch('navbar.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Gagal memuat navbar');
                }
                return response.text();
            })
            .then(data => {
                // Sisipkan navbar ke dalam elemen dengan id 'navbar-container'
                const navbarContainer = document.getElementById('navbar-container');
                if (navbarContainer) {
                    navbarContainer.innerHTML = data;
                    
                    // Jalankan script yang ada di navbar.html
                    const scripts = navbarContainer.querySelectorAll('script');
                    scripts.forEach(script => {
                        const newScript = document.createElement('script');
                        if (script.src) {
                            newScript.src = script.src;
                        } else {
                            newScript.textContent = script.textContent;
                        }
                        document.body.appendChild(newScript);
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Fallback: tampilkan navbar sederhana jika fetch gagal
                displayFallbackNavbar();
            });
    }
    
    // Fallback navbar jika fetch gagal
    function displayFallbackNavbar() {
        const navbarContainer = document.getElementById('navbar-container');
        if (navbarContainer) {
            navbarContainer.innerHTML = `
                <nav class="navbar">
                    <div class="nav-container">
                        <a href="home.html" class="logo">
                            <i class="fas fa-brain logo-icon"></i>
                            Logika Proposisi
                        </a>
                        <div class="fallback-menu">
                            <a href="home.html">HOME</a> | 
                            <a href="materi.html">MATH</a> | 
                            <a href="kalkulator.html">APLY</a> | 
                            <a href="exam.html">EXAM</a> | 
                            <a href="games.html">GAMES</a> | 
                            <a href="about.html">About</a>
                        </div>
                    </div>
                </nav>
                <style>
                    .navbar { background: white; padding: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                    .nav-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
                    .logo { font-size: 24px; font-weight: bold; color: #FF801A; text-decoration: none; }
                    .fallback-menu a { margin: 0 10px; color: #333; text-decoration: none; }
                    .fallback-menu a:hover { color: #FF801A; }
                </style>
            `;
        }
    }
    
    // Panggil fungsi untuk memuat navbar
    loadNavbar();
});