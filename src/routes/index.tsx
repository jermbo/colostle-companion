import { createFileRoute } from "@tanstack/react-router";
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
	// Data state
	const [characters, setCharacters] = useState<Character[]>([]);
	const [campaigns, setCampaigns] = useState<Campaign[]>([]);
	const [sessions, setSessions] = useState<Session[]>([]);

	// Form state
	const [characterForm, setCharacterForm] = useState<
		Omit<Character, "id" | "createdAt" | "updatedAt">
	>({
		name: "",
		class: "armed" as CharacterClass, // Ensure type correctness
		level: 1,
	});

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
	const recognitionRef = useRef<any>(null);
	const activeTextareaRef = useRef<"exploration" | "combat" | null>(null);

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

			// onresult will be handled by a callback passed to SessionView
			// recognitionRef.current.onresult = ... (handled via prop)

			recognitionRef.current.onerror = (event: any) => {
				console.error("Speech recognition error", event.error);
				setIsListening(false); // Ensure listening state is reset on error
				activeTextareaRef.current = null;
			};

			// recognitionRef.current.onend = () => {
			//   // Automatically restart if it was manually stopped
			//   // This might be too aggressive depending on desired UX
			//   if (isListening) {
			//       recognitionRef.current.start();
			//   }
			// };
		}

		return () => {
			if (recognitionRef.current) {
				recognitionRef.current.stop();
			}
		};
	}, []);

	const updateSessionLogFromSpeech = (transcript: string) => {
		if (activeTextareaRef.current && selectedSession) {
			const field =
				activeTextareaRef.current === "exploration"
					? "explorationLog"
					: "combatLog";
			// Update the log with the full transcript so far
			// The child component will receive this new selectedSession value
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
		if (isListening && activeTextareaRef.current === type) {
			recognitionRef.current.stop();
			setIsListening(false);
			activeTextareaRef.current = null;
		} else {
			if (isListening) {
				// If listening to the other textarea, stop it first
				recognitionRef.current.stop();
			}
			activeTextareaRef.current = type;
			recognitionRef.current.start();
			setIsListening(true);
		}
	};

	// Character methods
	const createCharacter = () => {
		const newCharacter: Character = {
			...characterForm,
			id: Date.now().toString(),
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		setCharacters([...characters, newCharacter]);
		setCharacterForm({ name: "", class: "armed", level: 1 });
		setIsCreating(false);
	};

	const selectCharacter = (character: Character) => {
		setSelectedCharacter(character);
		setView("campaigns");
		setSelectedCampaign(null);
		setSelectedSession(null);
		setIsCreating(false); // Reset isCreating when changing main view context
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
		setSelectedSession(null); // When selecting a campaign, clear any active session
		setIsCreating(false); // Reset isCreating
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
		setSelectedSession(newSession); // Automatically select the new session
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
				setSelectedSession(null); // First, deselect current session to go back to session list
				// setIsCreating(false); // Already handled by setSelectedSession(null) if it implies view change
			} else {
				setView("campaigns");
				setSelectedCampaign(null); // Deselect campaign when going back to characters from campaign's session list
			}
		} else if (view === "campaigns") {
			setView("characters");
			setSelectedCharacter(null); // Deselect character when going back to overview
		}
		setIsCreating(false); // General reset for creation forms
	};

	const speechRecognitionProps = {
		isListening,
		speechSupported,
		recognitionRef,
		activeTextareaRef,
		toggleListening,
		updateSessionLogFromSpeech,
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
						characters={characters}
						characterForm={characterForm}
						isCreating={isCreating}
						onSetCharacterForm={setCharacterForm}
						onCreateCharacter={createCharacter}
						onSelectCharacter={selectCharacter}
						onSetIsCreating={setIsCreating}
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
						onSelectCampaign={selectCampaign} // This is for "Continue" button
						onListViewSessions={goBack} // This is for "Sessions" button
						onSetIsCreating={setIsCreating}
						onGoBack={goBack}
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
						onSetSelectedSession={setSelectedSession} // Used by SessionList and also to clear selection
						onSetIsCreating={setIsCreating}
						onGoBack={goBack}
						onDrawCard={drawCard}
						onUpdateSessionLog={updateSessionLog} // Manual log update
						speechRecognition={speechRecognitionProps}
					/>
				)}
			</div>
		</div>
	);
}
