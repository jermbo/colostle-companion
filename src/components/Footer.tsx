const Footer = () => {
	return (
		<footer className="border-t border-gray-200 dark:border-gray-700">
			<div className="mx-auto max-w-7xl px-4 py-6 text-center sm:px-6 lg:px-8">
				<p className="text-sm text-gray-600 dark:text-gray-400">
					Colostle Companion is a fan-made tool intended to enhance a game play session.{" "}
					<br className="hidden sm:block" />
					<a
						href="https://colostle.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
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
