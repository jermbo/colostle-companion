import { useTheme } from "@/context/theme-context";
import { Palette } from "lucide-react";
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

	const themes = [
		{ name: "Light", value: "light" },
		{ name: "Dark", value: "dark" },
		{ name: "Cyberpunk", value: "cyberpunk" },
		{ name: "Cupcake", value: "cupcake" },
		{ name: "Bumblebee", value: "bumblebee" },
		{ name: "Emerald", value: "emerald" },
		{ name: "Corporate", value: "corporate" },
		{ name: "Synthwave", value: "synthwave" },
		{ name: "Retro", value: "retro" },
		{ name: "Valentine", value: "valentine" },
		{ name: "Halloween", value: "halloween" },
		{ name: "Garden", value: "garden" },
		{ name: "Forest", value: "forest" },
		{ name: "Aqua", value: "aqua" },
		{ name: "Lofi", value: "lofi" },
		{ name: "Pastel", value: "pastel" },
		{ name: "Fantasy", value: "fantasy" },
		{ name: "Wireframe", value: "wireframe" },
		{ name: "Black", value: "black" },
		{ name: "Luxury", value: "luxury" },
		{ name: "Dracula", value: "dracula" },
		{ name: "CMYK", value: "cmyk" },
		{ name: "Autumn", value: "autumn" },
		{ name: "Business", value: "business" },
		{ name: "Acid", value: "acid" },
		{ name: "Lemonade", value: "lemonade" },
		{ name: "Night", value: "night" },
		{ name: "Coffee", value: "coffee" },
		{ name: "Winter", value: "winter" },
	];

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
				<Palette size={20} />
			</Button>
			<div
				className={`bg-base-100 border-base-200 absolute top-full right-0 z-50 mt-2 flex max-h-[60vh] min-w-[8rem] flex-col gap-1 overflow-y-auto rounded-md border p-2 shadow-md transition-all duration-200 ${
					isOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
				}`}
			>
				{themes.map((t) => (
					<Button
						key={t.value}
						variant="ghost"
						size="sm"
						active={theme === t.value}
						className="justify-start"
						onClick={() => {
							setTheme(t.value as any);
							setIsOpen(false);
						}}
					>
						{t.name}
					</Button>
				))}
			</div>
		</div>
	);
};

export default ThemeToggle;
