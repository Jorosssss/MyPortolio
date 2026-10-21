
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
  sidebar.classList.remove("open");
  overlay.classList.remove("visible");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");

  overlay.classList.toggle("visible", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

overlay.addEventListener("click", closeMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    closeMenu();
  });
});

// Highlight the current section while scrolling.
const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: "-25% 0px -60% 0px" }
);

sections.forEach((section) => observer.observe(section));