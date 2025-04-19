import ThemeToggle from "@/components/theme-toggle";

interface Props {
	title: string;
}

const Navigation = ({ title }: Props) => {
	return (
		<nav className="border-b border-gray-200 dark:border-gray-700">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex-shrink-0">
						<span className="text-xl font-bold text-gray-900 dark:text-white">{title}</span>
					</div>
					<div className="flex items-center gap-4">
						<a href="/" className="p-2 hover:text-gray-900">
							Home
						</a>
						<a href="/characters" className="p-2 hover:text-gray-900">
							Characters
						</a>
						<a href="/settings" className="p-2 hover:text-gray-900">
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
