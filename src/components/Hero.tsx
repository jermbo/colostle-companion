import Button from "./ui/Button";

const Hero = () => {
	const handleOnStart = () => {
		// TODO: Implement this in the character context
		console.log("Starting adventure...");
	};
	return (
		<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
			<div className="text-center">
				<h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
					Begin Your Journey in the Endless Castle
				</h1>
				<p className="mx-auto mt-3 max-w-md text-base sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
					Create your character and explore the ever-changing halls of Colostle. Each session brings new adventures and
					discoveries.
				</p>
				<div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
					<div className="rounded-md shadow">
						<Button onClick={handleOnStart} variant="primary" size="lg">
							Start Your Adventure
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
