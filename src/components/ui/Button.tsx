import { ReactElement, ReactNode, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: "primary" | "secondary" | "text" | "icon";
	className?: string;
}

const Button = ({
	children,
	variant = "primary",
	className = "",
	...props
}: Props): ReactElement => {
	return (
		<button className={`button button--${variant} ${className}`} {...props}>
			{children}
		</button>
	);
};

export default Button;
