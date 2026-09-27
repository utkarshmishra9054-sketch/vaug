export const THEME_STORAGE_KEY = "vaug-theme";

/**
 * Runs before first paint (see layout.tsx) so the saved theme never flashes.
 * "light" = alternating dark/light bands (default); "dark" = every band dark.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t="light"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","light")}})();`;
