document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const currentYear = document.getElementById("currentYear");
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const navbar = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".nav-link");

  // ---------------------------------------------------------
  // 1. Theme handling + Local Storage
  // ---------------------------------------------------------
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
  }

  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";

    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("portfolio-theme", "light");
      themeIcon.classList.replace("bi-sun-fill", "bi-moon-fill");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("portfolio-theme", "dark");
      themeIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
    }
  });

  // ---------------------------------------------------------
  // 2. Dynamic copyright year
  // ---------------------------------------------------------
  currentYear.textContent = new Date().getFullYear();

  // ---------------------------------------------------------
  // 3. Smooth navigation + close mobile navbar
  // ---------------------------------------------------------
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const navbarCollapse = document.getElementById("navbarContent");

      if (navbarCollapse.classList.contains("show")) {
        const collapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (collapse) {
          collapse.hide();
        }
      }
    });
  });

  // ---------------------------------------------------------
  // 4. Highlight active navigation item while scrolling
  // ---------------------------------------------------------
  const sections = document.querySelectorAll("main section[id]");

  const updateActiveNav = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const currentLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (currentLink) currentLink.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();

  // ---------------------------------------------------------
  // 5. Navbar shadow on scroll
  // ---------------------------------------------------------
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
    } else {
      navbar.style.boxShadow = "none";
    }
  });

  // ---------------------------------------------------------
  // 6. Client-side contact form validation
  // ---------------------------------------------------------
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    formMessage.className = "form-message";
    formMessage.textContent = "";

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    const fields = [name, email, subject, message];
    let isValid = true;

    fields.forEach((field) => {
      field.classList.remove("is-invalid");

      if (!field.value.trim()) {
        field.classList.add("is-invalid");
        isValid = false;
      }
    });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() && !emailPattern.test(email.value.trim())) {
      email.classList.add("is-invalid");
      isValid = false;
    }

    if (name.value.trim().length > 0 && name.value.trim().length < 2) {
      name.classList.add("is-invalid");
      isValid = false;
    }

    if (message.value.trim().length > 0 && message.value.trim().length < 10) {
      message.classList.add("is-invalid");
      isValid = false;
    }

    if (!isValid) {
      formMessage.classList.add("error");
      formMessage.textContent = "Please correct the highlighted fields and try again.";
      return;
    }

    // This is a front-end assignment, so the form does not send to a server.
    formMessage.classList.add("success");
    formMessage.textContent =
      "Thank you! Your message has been validated successfully. This demo form is ready to connect to a backend/email service.";

    contactForm.reset();
    fields.forEach((field) => field.classList.remove("is-invalid"));
  });

  // ---------------------------------------------------------
  // 7. Remove validation state while typing
  // ---------------------------------------------------------
  document.querySelectorAll("#contactForm input, #contactForm textarea")
    .forEach((field) => {
      field.addEventListener("input", () => {
        field.classList.remove("is-invalid");
        formMessage.className = "form-message";
        formMessage.textContent = "";
      });
    });
});
