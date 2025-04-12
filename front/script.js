document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(".input-field input");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const formWrapper = document.querySelector(".form-wrapper");
    const showRegister = document.getElementById("show-register");
    const showLogin = document.getElementById("show-login");

    showRegister.addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.style.display = "none";
        registerForm.style.display = "flex";
        formWrapper.style.height = "auto"; 
    });

    showLogin.addEventListener("click", (e) => {
        e.preventDefault();
        registerForm.style.display = "none";
        loginForm.style.display = "flex";
        formWrapper.style.height = "auto";
    });

    inputs.forEach(input => {
        input.addEventListener("focus", () => {
            const label = input.nextElementSibling;
            label.classList.add("active");
        });

        input.addEventListener("blur", () => {
            if (!input.value) {
                const label = input.nextElementSibling;
                label.classList.remove("active");
            }
        });
    });

    function createFallingStar() {
    const star = document.createElement("div");
    star.classList.add("star");
    document.body.appendChild(star);

    const startX = Math.random() * window.innerWidth;
    star.style.left = `${startX}px`;

    setTimeout(() => {
        star.remove();
    }, 3000);
    }

   function startFallingStars() {
    createFallingStar();
    setTimeout(startFallingStars, Math.random() * 5000 + 5000);  
   }

   function createTwinklingStars() {
    for (let i = 0; i < 50; i++) {
        const star = document.createElement("div");
        star.classList.add("star-twinkle");
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        document.body.appendChild(star);
    }
    }

    createTwinklingStars();
    startFallingStars();

     document.querySelector(".login-form").addEventListener("submit", (event) => {
        event.preventDefault();
        window.location.href = "home.html";
    });

    document.querySelector(".register-form")?.addEventListener("submit", (event) => {
        event.preventDefault();
        window.location.href = "home.html";
    });
});
