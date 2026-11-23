const navigationLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".page-section");

if ("IntersectionObserver" in window && navigationLinks.length && sections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visibleSection = entries
      .filter((entry) => entry.isIntersecting)
      .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

    if (!visibleSection) return;

    navigationLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${visibleSection.target.id}`;
      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }, {
    rootMargin: "-25% 0px -55% 0px",
    threshold: [0, 0.2, 0.5]
  });

  sections.forEach((section) => sectionObserver.observe(section));
}
