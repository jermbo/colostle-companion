import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button"; // No longer directly used
// Card, Input, Label, Textarea, and specific Lucide icons are handled by child components
import type { Character, CharacterClass } from "@/types/character";
// import { CHARACTER_CLASSES } from "@/types/character"; // Not directly used in this file
import type { Campaign, Session } from "@/types/views";

// Import the new components
import { NavigationBar } from "@/components/NavigationBar";
import { CharacterView } from "@/components/CharacterView";
import { CampaignView } from "@/components/CampaignView";
import { SessionView } from "@/components/SessionView";

export const Route = createFileRoute("/")({
	beforeLoad: () => {
		throw redirect({
			to: "/characters",
		});
	},
	component: App,
});

// Sample data
const CARDS = {
	exploration: [
		"Unexpected Discovery - You find something surprising",
		"Environmental Hazard - The terrain presents a challenge",
		"Friendly Encounter - You meet someone helpful",
		"Ominous Sign - Something doesn't feel right",
		"Hidden Path - A secret way forward reveals itself",
	],
	combat: [
		"Advantageous Position - You gain the upper hand",
		"Dangerous Foe - The enemy reveals new capabilities",
		"Lucky Break - Fortune smiles upon you",
		"Tactical Complication - The situation becomes more complex",
		"Moment of Respite - You catch your breath",
	],
};

