(() => {
  const vault = document.querySelector("[data-vault]");
  const btn = document.querySelector("[data-open-vault]");

  if (!vault) return;

  const open = () => vault.classList.add("open");

  // Auto-open after a short delay (cinematic)
  window.addEventListener("load", () => {
    setTimeout(open, 450);
  });

  // Manual replay
  if (btn) {
    btn.addEventListener("click", () => {
      vault.classList.remove("open");
      // Force reflow to restart animation
      void vault.offsetWidth;
      setTimeout(open, 50);
    });
  }
})();
