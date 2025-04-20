import { ThemeProvider } from "@/context/theme-context";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CharacterList from "@/components/CharacterList";
import "@/styles/utils.css";

const App = () => {
	const handleStartAdventure = () => {
		// TODO: Implement start adventure logic
		console.log("Starting adventure...");
	};

	const handleContinueJourney = (characterId: string) => {
		console.log("Continuing journey for character:", characterId);
	};

	const handleCharacterMenu = (characterId: string) => {
		console.log("Opening menu for character:", characterId);
	};

	// Sample data - this would typically come from your data store
	const characters = [
		{
			id: "1",
			name: "Wandering Knight",
			lastPlayed: "Last played 2 days ago",
		},
		{
			id: "2",
			name: "Lost Scholar",
			lastPlayed: "Last played 5 days ago",
		},
		{
			id: "3",
			name: "Brave Warrior",
			lastPlayed: "Last played 3 days ago",
		},
		{
			id: "4",
			name: "Mystic Mage",
			lastPlayed: "Last played 1 day ago",
		},
	];

	return (
		<ThemeProvider>
			<div className="min-h-screen bg-white dark:bg-gray-900">
				<Navigation title="Colostle Companion" />

				<Hero
					title="Begin Your Journey in the Endless Castle"
					description="Create your character and explore the ever-changing halls of Colostle. Each session brings new adventures and discoveries."
					buttonText="Start Your Adventure"
					onStart={handleStartAdventure}
				/>

				<CharacterList characters={characters} onContinue={handleContinueJourney} onMenuClick={handleCharacterMenu} />
			</div>
		</ThemeProvider>
	);
};

export default App;
