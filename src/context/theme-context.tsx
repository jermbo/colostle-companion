import { createContext, useContext, useEffect, useState } from "react";
import { ThemeMode, ThemePreference } from "@/utils/types";

interface ThemeContextType {
	theme: ThemePreference;
	setTheme: (theme: ThemePreference) => void;
}

interface ThemeProviderProps {
	children: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

const getSystemTheme = (): ThemeMode => {
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
};

const getStoredTheme = (): ThemePreference | null => {
	return localStorage.getItem("theme") as ThemePreference | null;
};

const applyTheme = (theme: ThemePreference) => {
	const actualTheme = theme === "system" ? getSystemTheme() : theme;
	document.documentElement.classList.remove("light", "dark");
	document.documentElement.classList.add(actualTheme);
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] = useState<ThemePreference>("system");

	useEffect(() => {
		// Get stored theme preference
		const storedTheme = getStoredTheme();
		if (storedTheme) {
			setTheme(storedTheme);
		}

		// Set up system preference listener
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = () => {
			if (theme === "system") {
				applyTheme("system");
			}
		};

		// Initial theme setup
		applyTheme(theme);

		// Add event listener
		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [theme]);

	const value = {
		theme,
		setTheme: (newTheme: ThemePreference) => {
			setTheme(newTheme);
			localStorage.setItem("theme", newTheme);
		},
	};

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};
