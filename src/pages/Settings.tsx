import ThemeSelector from "@/components/ThemeSelector";

const Settings = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-6 text-4xl font-bold">Settings</h1>
			<div className="space-y-4">
				<div className="rounded-lg border p-4">
					<h2 className="mb-4 text-2xl font-semibold">Theme Settings</h2>
					<div className="flex items-center gap-4">
						<span>Select Theme</span>
						<ThemeSelector />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
