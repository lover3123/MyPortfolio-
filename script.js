// ==========================================================
// The Morning Brief — Rohan Rajbanshi's portfolio
// ==========================================================

// ----------------------------------------------------------
// Motion preference — the on-page toggle wins over the OS
// setting, and the choice is remembered across visits
// ----------------------------------------------------------
const root = document.documentElement;

// The opening curtain adds a clear editorial entry point without blocking the page.
const introCurtain = document.getElementById("introCurtain");
const introSkip = document.getElementById("introSkip");
if (introCurtain && introSkip) {
  const skipIntro = () => introCurtain.classList.add("is-skipped");
  introSkip.addEventListener("click", skipIntro);
  window.setTimeout(skipIntro, 2700);
}

let storedMotion = null;
try {
  storedMotion = localStorage.getItem("rr-motion");
} catch (e) {
  /* storage unavailable — fall back to the OS setting */
}

const systemReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const motionOn = storedMotion === null ? !systemReduced : storedMotion === "on";
const motionOff = !motionOn;

root.classList.add(motionOn ? "motion-on" : "motion-off");

// OS "reduce motion" only matters when the user hasn't forced motion on
const reducedMotion = systemReduced && !motionOn;
const finePointer = window.matchMedia("(pointer: fine)").matches;

// Motion toggle button
const motionToggle = document.getElementById("motionToggle");
const motionIcon = motionToggle.querySelector(".motion-toggle-icon");
motionToggle.setAttribute("aria-pressed", String(motionOn));
motionIcon.textContent = motionOn ? "⏸" : "▶";

motionToggle.addEventListener("click", () => {
  try {
    localStorage.setItem("rr-motion", motionOn ? "off" : "on");
  } catch (e) {
    /* ignore */
  }
  location.reload();
});

// ----------------------------------------------------------
// Masthead date
// ----------------------------------------------------------
(function setMastheadDate() {
  const el = document.getElementById("mastheadDate");
  if (!el) return;
  const now = new Date();
  const day = now.getDate();
  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();
  el.textContent = `${month} ${day}, ${year}`;
})();

// ----------------------------------------------------------
// Mobile navigation toggle
// ----------------------------------------------------------
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  const open = navbar.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", String(open));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// ----------------------------------------------------------
// Scroll-driven UI: navbar, scroll-to-top, progress bar,
// scroll cue
// ----------------------------------------------------------
const scrollTopBtn = document.getElementById("scrollTop");
const progressBar = document.getElementById("scrollProgress");
const masthead = document.querySelector(".masthead");

function onScroll() {
  const y = window.scrollY;
  navbar.classList.toggle("scrolled", y > 10);
  scrollTopBtn.classList.toggle("visible", y > 400);
  if (masthead) masthead.classList.toggle("past", y > 320);

  if (progressBar) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
  }
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
});

// Scroll cue → about section
const scrollCue = document.querySelector(".scroll-cue");
if (scrollCue) {
  scrollCue.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("about").scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
    });
  });
}

// ----------------------------------------------------------
// Active nav link highlighting
// ----------------------------------------------------------
const sections = document.querySelectorAll("section[id]");
const links = Array.from(navLinks.querySelectorAll("a"));

function setActiveLink() {
  const pos = window.scrollY + 120;
  let currentId = "";
  sections.forEach((section) => {
    if (section.offsetTop <= pos) currentId = section.id;
  });
  links.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
  });
}

window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();

// Current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

// ----------------------------------------------------------
// Scroll reveal animations (skipped for reduced motion)
// ----------------------------------------------------------
const revealTargets = document.querySelectorAll(
  ".section-head, .article-grid > *, .about-grid > *, .skill-card, .education-card, .record-card, .exhibit, .contact-card, .ledger-entry, .credentials-card"
);

