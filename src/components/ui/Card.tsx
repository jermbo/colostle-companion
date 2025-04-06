import { ReactElement, ReactNode } from "react";

interface Props {
	children: ReactNode;
	className?: string;
}

const Card = ({ children, className = "" }: Props): ReactElement => {
	return <div className={`card ${className}`}>{children}</div>;
};

export default Card;
