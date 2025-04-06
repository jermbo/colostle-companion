import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";

const App = () => {
	return (
		<ThemeProvider>
			<div className="app">
				<header className="app__header">
					<h1 className="app__header-title">Colostle Companion</h1>
					<ThemeToggle />
				</header>
				<main className="app__main">
					<p>Welcome to Colostle Companion!</p>
				</main>
			</div>
		</ThemeProvider>
	);
};

export default App;
