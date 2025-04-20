import ThemeToggle from "@/components/ThemeToggle";

const Navigation = () => {
	return (
		<nav className="border-base-200 border-b">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex-shrink-0">
						<span className="text-xl font-bold">Colostle Companion</span>
					</div>
					<div className="flex items-center gap-4">
						<a href="/settings" className="hover:text-base-content/80 p-2">
							Settings
						</a>
						<ThemeToggle />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
