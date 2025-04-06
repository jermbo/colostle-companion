import { ReactElement, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = (): ReactElement => {
	const { theme, toggleTheme } = useTheme();
	const ariaLabel = useMemo(() => {
		return `Switch to ${theme === "light" ? "dark" : "light"} theme`;
	}, [theme]);

	return (
		<button
			onClick={toggleTheme}
			className="button--icon"
			aria-label={ariaLabel}
		>
			<span className="theme-toggle__icon">
				{theme === "light" ? "🌙" : "☀️"}
			</span>
		</button>
	);
};

export default ThemeToggle;
