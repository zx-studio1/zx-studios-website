(() => {
  const languages = ["en","ar","fr","es","de"];
  const select = document.querySelector("#language");
  const applyLocale = async (lang) => {
    if (!languages.includes(lang)) lang = "en";
    try {
      const response = await fetch(`locales/${lang}.json`);
      const dictionary = await response.json();
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.querySelectorAll("[data-i18n]").forEach((node) => {
        const value = dictionary[node.dataset.i18n];
        if (typeof value === "string") node.textContent = value;
      });
      if (select) select.value = lang;
      localStorage.setItem("zx-language", lang);
    } catch (error) {
      console.warn("Could not load selected language; using the default English content.", error);
    }
  };
  if (select) {
    const saved = localStorage.getItem("zx-language") || "en";
    applyLocale(saved);
    select.addEventListener("change", () => applyLocale(select.value));
  }
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }
})();