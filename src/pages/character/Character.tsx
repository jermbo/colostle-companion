import { useParams } from "react-router-dom";

const Character = () => {
	const { characterId } = useParams<{ characterId: string }>();

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-6 text-4xl font-bold">Character Details</h1>
			<div className="mx-auto max-w-2xl">
				<p className="text-lg">Character ID: {characterId}</p>
				{/* Character details and sessions will go here */}
			</div>
		</div>
	);
};

export default Character;
