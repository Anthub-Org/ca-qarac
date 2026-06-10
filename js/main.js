const root = document.documentElement;
const header = document.querySelector(".site-header");
const themeToggle = document.querySelector("#themeToggle");
const copyButton = document.querySelector("#copyDetails");
const copyStatus = document.querySelector("#copyStatus");

const details = [
  "Quality Auto Repair & Collision",
  "159 Erb St. W, Waterloo, ON N2L 1V2",
  "Phone: (289) 322-1212",
  "Hours: Mon-Sat 8:30 AM-6:00 PM, Sun closed"
].join("\n");

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("qualityAutoTheme", theme);

  if (!themeToggle) return;

  const dark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(dark));
  themeToggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  themeToggle.innerHTML = `<i data-lucide="${dark ? "sun" : "moon"}"></i>`;
  if (window.lucide) window.lucide.createIcons();
}

function updateHeader() {
  if (!header) return;
  header.dataset.elevated = String(window.scrollY > 18);
}

themeToggle?.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(details);
    copyStatus.textContent = "Shop details copied.";
  } catch {
    copyStatus.textContent = details;
  }
});

window.addEventListener("scroll", updateHeader, { passive: true });

const savedTheme = localStorage.getItem("qualityAutoTheme");
setTheme(savedTheme || "light");
updateHeader();

window.addEventListener("load", () => {
  if (window.lucide) window.lucide.createIcons();
});
