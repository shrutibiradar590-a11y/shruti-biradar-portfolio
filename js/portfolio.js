document.documentElement.classList.add("js-enabled");

const typedRole = document.querySelector(".typed-role");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const roles = ["Full Stack Developer", "Java Developer", "Problem Solver"];

if (typedRole && !reducedMotion.matches) {
  let roleIndex = 0;
  let characterIndex = roles[roleIndex].length;
  let deleting = true;

  function updateTypedRole() {
    const role = roles[roleIndex];

    if (deleting) {
      characterIndex -= 1;
      typedRole.textContent = role.slice(0, characterIndex);

      if (characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        window.setTimeout(updateTypedRole, 350);
        return;
      }
    } else {
      characterIndex += 1;
      typedRole.textContent = roles[roleIndex].slice(0, characterIndex);

      if (characterIndex === roles[roleIndex].length) {
        deleting = true;
        window.setTimeout(updateTypedRole, 1400);
        return;
      }
    }

    window.setTimeout(updateTypedRole, deleting ? 55 : 95);
  }

  window.setTimeout(updateTypedRole, 1500);
}

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("#site-menu");

function closeMenu() {
  if (!menuToggle || !menu) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  menu.classList.remove("is-open");
}

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    menu.classList.toggle("is-open", !isOpen);
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 640) closeMenu();
  });
}

const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll('.menu a[href^="#"]');

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));

  const sectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${entry.target.id}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }
  }, { rootMargin: "-25% 0px -65% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
