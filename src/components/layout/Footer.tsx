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
							Colostle Companion is a fan-made tool intended to enhance a game
							play session. <br />
							<a
								href="https://colostle.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								Colostle
							</a>{" "}
							is created by Nich Angell and this project is not affiliated with
							the official Colostle game.
						</p>
					)}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
