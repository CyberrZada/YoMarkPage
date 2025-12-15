document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. MÁSCARA DE TELEFONE (Formato Brasileiro) ---
    const phoneInput = document.getElementById('phone');
    if(phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }

    /* --- 2. LÓGICA DE ENVIO REAL (CONECTADO AO SEU FORMSPREE) --- */
    const form = document.getElementById('contactForm');
    const feedbackContainer = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submitBtn');
    
    if(form) {
        async function handleSubmit(event) {
            event.preventDefault(); // Impede o recarregamento da página

            // 1. Feedback Visual: Botão muda para "Enviando..."
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.style.opacity = "0.7";
            submitBtn.style.cursor = "not-allowed";

            // 2. Prepara os dados do formulário
            const data = new FormData(event.target);

            try {
                // 3. Envio Real para o seu Formspree
                const response = await fetch(event.target.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // === SUCESSO ===
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
                    submitBtn.style.backgroundColor = "#2ecc71"; // Verde
                    
                    // Mostra mensagem de sucesso
                    const nameInput = document.getElementById('name');
                    const firstName = nameInput ? nameInput.value.split(' ')[0] : 'Visitante';
                    
                    feedbackContainer.style.display = 'block';
                    // Delay pequeno para animação
                    setTimeout(() => {
                        feedbackContainer.style.opacity = '1';
                        feedbackContainer.innerHTML = `
                            <div class="success-message">
                                <i class="fas fa-check-circle"></i>
                                <span>Obrigado, ${firstName}! Recebemos sua mensagem.</span>
                            </div>
                        `;
                    }, 50);

                    form.reset(); // Limpa os campos

                    // Restaura o botão após 5 segundos
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.style.backgroundColor = "";
                        submitBtn.style.opacity = "1";
                        submitBtn.style.cursor = "pointer";
                        
                        // Esconde a mensagem
                        feedbackContainer.style.opacity = '0';
                        setTimeout(() => { feedbackContainer.style.display = 'none'; }, 500);
                    }, 5000);

                } else {
                    // === ERRO DO SERVIDOR ===
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Erro no envio');
                }
            } catch (error) {
                // === ERRO DE CONEXÃO ===
                console.error(error);
                submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erro';
                submitBtn.style.backgroundColor = "#e74c3c"; // Vermelho
                
                feedbackContainer.style.display = 'block';
                feedbackContainer.style.opacity = '1';
                feedbackContainer.innerHTML = `
                    <div class="error-message" style="color: #e74c3c; background: rgba(231,76,60,0.1); padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #e74c3c;">
                        <i class="fas fa-wifi"></i> Ocorreu um erro. Verifique sua conexão ou tente pelo WhatsApp.
                    </div>
                `;
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.backgroundColor = "";
                    submitBtn.style.opacity = "1";
                    submitBtn.style.cursor = "pointer";
                }, 4000);
            }
        }

        form.addEventListener("submit", handleSubmit);
    }

    // --- 3. MENU MOBILE ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#0f0f0f';
                navLinks.style.padding = '20px';
                navLinks.style.borderBottom = '1px solid #333';
                navLinks.style.zIndex = '999';
            }
        });

        // Fecha menu ao clicar em link
        links.forEach(link => {
            link.addEventListener('click', () => {
                if(window.innerWidth <= 600) {
                    navLinks.style.display = 'none';
                }
            });
        });
    }

    // --- 4. ANIMAÇÃO AO ROLAR (SCROLL REVEAL) ---
    // Seleciona todos os elementos com a classe .reveal
    const reveals = document.querySelectorAll('.reveal');

    // Cria um observador para ver quando o elemento entra na tela
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe 'active' para iniciar a animação CSS
                entry.target.classList.add('active');
                // Para de observar este elemento (anima só uma vez)
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Começa a animar quando 10% do elemento aparece
    });

    // Ativa o observador em cada elemento
    reveals.forEach(element => {
        revealOnScroll.observe(element);
    });
});
/* --- 5. LIGHTBOX (VISUALIZADOR DE IMAGENS) --- */
    
    // Elementos do Modal
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("lightboxImg");
    const captionText = document.getElementById("caption");
    const closeBtn = document.querySelector(".close-btn");

    // Seleciona todas as imagens dentro da galeria de resultados
    const galleryImages = document.querySelectorAll('.gallery-item img');

    if (modal && modalImg && galleryImages.length > 0) {
        
        // Adiciona evento de clique em CADA imagem da galeria
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = "flex"; // Mostra o modal
                modalImg.src = this.src;      // Pega a foto clicada e põe no modal
                captionText.innerHTML = this.alt; // Usa o texto alternativo como legenda
                
                // Desabilita rolagem do site atrás do modal
                document.body.style.overflow = "hidden";
            });
        });

        // Função para Fechar
        function closeModal() {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // Reabilita rolagem
        }

        // Fecha ao clicar no X
        closeBtn.addEventListener('click', closeModal);

        // Fecha ao clicar fora da imagem (no fundo preto)
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Fecha ao apertar a tecla ESC
        document.addEventListener('keydown', function(e) {
            if(e.key === "Escape" && modal.style.display === "flex") {
                closeModal();
            }
        });
    }