// Skill field menu: cards inherit the department label that precedes them.
(function setupSkillFilters() {
  const grid = document.querySelector(".skills-grid");
  const buttons = document.querySelectorAll(".skill-filter-button");
  if (!grid || !buttons.length) return;

  let department = "";
  grid.querySelectorAll(":scope > *").forEach((item) => {
    if (item.classList.contains("skill-category-label")) {
      department = item.textContent.toLowerCase().includes("programming")
        ? "programming"
        : item.textContent.toLowerCase().includes("design")
          ? "design"
          : "engineering";
      item.dataset.skillDepartment = department;
    } else if (item.classList.contains("skill-card")) {
      item.dataset.skillDepartment = department;
    }
  });

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.skillFilter;
      buttons.forEach((control) => {
        const active = control === button;
        control.classList.toggle("is-active", active);
        control.setAttribute("aria-pressed", String(active));
      });
      grid.querySelectorAll(":scope > *").forEach((item) => {
        const matches = filter === "all" || item.dataset.skillDepartment === filter;
        item.classList.toggle("is-filtered", !matches);
      });
    });
  });
})();

if ("IntersectionObserver" in window && !reducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("revealed");
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            el.style.transitionDelay = "";
          })
        );
        observer.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    const siblings = Array.from(el.parentElement.children);
    const i = siblings.indexOf(el);
    if (el.classList.contains("skill-card") || el.classList.contains("exhibit")) {
      el.style.transitionDelay = `${(i % 4) * 80}ms`;
    }
    observer.observe(el);
  });

  // The section rules are observed separately — they only need the
  // `revealed` class to trigger the draw animation (no reveal transform,
  // which would fight the scaleX animation).
  const ruleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        ruleObserver.unobserve(entry.target);
      });
    },
    { threshold: 0, rootMargin: "0px 0px -60px 0px" }
  );
  document.querySelectorAll(".article .rule-draw").forEach((rule) => ruleObserver.observe(rule));
}

// ----------------------------------------------------------
// Section headings — masked word wipe (skipped for reduced motion)
// ----------------------------------------------------------
(function splitHeadings() {
  if (reducedMotion) return;
  document.querySelectorAll(".section-head h2").forEach((h2) => {
    const words = h2.textContent.trim().split(/\s+/);
    h2.innerHTML = words
      .map(
        (word, i) =>
          `<span class="hw" style="--wd:${(i * 60).toFixed(0)}ms"><span class="hwi">${word}</span></span>`
      )
      .join(" ");
  });
})();

// ----------------------------------------------------------
// 3D tilt on skill & contact cards (desktop, motion on)
// ----------------------------------------------------------
if (finePointer && !motionOff) {
  const tiltCards = document.querySelectorAll(".skill-card, .contact-card");
  tiltCards.forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty("--ry", `${((px - 0.5) * 8).toFixed(2)}deg`);
      card.style.setProperty("--rx", `${((0.5 - py) * 8).toFixed(2)}deg`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--rx", "0deg");
    });
  });
}

// Small magnetic pull on primary links. It is intentionally limited to desktop.
if (finePointer && !motionOff) {
  document.querySelectorAll(".btn, .nav-links a").forEach((link) => {
    link.classList.add("magnetic-link");
    link.addEventListener("pointermove", (event) => {
      const rect = link.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) * 0.08;
      const y = (event.clientY - (rect.top + rect.height / 2)) * 0.08;
      link.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
    link.addEventListener("pointerleave", () => {
      link.style.transform = "translate3d(0, 0, 0)";
    });
  });
}

// ----------------------------------------------------------
// Cursor glow that trails the pointer (desktop, motion on)
// ----------------------------------------------------------
const cursorGlow = document.getElementById("cursorGlow");
if (cursorGlow && finePointer && !motionOff) {
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let curX = targetX;
  let curY = targetY;
  let rafId = null;

  const loop = () => {
    curX += (targetX - curX) * 0.14;
    curY += (targetY - curY) * 0.14;
    cursorGlow.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
    rafId = null;
    if (Math.abs(targetX - curX) > 0.5 || Math.abs(targetY - curY) > 0.5) {
      rafId = requestAnimationFrame(loop);
    }
  };

  window.addEventListener(
    "pointermove",
    (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      cursorGlow.style.opacity = "1";
      if (!rafId) rafId = requestAnimationFrame(loop);
    },
    { passive: true }
  );
  document.documentElement.addEventListener("pointerleave", () => {
    cursorGlow.style.opacity = "0";
  });
}
