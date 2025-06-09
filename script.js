// script.js atualizado

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav-links");

  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // Scroll suave
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        nav.classList.remove("active"); // fecha o menu após clicar
      }
    });
  });
});

function openPopup() {
  document.getElementById("contact-popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("contact-popup").style.display = "none";
}

async function handleSubmit(event) {
  event.preventDefault();
  const form = document.getElementById("contactForm");
  const formData = new FormData(form);

  try {
    await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    document.getElementById("contact-popup").style.display = "none";
    document.getElementById("confirmation-popup").style.display = "flex";
  } catch (error) {
    console.error("Erro ao enviar o formulário:", error);
    alert("Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.");
  }
}

function closeConfirmationPopup() {
  document.getElementById("confirmation-popup").style.display = "none";
}