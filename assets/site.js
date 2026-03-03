(() => {
  const intro = document.querySelector("[data-intro]");
  const skipBtn = document.querySelector("[data-skip]");
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const KEY = "f2d20_intro_seen";

  const hideIntro = () => {
    if (!intro) return;
    intro.classList.add("fade");
    setTimeout(() => {
      intro.hidden = true;
    }, 600);
  };

  const playIntro = () => {
    if (!intro) return;
    intro.hidden = false;

    // If user prefers reduced motion, skip fast
    if (prefersReduced) {
      setTimeout(() => {
        sessionStorage.setItem(KEY, "1");
        hideIntro();
      }, 200);
      return;
    }

    intro.classList.add("play");
    // total ~2.2s then fade out
    setTimeout(() => {
      sessionStorage.setItem(KEY, "1");
      hideIntro();
    }, 2300);
  };

  // Show intro only once per session (you can switch to localStorage if you want once forever)
  const seen = sessionStorage.getItem(KEY) === "1";
  if (intro && !seen) playIntro();
  if (intro && seen) intro.hidden = true;

  // Skip handlers
  const skip = () => {
    sessionStorage.setItem(KEY, "1");
    hideIntro();
  };
  if (skipBtn) skipBtn.addEventListener("click", skip);
  if (intro) intro.addEventListener("click", skip);

  // Safety: ESC to skip
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") skip();
  });
})();
