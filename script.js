// Basic interactions: reveal on scroll, navbar background, cursor accent, project modal, contact demo

document.addEventListener("DOMContentLoaded", () => {
  // set current year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Navbar background on scroll
  const nav = document.getElementById("mainNav");
  const updateNav = () => {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  updateNav();
  window.addEventListener("scroll", updateNav);

  // Reveal on scroll
  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach((el) => revealObserver.observe(el));

  // Project modal wiring (simple)
  const projectModalEl = document.getElementById("projectModal");
  const bootstrapModal = new bootstrap.Modal(projectModalEl);
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");

  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const title = btn.dataset.title || "Project";
      const desc = btn.dataset.desc || "";
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      bootstrapModal.show();
    });
  });

  // Contact form demo submit (no backend)
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formFeedback.style.display = "block";
    contactForm.reset();
    setTimeout(() => (formFeedback.style.display = "none"), 3500);
  });

  // Smooth-scroll for nav links (works with CSS smooth but for offset)
  document
    .querySelectorAll('a.nav-link, a.navbar-brand, a.btn[href^="#"]')
    .forEach((a) => {
      a.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (!href || !href.startsWith("#")) return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (!target) return;
        const offset = 68; // navbar height
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
        // collapse navbar on small screens
        const bsCollapse = document.querySelector(".navbar-collapse");
        if (bsCollapse && bsCollapse.classList.contains("show")) {
          new bootstrap.Collapse(bsCollapse).toggle();
        }
      });
    });

  // Cursor accent movement
  const cursorAccent = document.getElementById("cursor-accent");
  window.addEventListener("mousemove", (e) => {
    cursorAccent.style.left = e.clientX + "px";
    cursorAccent.style.top = e.clientY + "px";
  });

  // Make cursor grow slightly when hovering interactive elements
  const interactables = "a, button, .view-btn, .project-card";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(interactables)) {
      cursorAccent.style.transform = "translate(-50%,-50%) scale(1.6)";
      cursorAccent.style.background = "rgba(0,0,0,0.03)";
    }
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(interactables) === null) {
      cursorAccent.style.transform = "translate(-50%,-50%) scale(1)";
      cursorAccent.style.background = "transparent";
    }
  });
});
