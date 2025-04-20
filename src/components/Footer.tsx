const Footer = () => {
	return (
		<footer className="border-base-200 border-t">
			<div className="mx-auto max-w-7xl px-4 py-6 text-center sm:px-6 lg:px-8">
				<p className="text-base-content/60 text-sm">
					Colostle Companion is a fan-made tool intended to enhance a game play session.{" "}
					<br className="hidden sm:block" />
					<a
						href="https://colostle.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-primary hover:text-primary-focus"
					>
						Colostle
					</a>{" "}
					is created by Nich Angell and this project is not affiliated with the official Colostle game.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
