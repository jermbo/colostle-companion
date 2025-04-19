interface Props {
	title: string;
	description: string;
	buttonText: string;
	onStart: () => void;
}

const Hero = ({ title, description, buttonText, onStart }: Props) => {
	return (
		<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
			<div className="text-center">
				<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
					{title}
				</h1>
				<p className="mx-auto mt-3 max-w-md text-base text-gray-600 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl dark:text-gray-300">
					{description}
				</p>
				<div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
					<div className="rounded-md shadow">
						<button
							onClick={onStart}
							className="flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 md:px-10 md:py-4 md:text-lg dark:bg-purple-500 dark:hover:bg-purple-600"
						>
							{buttonText}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
