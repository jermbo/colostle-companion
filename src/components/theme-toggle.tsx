import { useTheme } from "@/context/theme-context";
import { Moon, Sun, Monitor } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ThemeToggleProps {
	className?: string;
}

const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
	const { theme, setTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const getThemeIcon = () => {
		if (theme === "system") {
			return <Monitor size={20} />;
		}
		return theme === "dark" ? <Moon size={20} /> : <Sun size={20} />;
	};

	return (
		<div className={`relative inline-block ${className}`} ref={dropdownRef}>
			<button
				className="flex items-center justify-center p-2 rounded-md bg-background text-foreground border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
				onClick={() => setIsOpen(!isOpen)}
				aria-label="Toggle theme"
				aria-expanded={isOpen}
			>
				{getThemeIcon()}
			</button>
			<div
				className={`absolute top-full right-0 mt-2 p-2 bg-background border border-border rounded-md shadow-md min-w-[8rem] z-50 transition-all duration-200 ${
					isOpen
						? "opacity-100 translate-y-0"
						: "opacity-0 -translate-y-2 pointer-events-none"
				}`}
			>
				<button
					className={`flex items-center gap-2 w-full p-2 rounded-md transition-colors ${
						theme === "light"
							? "bg-accent text-accent-foreground"
							: "hover:bg-accent hover:text-accent-foreground"
					}`}
					onClick={() => {
						setTheme("light");
						setIsOpen(false);
					}}
				>
					<Sun size={16} />
					<span>Light</span>
				</button>
				<button
					className={`flex items-center gap-2 w-full p-2 rounded-md transition-colors ${
						theme === "dark"
							? "bg-accent text-accent-foreground"
							: "hover:bg-accent hover:text-accent-foreground"
					}`}
					onClick={() => {
						setTheme("dark");
						setIsOpen(false);
					}}
				>
					<Moon size={16} />
					<span>Dark</span>
				</button>
				<button
					className={`flex items-center gap-2 w-full p-2 rounded-md transition-colors ${
						theme === "system"
							? "bg-accent text-accent-foreground"
							: "hover:bg-accent hover:text-accent-foreground"
					}`}
					onClick={() => {
						setTheme("system");
						setIsOpen(false);
					}}
				>
					<Monitor size={16} />
					<span>System</span>
				</button>
			</div>
		</div>
	);
};

export default ThemeToggle;
