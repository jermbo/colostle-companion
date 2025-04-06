import { ReactElement } from "react";
import Grid from "../components/layout/Grid";

const Sessions = (): ReactElement => {
	return (
		<div className="page sessions">
			<h2>Sessions</h2>
			<p>Manage your game sessions.</p>

			<div className="sessions__actions">
				<button className="button--primary">Start New Session</button>
			</div>

			<Grid columns={2} gap="lg">
				<div className="sessions__card">
					<h3>Session 1</h3>
					<p>Character: Character 1</p>
					<p>Last played: 2 days ago</p>
					<div className="sessions__card-actions">
						<button className="button--primary">Continue</button>
						<button className="button--danger">Delete</button>
					</div>
				</div>
				<div className="sessions__card">
					<h3>Session 2</h3>
					<p>Character: Character 2</p>
					<p>Last played: 1 week ago</p>
					<div className="sessions__card-actions">
						<button className="button--primary">Continue</button>
						<button className="button--danger">Delete</button>
					</div>
				</div>
			</Grid>
		</div>
	);
};

export default Sessions;
