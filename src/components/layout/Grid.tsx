import { ReactElement, ReactNode } from "react";

interface Props {
	children: ReactNode;
	className?: string;
	columns?: number;
	gap?: "xs" | "sm" | "md" | "lg" | "xl";
}

const Grid = ({
	children,
	className = "",
	columns = 1,
	gap = "md",
}: Props): ReactElement => {
	return (
		<div
			className={`grid grid--${columns}-columns grid--gap-${gap} ${className}`}
		>
			{children}
		</div>
	);
};

export default Grid;
