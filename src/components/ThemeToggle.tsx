import { ReactElement } from "react";
import { useTheme } from "../context/ThemeContext";

interface Props {
	className?: string;
}

const ThemeToggle = ({ className = "" }: Props): ReactElement => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className={`theme-toggle ${className}`}
			aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
		>
			<span className="theme-toggle__icon">
				{theme === "light" ? "🌙" : "☀️"}
			</span>
		</button>
	);
};

export default ThemeToggle;
