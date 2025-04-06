import { ReactElement } from "react";
import CharacterList from "../components/character/CharacterList";

const Characters = (): ReactElement => {
	return (
		<div className="characters">
			<h2>Characters</h2>
			<p>Manage your characters and companions.</p>

			<CharacterList />
		</div>
	);
};

export default Characters;
