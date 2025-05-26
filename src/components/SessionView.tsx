import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Book, ArrowLeft } from "lucide-react";
import type { Campaign, Session } from "@/types/views";
import { SessionForm } from "@/components/SessionForm";
import { ActiveSessionView } from "@/components/ActiveSessionView";
import { SessionList } from "@/components/SessionList";

interface Props {
	sessions: Session[];
	sessionForm: Omit<Session, "id" | "campaignId" | "drawnCards">;
	selectedCampaign: Campaign | null;
	selectedSession: Session | null;
	isCreating: boolean;
	onSetSessionForm: React.Dispatch<
		React.SetStateAction<Omit<Session, "id" | "campaignId" | "drawnCards">>
	>;
	onCreateSession: () => void;
	onSetSelectedSession: (session: Session | null) => void;
	onSetIsCreating: (isCreating: boolean) => void;
	onGoBack: () => void;
	onDrawCard: (type: "exploration" | "combat") => void;
	onUpdateSessionLog: (
		field: "explorationLog" | "combatLog",
		value: string,
	) => void;
	speechRecognition: {
		isListening: boolean;
		speechSupported: boolean;
		activeTextarea: "exploration" | "combat" | null;
		toggleListening: (type: "exploration" | "combat") => void;
	};
}

export const SessionView = ({
	sessions,
	sessionForm,
	selectedCampaign,
	selectedSession,
	isCreating,
	onSetSessionForm,
	onCreateSession,
	onSetSelectedSession,
	onSetIsCreating,
	onGoBack,
	onDrawCard,
	onUpdateSessionLog,
	speechRecognition,
}: Props) => {
	useEffect(() => {
		if (selectedSession) {
			// Logic to handle joining existing session or focusing, if any
		}
	}, [selectedSession]);

	if (!selectedCampaign) {
		return (
			<div className="text-center text-muted-foreground">
				Select a campaign to see its sessions.
			</div>
		);
	}

	if (selectedSession) {
		return (
			<ActiveSessionView
				selectedSession={selectedSession}
				onDrawCard={onDrawCard}
				onUpdateSessionLog={onUpdateSessionLog}
				speechSupported={speechRecognition.speechSupported}
				isListening={speechRecognition.isListening}
				activeTextarea={speechRecognition.activeTextarea}
				onToggleListening={speechRecognition.toggleListening}
			/>
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-4">
					<Button variant="outline" size="icon" onClick={onGoBack}>
						<ArrowLeft className="h-4 w-4" />
					</Button>
					<h2 className="text-xl font-bold flex items-center gap-2">
						<Book className="h-5 w-5" /> Sessions for {selectedCampaign.title}
					</h2>
				</div>
				<Button onClick={() => onSetIsCreating(true)}>
					<Plus className="mr-2 h-4 w-4" /> New Session
				</Button>
			</div>

			{isCreating ? (
				<SessionForm
					sessionForm={sessionForm}
					onSetSessionForm={onSetSessionForm}
					onCreateSession={onCreateSession}
					onCancel={() => onSetIsCreating(false)}
				/>
			) : (
				<SessionList
					sessions={sessions}
					selectedCampaign={selectedCampaign}
					onSetSelectedSession={onSetSelectedSession}
				/>
			)}
		</div>
	);
};
