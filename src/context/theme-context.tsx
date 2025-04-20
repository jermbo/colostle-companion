import { createContext, useContext, useEffect, useState } from "react";
import { Theme } from "@/utils/types";

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
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

const getStoredTheme = (): Theme | null => {
	return localStorage.getItem("theme") as Theme | null;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] = useState<Theme>("cyberpunk");

	useEffect(() => {
		// Get stored theme preference
		const storedTheme = getStoredTheme();
		if (storedTheme) {
			setTheme(storedTheme);
		}
	}, []);

	const value = {
		theme,
		setTheme: (newTheme: Theme) => {
			setTheme(newTheme);
			localStorage.setItem("theme", newTheme);
		},
	};

	return (
		<ThemeContext.Provider value={value}>
			<div data-theme={theme}>{children}</div>
		</ThemeContext.Provider>
	);
};
