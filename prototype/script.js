(() => {
  const root = document.documentElement;
  const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const toggle = document.querySelector("#motion-toggle");
  let manualReduce = false;

  const motionReduced = () => manualReduce || reduceQuery.matches || root.classList.contains("reduce-motion");

  function updateMotionButton() {
    const reduced = motionReduced();
    toggle?.setAttribute("aria-pressed", String(reduced));
    if (toggle) toggle.textContent = reduced ? "Enable motion" : "Reduce motion";
  }

  toggle?.addEventListener("click", () => {
    manualReduce = !manualReduce;
    root.classList.toggle("reduce-motion", manualReduce);
    updateMotionButton();
    document.querySelectorAll(".project-card").forEach(stopDemo);
  });

  reduceQuery.addEventListener?.("change", updateMotionButton);
  updateMotionButton();

  const reveals = [...document.querySelectorAll(".reveal")];
  if ("IntersectionObserver" in window && !motionReduced()) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
        const rect = entry.boundingClientRect;
        entry.target.classList.toggle("is-past", !entry.isIntersecting && rect.bottom < 0);
      });
    }, { threshold: [0.12, 0.38, 0.72], rootMargin: "-4% 0px -10% 0px" });
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  const hero = document.querySelector(".hero");
  if (hero) {
    hero.addEventListener("pointermove", (event) => {
      if (motionReduced()) return;
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      root.style.setProperty("--mouse-x", x.toFixed(3));
      root.style.setProperty("--mouse-y", y.toFixed(3));
    });
  }

  const cards = [...document.querySelectorAll(".project-card")];
  const timers = new WeakMap();

  function frames(card) {
    return [...card.querySelectorAll(".demo-frame")];
  }

  function showFrame(card, index) {
    const all = frames(card);
    all.forEach((frame, i) => frame.classList.toggle("active", i === index));
    card.dataset.frame = String(index);
  }

  function stopDemo(card) {
    const timer = timers.get(card);
    if (timer) window.clearInterval(timer);
    timers.delete(card);
    card.classList.remove("is-playing");
    card.querySelector(".demo-play")?.setAttribute("aria-pressed", "false");
    const play = card.querySelector(".demo-play");
    if (play) play.textContent = "Play demo";
    if (motionReduced()) showFrame(card, 0);
  }

  function playDemo(card) {
    if (motionReduced()) {
      card.classList.add("is-active");
      showFrame(card, 0);
      return;
    }
    stopDemo(card);
    card.classList.add("is-playing");
    const play = card.querySelector(".demo-play");
    play?.setAttribute("aria-pressed", "true");
    if (play) play.textContent = "Pause demo";
    let index = Number(card.dataset.frame || 0);
    showFrame(card, index);
    const timer = window.setInterval(() => {
      const all = frames(card);
      index = (index + 1) % all.length;
      showFrame(card, index);
    }, 1450);
    timers.set(card, timer);
  }

  cards.forEach((card) => {
    let hoverDelay = 0;

    card.addEventListener("pointerenter", () => {
      card.classList.add("is-active");
      if (motionReduced()) return;
      hoverDelay = window.setTimeout(() => playDemo(card), 260);
    });

    card.addEventListener("pointerleave", () => {
      window.clearTimeout(hoverDelay);
      card.classList.remove("is-active");
      stopDemo(card);
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
      showFrame(card, 0);
    });

    card.addEventListener("focusin", () => {
      card.classList.add("is-active");
      if (!motionReduced()) playDemo(card);
    });

    card.addEventListener("focusout", (event) => {
      if (card.contains(event.relatedTarget)) return;
      card.classList.remove("is-active");
      stopDemo(card);
      showFrame(card, 0);
    });

    card.addEventListener("pointermove", (event) => {
      if (motionReduced() || event.pointerType === "touch") return;
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      card.style.setProperty("--tilt-x", `${(x * 3.2).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(-y * 2.6).toFixed(2)}deg`);
    });

    card.addEventListener("click", (event) => {
      if (event.target.closest(".demo-play")) return;
      if (window.matchMedia("(hover: none)").matches) {
        card.classList.toggle("is-active");
        if (card.classList.contains("is-active")) playDemo(card);
        else stopDemo(card);
      }
    });

    const play = card.querySelector(".demo-play");
    play?.setAttribute("aria-pressed", "false");
    play?.addEventListener("click", () => {
      if (timers.has(card)) stopDemo(card);
      else {
        card.classList.add("is-active");
        playDemo(card);
      }
    });
  });

  const depth = document.querySelector("[data-depth-stage]");
  let ticking = false;

  function updateDepth() {
    ticking = false;
    if (!depth || motionReduced()) return;
    const rect = depth.getBoundingClientRect();
    const viewport = window.innerHeight;
    const start = viewport * 0.95;
    const end = -rect.height * 0.15;
    const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
    root.style.setProperty("--depth-progress", progress.toFixed(3));
  }

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateDepth);
  }, { passive: true });

  window.addEventListener("resize", updateDepth);
  updateDepth();

  const hash = window.location.hash;
  if (hash && document.querySelector(hash)) {
    window.setTimeout(() => document.querySelector(hash).scrollIntoView(), 50);
  }
})();
