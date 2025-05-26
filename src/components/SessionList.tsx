import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import type { Campaign, Session } from "@/types/views";

interface SessionListProps {
	sessions: Session[];
	selectedCampaign: Campaign;
	onSetSelectedSession: (session: Session) => void;
}

export const SessionList = ({
	sessions,
	selectedCampaign,
	onSetSelectedSession,
}: SessionListProps) => {
	const campaignSessions = sessions.filter(
		(s) => s.campaignId === selectedCampaign.id,
	);

	if (campaignSessions.length === 0) {
		return (
			<Card>
				<CardContent className="p-6 text-center">
					<p className="text-muted-foreground">
						No sessions for this campaign yet. Start one!
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{campaignSessions.map((session) => (
				<Card key={session.id} className="hover:bg-gray-50">
					<CardHeader>
						<CardTitle>{session.title}</CardTitle>
					</CardHeader>
					<CardContent>
						{/* Display a snippet of logs or other relevant info if desired */}
					</CardContent>
					<CardFooter>
						<Button
							variant="outline"
							className="w-full"
							onClick={() => onSetSelectedSession(session)}
						>
							Open Session
						</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	);
};
