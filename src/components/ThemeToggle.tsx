import { useTheme } from "@/context/theme-context";
import { Moon, Sun, Monitor } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Button from "./ui/Button";

interface ThemeToggleProps {
	className?: string;
}

const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
	const { theme, setTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
			<Button
				variant="ghost"
				size="md"
				circle
				onClick={() => setIsOpen(!isOpen)}
				aria-label="Toggle theme"
				aria-expanded={isOpen}
			>
				{getThemeIcon()}
			</Button>
			<div
				className={`bg-background border-border absolute top-full right-0 z-50 mt-2 flex min-w-[8rem] flex-col gap-1 rounded-md border p-2 shadow-md transition-all duration-200 ${
					isOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
				}`}
			>
				<Button
					variant="ghost"
					size="sm"
					active={theme === "light"}
					className="justify-start gap-2"
					onClick={() => {
						setTheme("light");
						setIsOpen(false);
					}}
				>
					<Sun size={16} />
					<span>Light</span>
				</Button>
				<Button
					variant="ghost"
					size="sm"
					active={theme === "dark"}
					className="justify-start gap-2"
					onClick={() => {
						setTheme("dark");
						setIsOpen(false);
					}}
				>
					<Moon size={16} />
					<span>Dark</span>
				</Button>
				<Button
					variant="ghost"
					size="sm"
					active={theme === "system"}
					className="justify-start gap-2"
					onClick={() => {
						setTheme("system");
						setIsOpen(false);
					}}
				>
					<Monitor size={16} />
					<span>System</span>
				</Button>
			</div>
		</div>
	);
};

export default ThemeToggle;
