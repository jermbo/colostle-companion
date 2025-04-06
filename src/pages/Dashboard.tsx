import { ReactElement } from "react";
import Grid from "../components/layout/Grid";

const Dashboard = (): ReactElement => {
	return (
		<div className="page dashboard">
			<h2>Dashboard</h2>
			<p>Welcome to your Colostle Companion dashboard!</p>

			<h3>Recent Sessions</h3>
			<Grid columns={2} gap="md">
				<div className="dashboard__card">
					<h4>Session 1</h4>
					<p>Last played: 2 days ago</p>
				</div>
				<div className="dashboard__card">
					<h4>Session 2</h4>
					<p>Last played: 1 week ago</p>
				</div>
			</Grid>

			<h3>Your Characters</h3>
			<Grid columns={3} gap="md">
				<div className="dashboard__card">
					<h4>Character 1</h4>
					<p>Level 3 Warrior</p>
				</div>
				<div className="dashboard__card">
					<h4>Character 2</h4>
					<p>Level 2 Mage</p>
				</div>
			</Grid>
		</div>
	);
};

export default Dashboard;
