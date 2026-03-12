// --- 1. MENU MOBILE ---
// Mostra ou esconde os links de navegação na versão para celular
function toggleMenu() {
    const nav = document.getElementById('navLinks');
    if (window.innerWidth <= 768) {
        nav.classList.toggle('active');
    }
}

// Para garantir que o menu recolha ao clicar em um link (opcional, mas melhora a experiência)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.getElementById('navLinks').classList.remove('active');
        }
    });
});

// Adiciona o evento de clique ao botão hambúrguer do HTML
const mobileBtn = document.querySelector('.mobile-menu-btn');
if (mobileBtn) {
    mobileBtn.addEventListener('click', toggleMenu);
}

// --- 2. ANIMAÇÃO DE SCROLL (REVEAL) ---
// Faz os elementos surgirem suavemente ao rolar a página
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100; // Define o quão rápido a animação dispara
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// Aciona na rolagem
window.addEventListener("scroll", reveal);
// Aciona imediatamente ao carregar a página
reveal(); 

// --- 3. LIGHTBOX (MODAL DA GALERIA) ---
// Abre as imagens de resultados/provas sociais em tela cheia
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('lightboxImg');
const closeBtn = document.querySelector('.close-btn');
const galleryImages = document.querySelectorAll('.gallery-item img');

// Evento para abrir a imagem clicada
galleryImages.forEach(img => {
    img.addEventListener('click', function() {
        if(modal && modalImg) {
            modal.style.display = "flex";
            modalImg.src = this.src;
        }
    });
});

// Função centralizada para fechar
function closeModal() {
    if(modal) {
        modal.style.display = "none";
    }
}

// Fecha ao clicar no 'X'
if(closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

// Fecha ao clicar fora da imagem (na área preta do fundo)
if(modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}
