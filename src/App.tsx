import { ThemeProvider } from "@/context/theme-context";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CharacterList from "@/components/CharacterList";
import Footer from "@/components/Footer";
import "@/styles/utils.css";

const App = () => {
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
			<div className="flex min-h-screen flex-col">
				<Navigation />

				<main>
					<Hero />
					<CharacterList characters={characters} onContinue={handleContinueJourney} onMenuClick={handleCharacterMenu} />
				</main>

				<Footer />
			</div>
		</ThemeProvider>
	);
};

export default App;
