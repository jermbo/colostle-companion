import React, { useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Plus, Book, ArrowLeft, Mic, MicOff } from "lucide-react";
import type { Campaign, Session } from "@/types/views";

interface SessionFormProps {
	sessionForm: Omit<Session, "id" | "campaignId" | "drawnCards">;
	onSetSessionForm: React.Dispatch<
		React.SetStateAction<Omit<Session, "id" | "campaignId" | "drawnCards">>
	>;
	onCreateSession: () => void;
	onCancel: () => void;
}

const SessionForm = ({
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

interface ActiveSessionViewProps {
	selectedSession: Session;
	onDrawCard: (type: "exploration" | "combat") => void;
	onUpdateSessionLog: (
		field: "explorationLog" | "combatLog",
		value: string,
	) => void;
	speechSupported: boolean;
	isListening: boolean;
	activeTextarea: "exploration" | "combat" | null;
	onToggleListening: (type: "exploration" | "combat") => void;
}

const ActiveSessionView = ({
	selectedSession,
	onDrawCard,
	onUpdateSessionLog,
	speechSupported,
	isListening,
	activeTextarea,
	onToggleListening,
}: ActiveSessionViewProps) => {
	return (
		<div className="space-y-4">
			<Card>
				<CardHeader>
					<CardTitle>{selectedSession.title}</CardTitle>
				</CardHeader>
			</Card>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card>
					<CardHeader>
						<div className="flex justify-between items-center">
							<CardTitle>Exploration</CardTitle>
							<div className="flex gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => onDrawCard("exploration")}
								>
									Draw Card
								</Button>
								{speechSupported && (
									<Button
										variant={
											isListening && activeTextarea === "exploration"
												? "default"
												: "outline"
										}
										size="sm"
										onClick={() => onToggleListening("exploration")}
									>
										{isListening && activeTextarea === "exploration" ? (
											<MicOff className="h-4 w-4" />
										) : (
											<Mic className="h-4 w-4" />
										)}
									</Button>
								)}
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<Textarea
							value={selectedSession.explorationLog}
							onChange={(e) =>
								onUpdateSessionLog("explorationLog", e.target.value)
							}
							placeholder="Record your exploration..."
							rows={8}
							className="min-h-[200px]"
						/>
						{isListening && activeTextarea === "exploration" && (
							<div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
								<span className="relative flex h-3 w-3">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
									<span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
								</span>
								Listening...
							</div>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex justify-between items-center">
							<CardTitle>Combat</CardTitle>
							<div className="flex gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => onDrawCard("combat")}
								>
									Draw Card
								</Button>
								{speechSupported && (
									<Button
										variant={
											isListening && activeTextarea === "combat"
												? "default"
												: "outline"
										}
										size="sm"
										onClick={() => onToggleListening("combat")}
									>
										{isListening && activeTextarea === "combat" ? (
											<MicOff className="h-4 w-4" />
										) : (
											<Mic className="h-4 w-4" />
										)}
									</Button>
								)}
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<Textarea
							value={selectedSession.combatLog}
							onChange={(e) => onUpdateSessionLog("combatLog", e.target.value)}
							placeholder="Record combat encounters..."
							rows={8}
							className="min-h-[200px]"
						/>
						{isListening && activeTextarea === "combat" && (
							<div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
								<span className="relative flex h-3 w-3">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
									<span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
								</span>
								Listening...
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			{selectedSession.drawnCards.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle>Drawn Cards</CardTitle>
					</CardHeader>
					<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{selectedSession.drawnCards.map((card, index) => (
							<Card key={index}>
								<CardHeader>
									<CardTitle className="text-lg">
										{card.type === "exploration" ? "Exploration" : "Combat"}{" "}
										Card
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p>{card.text}</p>
								</CardContent>
							</Card>
						))}
					</CardContent>
				</Card>
			)}
		</div>
	);
};

interface SessionListProps {
	sessions: Session[];
	selectedCampaign: Campaign;
	onSetSelectedSession: (session: Session) => void;
}

const SessionList = ({
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
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{campaignSessions.map((session) => (
				<Card
					key={session.id}
					className="hover:bg-gray-50 cursor-pointer"
					onClick={() => onSetSelectedSession(session)}
				>
					<CardHeader>
						<CardTitle>{session.title}</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">
							{session.drawnCards.length} cards drawn
						</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

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
	// Speech recognition props
	speechRecognition: {
		isListening: boolean;
		speechSupported: boolean;
		recognitionRef: React.MutableRefObject<any>;
		activeTextareaRef: React.MutableRefObject<"exploration" | "combat" | null>;
		toggleListening: (type: "exploration" | "combat") => void;
		updateSessionLogFromSpeech: (transcript: string) => void;
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
	// Effect for speech recognition handling (moved from App.tsx)
	useEffect(() => {
		if (
			speechRecognition.speechSupported &&
			speechRecognition.recognitionRef.current
		) {
			const recognition = speechRecognition.recognitionRef.current;
			recognition.onresult = (event: any) => {
				const transcript = Array.from(event.results)
					.map((result: any) => result[0])
					.map((result: any) => result.transcript)
					.join("");
				speechRecognition.updateSessionLogFromSpeech(transcript);
			};
			recognition.onerror = (event: any) => {
				console.error("Speech recognition error", event.error);
				// Consider calling a function to set isListening to false in the parent
				// if speechRecognition.toggleListening is not sufficient by itself.
			};
		}
		// Cleanup function for recognition should be handled in the main App or where recognitionRef is created
	}, [speechRecognition]);

	if (!selectedCampaign) {
		return (
			<div className="text-center text-muted-foreground">
				Select a campaign to see its sessions.
			</div>
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
						<Book className="h-5 w-5" /> {selectedCampaign.title}
					</h2>
				</div>
				{!selectedSession && (
					<Button onClick={() => onSetIsCreating(true)}>
						<Plus className="mr-2 h-4 w-4" /> New Session
					</Button>
				)}
				{selectedSession && (
					<Button variant="outline" onClick={() => onSetSelectedSession(null)}>
						Back to Session List
					</Button>
				)}
			</div>

			{isCreating && !selectedSession ? (
				<SessionForm
					sessionForm={sessionForm}
					onSetSessionForm={onSetSessionForm}
					onCreateSession={onCreateSession}
					onCancel={() => onSetIsCreating(false)}
				/>
			) : selectedSession ? (
				<ActiveSessionView
					selectedSession={selectedSession}
					onDrawCard={onDrawCard}
					onUpdateSessionLog={onUpdateSessionLog}
					speechSupported={speechRecognition.speechSupported}
					isListening={speechRecognition.isListening}
					activeTextarea={speechRecognition.activeTextareaRef.current} // Pass current value
					onToggleListening={speechRecognition.toggleListening}
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
