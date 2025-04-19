import { Button } from "./components/ui/button";
import { Plus } from "lucide-react";
import { ThemeProvider } from "@/context/theme-context";
import ThemeToggle from "@/components/theme-toggle";

const App = () => {
	return (
		<ThemeProvider>
			<div className="flex flex-col items-center justify-center min-h-svh">
				<div className="absolute top-4 right-4">
					<ThemeToggle />
				</div>
				<Button variant="outline" size="icon">
					<Plus />
				</Button>
			</div>
		</ThemeProvider>
	);
};

export default App;
