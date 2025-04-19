import { Button } from "./components/ui/button";
import { Plus } from "lucide-react";
const App = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-svh">
			<Button variant="outline" size="icon">
				<Plus />
			</Button>
		</div>
	);
};

export default App;
