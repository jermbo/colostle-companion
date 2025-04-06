import { ReactElement } from "react";
import Grid from "../components/layout/Grid";

const Journal = (): ReactElement => {
	return (
		<div className="journal">
			<h2>Journal</h2>
			<p>Record your adventures and track your progress.</p>

			<div className="journal__actions">
				<button className="journal__button">Create New Entry</button>
			</div>

			<Grid columns={1} gap="md">
				<div className="journal__entry">
					<h3>Entry 1</h3>
					<p className="journal__entry-date">Created: 2 days ago</p>
					<p className="journal__entry-preview">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
						dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed
						auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in
						nulla enim. Phasellus molestie magna non est bibendum non venenatis
						nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
					</p>
					<div className="journal__entry-actions">
						<button className="journal__entry-button">Read More</button>
						<button className="journal__entry-button">Edit</button>
						<button className="journal__entry-button">Delete</button>
					</div>
				</div>

				<div className="journal__entry">
					<h3>Entry 2</h3>
					<p className="journal__entry-date">Created: 1 week ago</p>
					<p className="journal__entry-preview">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
						dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed
						auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in
						nulla enim. Phasellus molestie magna non est bibendum non venenatis
						nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
					</p>
					<div className="journal__entry-actions">
						<button className="journal__entry-button">Read More</button>
						<button className="journal__entry-button">Edit</button>
						<button className="journal__entry-button">Delete</button>
					</div>
				</div>
			</Grid>
		</div>
	);
};

export default Journal;
