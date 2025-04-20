import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "ghost" | "link";
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	outline?: boolean;
	active?: boolean;
	disabled?: boolean;
	loading?: boolean;
	wide?: boolean;
	block?: boolean;
	square?: boolean;
	circle?: boolean;
	glass?: boolean;
	noAnimation?: boolean;
}

const Button = ({
	className,
	variant = "primary",
	size = "md",
	outline = false,
	active = false,
	disabled = false,
	loading = false,
	wide = false,
	block = false,
	square = false,
	circle = false,
	glass = false,
	noAnimation = false,
	children,
	...props
}: ButtonProps) => {
	return (
		<button
			className={cn(
				"btn",
				`btn-${variant}`,
				`btn-${size}`,
				outline && "btn-outline",
				active && "btn-active",
				disabled && "btn-disabled",
				loading && "loading",
				wide && "btn-wide",
				block && "btn-block",
				square && "btn-square",
				circle && "btn-circle",
				glass && "glass",
				noAnimation && "no-animation",
				"text-current",
				className,
			)}
			disabled={disabled || loading}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
