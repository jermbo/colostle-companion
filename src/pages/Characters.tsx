import { ReactElement } from "react";
import Grid from "../components/layout/Grid";

const Characters = (): ReactElement => {
	return (
		<div className="characters">
			<h2>Characters</h2>
			<p>Manage your characters and companions.</p>

			<div className="characters__actions">
				<button className="characters__button">Create New Character</button>
			</div>

			<Grid columns={2} gap="lg">
				<div className="characters__card">
					<h3>Character 1</h3>
					<p>Level 3 Warrior</p>
					<div className="characters__card-actions">
						<button className="characters__card-button">Edit</button>
						<button className="characters__card-button">Delete</button>
					</div>
				</div>
				<div className="characters__card">
					<h3>Character 2</h3>
					<p>Level 2 Mage</p>
					<div className="characters__card-actions">
						<button className="characters__card-button">Edit</button>
						<button className="characters__card-button">Delete</button>
					</div>
				</div>
			</Grid>
		</div>
	);
};

export default Characters;
