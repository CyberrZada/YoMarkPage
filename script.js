// --- 1. MENU MOBILE ---
function toggleMenu() {
    const nav = document.getElementById('navLinks');
    if (window.innerWidth <= 768) {
        nav.classList.toggle('active');
    }
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.getElementById('navLinks').classList.remove('active');
        }
    });
});

const mobileBtn = document.querySelector('.mobile-menu-btn');
if (mobileBtn) {
    mobileBtn.addEventListener('click', toggleMenu);
}

// --- 2. ANIMAÇÃO DE SCROLL (REVEAL) ---
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100; 
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal(); 

// --- 3. LIGHTBOX (MODAL DA GALERIA) ---
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('lightboxImg');
const closeBtn = document.querySelector('.close-btn');
const galleryImages = document.querySelectorAll('.gallery-item img');

galleryImages.forEach(img => {
    img.addEventListener('click', function() {
        if(modal && modalImg) {
            modal.style.display = "flex";
            modalImg.src = this.src;
        }
    });
});

function closeModal() {
    if(modal) {
        modal.style.display = "none";
    }
}

if(closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

if(modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// --- 4. ENVIO DE FORMULÁRIO AJAX (FORMSPREE) ---
const form = document.getElementById("contactForm");
const feedbackDiv = document.getElementById("form-feedback");
const submitBtn = document.getElementById("submitBtn");

if (form) {
    form.addEventListener("submit", async function(event) {
        event.preventDefault(); 
        
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>ENVIANDO...</span> <i class="fas fa-spinner fa-spin" style="margin-left:10px;"></i>';
        submitBtn.disabled = true;

        const data = new FormData(event.target);
        
        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                feedbackDiv.innerHTML = '<div class="success-message"><i class="fas fa-check-circle" style="margin-right: 10px;"></i> Análise solicitada com sucesso!</div>';
                feedbackDiv.style.display = "block";
                feedbackDiv.style.opacity = "1";
                form.reset(); 
            } else {
                throw new Error('Erro na resposta do Formspree');
            }
        } catch (error) {
            feedbackDiv.innerHTML = '<div class="success-message" style="background: #ff4d4d; color: #fff;"><i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i> Ocorreu um erro. Tente pelo WhatsApp.</div>';
            feedbackDiv.style.display = "block";
            feedbackDiv.style.opacity = "1";
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // Esconde a mensagem depois de 5 segundos
            setTimeout(() => {
                feedbackDiv.style.opacity = "0";
                setTimeout(() => { feedbackDiv.style.display = "none"; }, 500);
            }, 5000);
        }
    });
}
