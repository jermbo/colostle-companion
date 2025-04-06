import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
	ReactElement,
} from "react";

// Define theme types
export type Theme = "light" | "dark";

// Define context interface
interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
	theme: "light",
	toggleTheme: () => {},
});

// Define provider props interface
interface ThemeProviderProps {
	children: ReactNode;
}

// Create provider component
export const ThemeProvider = ({
	children,
}: ThemeProviderProps): ReactElement => {
	// Initialize theme state from localStorage or default to 'light'
	const [theme, setTheme] = useState<Theme>(() => {
		// Check if we're in a browser environment
		if (typeof window !== "undefined") {
			const savedTheme = localStorage.getItem("theme") as Theme | null;
			return savedTheme || "light";
		}
		return "light";
	});

	// Apply theme immediately on mount to prevent flash
	useEffect(() => {
		// Apply theme to document element
		document.documentElement.setAttribute("data-theme", theme);

		// Save theme preference to localStorage
		localStorage.setItem("theme", theme);
	}, [theme]);

	// Toggle theme function
	const toggleTheme = (): void => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	// Provide theme context to children
	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

// Custom hook to use theme context
export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);

	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}

	return context;
};

export default ThemeContext;
