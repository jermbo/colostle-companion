import React, { createContext, useState, useContext, useEffect } from "react";

// Define available themes
export type ThemeName = "light" | "dark" | "fantasy" | "scifi";

interface ThemeContextType {
	currentTheme: ThemeName;
	setTheme: (theme: ThemeName) => void;
}

// Create the context with default values
const ThemeContext = createContext<ThemeContextType>({
	currentTheme: "light",
	setTheme: () => {},
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	// Get saved theme from localStorage or use system preference as fallback
	const getSavedTheme = (): ThemeName => {
		const savedTheme = localStorage.getItem("theme") as ThemeName;
		if (
			savedTheme &&
			["light", "dark", "fantasy", "scifi"].includes(savedTheme)
		) {
			return savedTheme;
		}
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	};

	const [currentTheme, setCurrentTheme] = useState<ThemeName>(getSavedTheme());

	// Update document root class when theme changes
	useEffect(() => {
		// Remove all theme classes
		document.documentElement.classList.remove(
			"light-theme",
			"dark-theme",
			"fantasy-theme",
			"scifi-theme"
		);

		// Don't add light-theme class explicitly because it's the default in CSS
		if (currentTheme !== "light") {
			document.documentElement.classList.add(`${currentTheme}-theme`);
		}

		// Save theme preference to localStorage
		localStorage.setItem("theme", currentTheme);
	}, [currentTheme]);

	// Function to change the theme
	const setTheme = (theme: ThemeName) => {
		setCurrentTheme(theme);
	};

	return (
		<ThemeContext.Provider value={{ currentTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
