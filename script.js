// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Exclui links que abrem o pop-up para não dar scroll indesejado
    if (anchor.getAttribute('href') !== '#') {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) { // Ajuste o valor conforme necessário
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Simple animation for Hero Section (can be expanded with Intersection Observer for better performance)
document.addEventListener('DOMContentLoaded', () => {
    const heroHeadline = document.querySelector('.animate-fade-in-up');
    const heroParagraph = document.querySelector('.animate-fade-in-up.animation-delay-500');
    const heroButton = document.querySelector('.animate-fade-in-up.animation-delay-1000');

    if (heroHeadline) {
        heroHeadline.classList.remove('opacity-0');
        heroHeadline.style.animation = 'fadeInUp 1s ease-out forwards';
    }
    if (heroParagraph) {
        heroParagraph.classList.remove('opacity-0');
        heroParagraph.style.animation = 'fadeInUp 1s ease-out 0.5s forwards';
    }
    if (heroButton) {
        heroButton.classList.remove('opacity-0');
        heroButton.style.animation = 'fadeInUp 1s ease-out 1s forwards';
    }
});


/* --- Funções para o Popup de Contato --- */

const contactPopup = document.getElementById('contact-popup');
const confirmationPopup = document.getElementById('confirmation-popup');
const contactForm = document.getElementById('contactForm');

// Função para abrir o pop-up de contato
function openContactPopup() {
    if (contactPopup) {
        contactPopup.style.display = 'flex'; // Usar flex para centralizar
        document.body.style.overflow = 'hidden'; // Bloqueia a rolagem do fundo
    }
}

// Função para fechar o pop-up de contato
function closePopup() {
    if (contactPopup) {
        contactPopup.style.display = 'none';
        document.body.style.overflow = ''; // Restaura a rolagem do fundo
        contactForm.reset(); // Limpa o formulário ao fechar
    }
}

// Função para mostrar o pop-up de confirmação
function showConfirmationPopup() {
    if (confirmationPopup) {
        confirmationPopup.style.display = 'flex'; // Usar flex para centralizar
        document.body.style.overflow = 'hidden'; // Bloqueia a rolagem do fundo
    }
}

// Função para fechar o pop-up de confirmação
function closeConfirmationPopup() {
    if (confirmationPopup) {
        confirmationPopup.style.display = 'none';
        document.body.style.overflow = ''; // Restaura a rolagem do fundo
    }
}

// Lidar com o envio do formulário
async function handleSubmit(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: new URLSearchParams(data).toString(), // Envia como x-www-form-urlencoded
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.ok) {
            closePopup(); // Fecha o pop-up do formulário
            showConfirmationPopup(); // Mostra o pop-up de confirmação
        } else {
            console.error('Erro ao enviar o formulário:', response.statusText);
            // Poderia mostrar uma mensagem de erro ao usuário aqui
            alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Ocorreu um erro na conexão. Por favor, verifique sua internet e tente novamente.');
    }
}

// Adiciona evento de clique para fechar o pop-up de contato clicando fora do conteúdo
if (contactPopup) {
    contactPopup.addEventListener('click', function(event) {
        if (event.target === contactPopup) {
            closePopup();
        }
    });
}