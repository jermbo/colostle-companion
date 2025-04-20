import { useParams } from "react-router-dom";

const Session = () => {
	const { characterId, sessionId } = useParams<{ characterId: string; sessionId: string }>();

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-6 text-4xl font-bold">Session Details</h1>
			<div className="mx-auto max-w-2xl">
				<p className="text-lg">Character ID: {characterId}</p>
				<p className="text-lg">Session ID: {sessionId}</p>
				{/* Session details and gameplay will go here */}
			</div>
		</div>
	);
};

export default Session;
