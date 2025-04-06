import { ReactElement } from "react";
import { Grid } from "./index";

interface Props {
	className?: string;
}

const ExamplePage = ({ className = "" }: Props): ReactElement => {
	return (
		<div className={`example-page ${className}`}>
			<h2>Example Page</h2>
			<p>
				This page demonstrates the Grid component with different column layouts.
			</p>

			<h3>1 Column Grid</h3>
			<Grid columns={1} gap="md">
				<div className="example-card">Card 1</div>
				<div className="example-card">Card 2</div>
				<div className="example-card">Card 3</div>
			</Grid>

			<h3>2 Column Grid</h3>
			<Grid columns={2} gap="md">
				<div className="example-card">Card 1</div>
				<div className="example-card">Card 2</div>
				<div className="example-card">Card 3</div>
				<div className="example-card">Card 4</div>
			</Grid>

			<h3>3 Column Grid</h3>
			<Grid columns={3} gap="md">
				<div className="example-card">Card 1</div>
				<div className="example-card">Card 2</div>
				<div className="example-card">Card 3</div>
				<div className="example-card">Card 4</div>
				<div className="example-card">Card 5</div>
				<div className="example-card">Card 6</div>
			</Grid>

			<h3>4 Column Grid</h3>
			<Grid columns={4} gap="md">
				<div className="example-card">Card 1</div>
				<div className="example-card">Card 2</div>
				<div className="example-card">Card 3</div>
				<div className="example-card">Card 4</div>
				<div className="example-card">Card 5</div>
				<div className="example-card">Card 6</div>
				<div className="example-card">Card 7</div>
				<div className="example-card">Card 8</div>
			</Grid>
		</div>
	);
};

export default ExamplePage;
