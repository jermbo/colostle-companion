import { ReactElement } from "react";
import CharacterList from "../components/character/CharacterList";

const Characters = (): ReactElement => {
	return (
		<div className="page characters">
			<div className="page__header">
				<h1 className="page__title">Characters</h1>
				<p className="page__description">
					Manage your characters and companions.
				</p>
			</div>

			<CharacterList />
		</div>
	);
};

export default Characters;