export default function App() {
	// Campaign and Session state
	const [campaigns, setCampaigns] = useState<Campaign[]>([]);
	const [sessions, setSessions] = useState<Session[]>([]);

	// Form state
	const [campaignForm, setCampaignForm] = useState<
		Omit<Campaign, "id" | "characterId">
	>({
		title: "",
		description: "",
	});

	const [sessionForm, setSessionForm] = useState<
		Omit<Session, "id" | "campaignId" | "drawnCards">
	>({
		title: "",
		explorationLog: "",
		combatLog: "",
	});

	// UI state
	const [view, setView] = useState<"characters" | "campaigns" | "sessions">(
		"characters",
	);
	const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
		null,
	);
	const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
		null,
	);
	const [selectedSession, setSelectedSession] = useState<Session | null>(null);
	const [isCreating, setIsCreating] = useState(false);

	// Speech recognition state
	const [isListening, setIsListening] = useState(false);
	const [speechSupported, setSpeechSupported] = useState(false);
	const [activeTextarea, setActiveTextarea] = useState<
		"exploration" | "combat" | null
	>(null);
	const recognitionRef = useRef<any>(null);

	useEffect(() => {
		// Check if speech recognition is supported
		if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
			setSpeechSupported(true);
			const SpeechRecognition =
				(window as any).webkitSpeechRecognition ||
				(window as any).SpeechRecognition;
			recognitionRef.current = new SpeechRecognition();
			recognitionRef.current.continuous = true;
			recognitionRef.current.interimResults = true;
			recognitionRef.current.lang = "en-US";

			recognitionRef.current.onresult = (event: any) => {
				const transcript = Array.from(event.results)
					.map((result: any) => result[0].transcript)
					.join("");
				updateSessionLogFromSpeech(transcript);
			};

			recognitionRef.current.onerror = (event: any) => {
				console.error("Speech recognition error", event.error);
				setIsListening(false);
				setActiveTextarea(null);
			};
		}

		return () => {
			if (recognitionRef.current) {
				recognitionRef.current.stop();
			}
		};
	}, []);

	const updateSessionLogFromSpeech = (transcript: string) => {
		if (activeTextarea && selectedSession) {
			const field =
				activeTextarea === "exploration" ? "explorationLog" : "combatLog";
			const updatedSession = { ...selectedSession, [field]: transcript };
			setSelectedSession(updatedSession);
			setSessions(
				sessions.map((s) => (s.id === updatedSession.id ? updatedSession : s)),
			);
		}
	};

	const toggleListening = (type: "exploration" | "combat") => {
		if (!speechSupported) {
			alert("Speech recognition is not supported in your browser");
			return;
		}
		if (isListening && activeTextarea === type) {
			recognitionRef.current.stop();
			setIsListening(false);
			setActiveTextarea(null);
		} else {
			if (isListening) {
				recognitionRef.current.stop();
			}
			setActiveTextarea(type);
			recognitionRef.current.start();
			setIsListening(true);
		}
	};

	// Campaign methods
	const createCampaign = () => {
		if (!selectedCharacter) return;
		const newCampaign: Campaign = {
			...campaignForm,
			id: Date.now().toString(),
			characterId: selectedCharacter.id,
		};
		setCampaigns([...campaigns, newCampaign]);
		setCampaignForm({ title: "", description: "" });
		setIsCreating(false);
	};

	const selectCampaign = (campaign: Campaign) => {
		setSelectedCampaign(campaign);
		setView("sessions");
		setSelectedSession(null);
		setIsCreating(false);
	};

	// Session methods
	const createSession = () => {
		if (!selectedCampaign) return;
		const newSession: Session = {
			...sessionForm,
			id: Date.now().toString(),
			campaignId: selectedCampaign.id,
			drawnCards: [],
		};
		setSessions([...sessions, newSession]);
		setSelectedSession(newSession);
		setSessionForm({ title: "", explorationLog: "", combatLog: "" });
		setIsCreating(false);
	};

	const drawCard = (type: "exploration" | "combat") => {
		if (!selectedSession) return;
		const cardPool = CARDS[type];
		const randomIndex = Math.floor(Math.random() * cardPool.length);
		const newCard = { type, text: cardPool[randomIndex] };
		const updatedSession = {
			...selectedSession,
			drawnCards: [...selectedSession.drawnCards, newCard],
		};
		setSessions(
			sessions.map((s) => (s.id === updatedSession.id ? updatedSession : s)),
		);
		setSelectedSession(updatedSession);
	};

	const updateSessionLog = (
		field: "explorationLog" | "combatLog",
		value: string,
	) => {
		if (!selectedSession) return;
		const updatedSession = { ...selectedSession, [field]: value };
		setSessions(
			sessions.map((s) => (s.id === updatedSession.id ? updatedSession : s)),
		);
		setSelectedSession(updatedSession);
	};

	const handleSetView = (targetView: "characters" | "campaigns") => {
		setView(targetView);
		if (targetView === "characters") {
			setSelectedCharacter(null);
			setSelectedCampaign(null);
			setSelectedSession(null);
		}
		setIsCreating(false);
	};

	const goBack = () => {
		if (view === "sessions") {
			if (selectedSession) {
				setSelectedSession(null);
			} else {
				setView("campaigns");
				setSelectedCampaign(null);
			}
		} else if (view === "campaigns") {
			setView("characters");
			setSelectedCharacter(null);
		}
		setIsCreating(false);
	};

	return (
		<div className="min-h-screen bg-gray-50 p-4 md:p-8">
			<div className="max-w-4xl mx-auto">
				<header className="mb-8 text-center">
					<h1 className="text-3xl font-bold">TTRPG Companion</h1>
					<p className="text-muted-foreground">Your solo adventure assistant</p>
				</header>

				<NavigationBar view={view} onSetView={handleSetView} />

				{view === "characters" && (
					<CharacterView
						onSelectCharacter={(character) => {
							setSelectedCharacter(character);
							setView("campaigns");
							setSelectedCampaign(null);
							setSelectedSession(null);
							setIsCreating(false);
						}}
					/>
				)}

				{view === "campaigns" && (
					<CampaignView
						campaigns={campaigns}
						campaignForm={campaignForm}
						selectedCharacter={selectedCharacter}
						isCreating={isCreating}
						onSetCampaignForm={setCampaignForm}
						onCreateCampaign={createCampaign}
						onSelectCampaign={selectCampaign}
						onSetIsCreating={setIsCreating}
						onGoBack={goBack}
						onListViewSessions={goBack}
					/>
				)}

				{view === "sessions" && (
					<SessionView
						sessions={sessions}
						sessionForm={sessionForm}
						selectedCampaign={selectedCampaign}
						selectedSession={selectedSession}
						isCreating={isCreating}
						onSetSessionForm={setSessionForm}
						onCreateSession={createSession}
						onSetSelectedSession={setSelectedSession}
						onSetIsCreating={setIsCreating}
						onGoBack={goBack}
						onDrawCard={drawCard}
						onUpdateSessionLog={updateSessionLog}
						speechRecognition={{
							isListening,
							speechSupported,
							activeTextarea,
							toggleListening,
						}}
					/>
				)}
			</div>
		</div>
	);
}
