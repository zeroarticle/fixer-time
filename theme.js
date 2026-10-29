(() => {
    const root = document.documentElement;
    const controls = document.querySelectorAll("[data-theme-toggle]");
    const storageKey = "fixtime-theme";
    let savedTheme;

    try {
        savedTheme = localStorage.getItem(storageKey);
    } catch {}

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : prefersDark ? "dark" : "light";

    function setTheme(theme) {
        const isDark = theme === "dark";
        root.dataset.theme = theme;

        try {
            localStorage.setItem(storageKey, theme);
        } catch {}

        controls.forEach((control) => {
            const label = isDark ? "Включить светлую тему" : "Включить тёмную тему";
            control.setAttribute("aria-label", label);
            control.setAttribute("title", label);
            control.setAttribute("aria-pressed", String(isDark));
            control.querySelector(".theme-toggle-icon").textContent = isDark ? "☀" : "☾";
        });
    }

    setTheme(initialTheme);
    controls.forEach((control) => {
        control.addEventListener("click", () => {
            setTheme(root.dataset.theme === "dark" ? "light" : "dark");
        });
    });
})();