function toggleMenu() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('active'); // Alterna a classe 'active' no menu
}

// Comportamento de scroll suave
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Ativa o menu hambúrguer
document.querySelector('.burguer').addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('active');
});

const burger = document.querySelector('.burguer');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    // Toggle o estado de visibilidade do menu
    navLinks.classList.toggle('active');
    navLinks.classList.toggle('inactive');
    burger.classList.toggle('toggle');
});
// Função para abrir o pop-up
function openPopup() {
    document.getElementById("contact-popup").style.display = "flex";
}

// Função para fechar o pop-up
function closePopup() {
    document.getElementById("contact-popup").style.display = "none";
}
async function handleSubmit(event) {
    event.preventDefault(); // Evita o envio padrão do formulário
    const form = document.getElementById("contactForm");

    // Cria um objeto FormData com os dados do formulário
    const formData = new FormData(form);

    // Envia o formulário usando fetch para evitar redirecionamento
    try {
        await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        // Exibe o popup de confirmação
        document.getElementById('contact-popup').style.display = 'none'; // Fecha o formulário de contato
        document.getElementById('confirmation-popup').style.display = 'flex'; // Mostra o popup de confirmação
        
    } catch (error) {
        console.error("Erro ao enviar o formulário:", error);
        alert("Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.");
    }
}

function closeConfirmationPopup() {
    document.getElementById('confirmation-popup').style.display = 'none'; // Fecha o popup de confirmação
}