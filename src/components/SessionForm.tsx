import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Session } from "@/types/views";

interface SessionFormProps {
	sessionForm: Omit<Session, "id" | "campaignId" | "drawnCards">;
	onSetSessionForm: React.Dispatch<
		React.SetStateAction<Omit<Session, "id" | "campaignId" | "drawnCards">>
	>;
	onCreateSession: () => void;
	onCancel: () => void;
}

export const SessionForm = ({
	sessionForm,
	onSetSessionForm,
	onCreateSession,
	onCancel,
}: SessionFormProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Start New Session</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div>
					<Label htmlFor="sessionTitle">Title</Label>
					<Input
						id="sessionTitle"
						value={sessionForm.title}
						onChange={(e) =>
							onSetSessionForm({ ...sessionForm, title: e.target.value })
						}
						placeholder="Session title"
					/>
				</div>
			</CardContent>
			<CardFooter className="flex justify-end gap-2">
				<Button variant="outline" onClick={onCancel}>
					Cancel
				</Button>
				<Button onClick={onCreateSession}>Start Session</Button>
			</CardFooter>
		</Card>
	);
};
