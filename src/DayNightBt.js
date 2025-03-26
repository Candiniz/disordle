import { useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import styles from "./DayNightBt.module.css"; // Importando o CSS Module
import { useTheme } from "./ThemeContext.js";

export default function ThemeToggle() {
  const { isDark, setIsDark } = useTheme();

  useEffect(() => {
    document.body.style.transition = "background-image 0.5s ease-in-out";
    document.body.style.backgroundColor = isDark
      ? "rgb(14, 25, 41)" // Imagem para o tema escuro
      : "rgb(203, 198, 181)"; // Imagem para o tema claro

    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        className={styles.checkbox}
        id="check"
        checked={isDark}
        onChange={toggleTheme}
      />
      <div className={styles.content}>
        <label className={styles.label} htmlFor="check">
          <div className={styles.ball}>
            {!isDark ? (
              <FaSun className={styles.sunIcon} />
            ) : (
              <FaMoon className={styles.moonIcon} />
            )}
          </div>
        </label>
      </div>
    </div>
  );
}
