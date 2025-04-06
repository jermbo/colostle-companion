import { ReactElement, ReactNode, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: "primary" | "secondary" | "text" | "icon";
	size?: "sm" | "md" | "lg";
	className?: string;
}

const Button = ({
	children,
	variant = "primary",
	size = "md",
	className = "",
	...props
}: Props): ReactElement => {
	return (
		<button
			className={`button button--${variant} button--${size} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
