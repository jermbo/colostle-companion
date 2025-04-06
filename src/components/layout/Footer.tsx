import { ReactElement, ReactNode } from "react";

interface Props {
	children?: ReactNode;
	className?: string;
}

const Footer = ({ children, className = "" }: Props): ReactElement => {
	return (
		<footer className={`footer ${className}`}>
			<div className="footer__container">
				<div className="footer__content">
					{children || (
						<p className="footer__copyright">
							&copy; {new Date().getFullYear()} Colostle Companion
						</p>
					)}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
