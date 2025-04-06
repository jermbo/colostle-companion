import { ReactElement, ReactNode } from "react";

interface Props {
	children: ReactNode;
	className?: string;
	fluid?: boolean;
}

const Container = ({
	children,
	className = "",
	fluid = true,
}: Props): ReactElement => {
	return (
		<div
			className={`container ${fluid ? "container--fluid" : ""} ${className}`}
		>
			{children}
		</div>
	);
};

export default Container;
