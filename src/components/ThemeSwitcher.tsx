import React, { useState } from "react";
import { useTheme, ThemeName } from "../context/ThemeContext";

const ThemeSwitcher: React.FC = () => {
	const { currentTheme, setTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(false);

	const themes: { name: ThemeName; label: string; icon: string }[] = [
		{ name: "light", label: "Light", icon: "☀️" },
		{ name: "dark", label: "Dark", icon: "🌙" },
		{ name: "fantasy", label: "Fantasy", icon: "🏰" },
		{ name: "scifi", label: "Sci-Fi", icon: "🚀" },
	];

	const handleThemeChange = (theme: ThemeName) => {
		setTheme(theme);
		setIsOpen(false);
	};

	// Get current theme icon
	const currentThemeIcon =
		themes.find((theme) => theme.name === currentTheme)?.icon || "☀️";

	return (
		<div className="theme-switcher">
			<button
				className="theme-toggle-button"
				onClick={() => setIsOpen(!isOpen)}
				aria-label="Toggle theme menu"
			>
				{currentThemeIcon}
			</button>

			{isOpen && (
				<div className="theme-dropdown">
					<ul className="theme-list">
						{themes.map((theme) => (
							<li key={theme.name}>
								<button
									className={`theme-option ${
										currentTheme === theme.name ? "active" : ""
									}`}
									onClick={() => handleThemeChange(theme.name)}
								>
									<span className="theme-icon">{theme.icon}</span>
									<span className="theme-label">{theme.label}</span>
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default ThemeSwitcher;
