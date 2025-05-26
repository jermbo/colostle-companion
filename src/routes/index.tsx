import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	ArrowLeft,
	User,
	Map,
	Book,
	Plus,
	List,
	Mic,
	MicOff,
} from "lucide-react";

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

type Character = {
	id: string;
	name: string;
	race: string;
	class: string;
	stats: string;
	background: string;
};

type Campaign = {
	id: string;
	characterId: string;
	title: string;
	description: string;
};

type Session = {
	id: string;
	campaignId: string;
	title: string;
	explorationLog: string;
	combatLog: string;
	drawnCards: { type: "exploration" | "combat"; text: string }[];
};

export default function App() {
	// Data state
	const [characters, setCharacters] = useState<Character[]>([]);
	const [campaigns, setCampaigns] = useState<Campaign[]>([]);
	const [sessions, setSessions] = useState<Session[]>([]);

	// Form state
	const [characterForm, setCharacterForm] = useState<Omit<Character, "id">>({
		name: "",
		race: "",
		class: "",
		stats: "",
		background: "",
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

			recognitionRef.current.onresult = (event: any) => {
				const transcript = Array.from(event.results)
					.map((result: any) => result[0])
					.map((result) => result.transcript)
					.join("");

				if (activeTextareaRef.current) {
					updateSessionLog(
						activeTextareaRef.current === "exploration"
							? "explorationLog"
							: "combatLog",
						transcript,
					);
				}
			};

			recognitionRef.current.onerror = (event: any) => {
				console.error("Speech recognition error", event.error);
				setIsListening(false);
			};
		}

		return () => {
			if (recognitionRef.current) {
				recognitionRef.current.stop();
			}
		};
	}, []);

	const toggleListening = (type: "exploration" | "combat") => {
		if (!speechSupported) {
			alert("Speech recognition is not supported in your browser");
			return;
		}

		if (isListening) {
			recognitionRef.current.stop();
			setIsListening(false);
			activeTextareaRef.current = null;
		} else {
			activeTextareaRef.current = type;
			recognitionRef.current.start();
			setIsListening(true);
		}
	};

	// Character methods
	const createCharacter = () => {
		const newCharacter = {
			...characterForm,
			id: Date.now().toString(),
		};
		setCharacters([...characters, newCharacter]);
		setCharacterForm({
			name: "",
			race: "",
			class: "",
			stats: "",
			background: "",
		});
		setIsCreating(false);
	};

	const selectCharacter = (character: Character) => {
		setSelectedCharacter(character);
		setView("campaigns");
		setSelectedCampaign(null);
		setSelectedSession(null);
	};

	// Campaign methods
	const createCampaign = () => {
		if (!selectedCharacter) return;

		const newCampaign = {
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
	};

	// Session methods
	const createSession = () => {
		if (!selectedCampaign) return;

		const newSession = {
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
		const newCard = {
			type,
			text: cardPool[randomIndex],
		};

		setSessions(
			sessions.map((s) =>
				s.id === selectedSession.id
					? { ...s, drawnCards: [...s.drawnCards, newCard] }
					: s,
			),
		);
		setSelectedSession({
			...selectedSession,
			drawnCards: [...selectedSession.drawnCards, newCard],
		});
	};

	const updateSessionLog = (
		field: "explorationLog" | "combatLog",
		value: string,
	) => {
		if (!selectedSession) return;

		setSessions(
			sessions.map((s) =>
				s.id === selectedSession.id ? { ...s, [field]: value } : s,
			),
		);
		setSelectedSession({
			...selectedSession,
			[field]: value,
		});
	};

	const goBack = () => {
		if (view === "sessions") {
			setView("campaigns");
			setSelectedSession(null);
		} else if (view === "campaigns") {
			setView("characters");
			setSelectedCampaign(null);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 p-4 md:p-8">
			<div className="max-w-4xl mx-auto">
				<header className="mb-8 text-center">
					<h1 className="text-3xl font-bold">TTRPG Companion</h1>
					<p className="text-muted-foreground">Your solo adventure assistant</p>
				</header>

				{/* Navigation breadcrumbs */}
				<div className="flex items-center gap-2 mb-6 text-sm">
					<Button
						variant={view === "characters" ? "default" : "outline"}
						size="sm"
						onClick={() => setView("characters")}
					>
						Characters
					</Button>
					{view !== "characters" && (
						<>
							<span>/</span>
							<Button
								variant={view === "campaigns" ? "default" : "outline"}
								size="sm"
								onClick={() => setView("campaigns")}
							>
								Campaigns
							</Button>
						</>
					)}
					{view === "sessions" && (
						<>
							<span>/</span>
							<Button variant="default" size="sm">
								Session
							</Button>
						</>
					)}
				</div>

				{/* Character View */}
				{view === "characters" && (
					<div className="space-y-4">
						<div className="flex justify-between items-center">
							<h2 className="text-xl font-bold flex items-center gap-2">
								<User className="h-5 w-5" /> Characters
							</h2>
							<Button onClick={() => setIsCreating(true)}>
								<Plus className="mr-2 h-4 w-4" /> New Character
							</Button>
						</div>

						{isCreating ? (
							<Card>
								<CardHeader>
									<CardTitle>Create New Character</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div>
										<Label>Name</Label>
										<Input
											value={characterForm.name}
											onChange={(e) =>
												setCharacterForm({
													...characterForm,
													name: e.target.value,
												})
											}
											placeholder="Character name"
										/>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<Label>Race</Label>
											<Input
												value={characterForm.race}
												onChange={(e) =>
													setCharacterForm({
														...characterForm,
														race: e.target.value,
													})
												}
												placeholder="Character race"
											/>
										</div>
										<div>
											<Label>Class</Label>
											<Input
												value={characterForm.class}
												onChange={(e) =>
													setCharacterForm({
														...characterForm,
														class: e.target.value,
													})
												}
												placeholder="Character class"
											/>
										</div>
									</div>
									<div>
										<Label>Stats</Label>
										<Textarea
											value={characterForm.stats}
											onChange={(e) =>
												setCharacterForm({
													...characterForm,
													stats: e.target.value,
												})
											}
											placeholder="Character stats"
											rows={3}
										/>
									</div>
									<div>
										<Label>Background</Label>
										<Textarea
											value={characterForm.background}
											onChange={(e) =>
												setCharacterForm({
													...characterForm,
													background: e.target.value,
												})
											}
											placeholder="Character background"
											rows={3}
										/>
									</div>
								</CardContent>
								<CardFooter className="flex justify-end gap-2">
									<Button
										variant="outline"
										onClick={() => setIsCreating(false)}
									>
										Cancel
									</Button>
									<Button onClick={createCharacter}>Create Character</Button>
								</CardFooter>
							</Card>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{characters.length === 0 ? (
									<Card>
										<CardContent className="p-6 text-center">
											<p className="text-muted-foreground">
												No characters created yet
											</p>
										</CardContent>
									</Card>
								) : (
									characters.map((character) => (
										<Card
											key={character.id}
											className="hover:bg-gray-50 cursor-pointer"
										>
											<CardHeader>
												<CardTitle>{character.name}</CardTitle>
												<CardDescription>
													{character.race} {character.class}
												</CardDescription>
											</CardHeader>
											<CardContent>
												<p className="line-clamp-2 text-sm">
													{character.background}
												</p>
											</CardContent>
											<CardFooter>
												<Button
													className="w-full"
													onClick={() => selectCharacter(character)}
												>
													Select Character
												</Button>
											</CardFooter>
										</Card>
									))
								)}
							</div>
						)}
					</div>
				)}

				{/* Campaign View */}
				{view === "campaigns" && selectedCharacter && (
					<div className="space-y-4">
						<div className="flex justify-between items-center">
							<div className="flex items-center gap-4">
								<Button variant="outline" size="icon" onClick={goBack}>
									<ArrowLeft className="h-4 w-4" />
								</Button>
								<h2 className="text-xl font-bold flex items-center gap-2">
									<Map className="h-5 w-5" /> Campaigns for{" "}
									{selectedCharacter.name}
								</h2>
							</div>
							<Button onClick={() => setIsCreating(true)}>
								<Plus className="mr-2 h-4 w-4" /> New Campaign
							</Button>
						</div>

						{isCreating ? (
							<Card>
								<CardHeader>
									<CardTitle>Create New Campaign</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div>
										<Label>Title</Label>
										<Input
											value={campaignForm.title}
											onChange={(e) =>
												setCampaignForm({
													...campaignForm,
													title: e.target.value,
												})
											}
											placeholder="Campaign title"
										/>
									</div>
									<div>
										<Label>Description</Label>
										<Textarea
											value={campaignForm.description}
											onChange={(e) =>
												setCampaignForm({
													...campaignForm,
													description: e.target.value,
												})
											}
											placeholder="Campaign description"
											rows={4}
										/>
									</div>
								</CardContent>
								<CardFooter className="flex justify-end gap-2">
									<Button
										variant="outline"
										onClick={() => setIsCreating(false)}
									>
										Cancel
									</Button>
									<Button onClick={createCampaign}>Create Campaign</Button>
								</CardFooter>
							</Card>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{campaigns.filter((c) => c.characterId === selectedCharacter.id)
									.length === 0 ? (
									<Card>
										<CardContent className="p-6 text-center">
											<p className="text-muted-foreground">
												No campaigns for this character yet
											</p>
										</CardContent>
									</Card>
								) : (
									campaigns
										.filter((c) => c.characterId === selectedCharacter.id)
										.map((campaign) => (
											<Card
												key={campaign.id}
												className="hover:bg-gray-50 cursor-pointer"
											>
												<CardHeader>
													<CardTitle>{campaign.title}</CardTitle>
												</CardHeader>
												<CardContent>
													<p className="line-clamp-3 text-sm">
														{campaign.description}
													</p>
												</CardContent>
												<CardFooter className="flex justify-between">
													<Button
														variant="outline"
														onClick={() => {
															setSelectedCampaign(campaign);
															setIsCreating(true);
														}}
													>
														<List className="mr-2 h-4 w-4" /> Sessions
													</Button>
													<Button onClick={() => selectCampaign(campaign)}>
														Continue
													</Button>
												</CardFooter>
											</Card>
										))
								)}
							</div>
						)}
					</div>
				)}

				{/* Session View */}
				{view === "sessions" && selectedCampaign && (
					<div className="space-y-4">
						<div className="flex justify-between items-center">
							<div className="flex items-center gap-4">
								<Button variant="outline" size="icon" onClick={goBack}>
									<ArrowLeft className="h-4 w-4" />
								</Button>
								<h2 className="text-xl font-bold flex items-center gap-2">
									<Book className="h-5 w-5" /> {selectedCampaign.title}
								</h2>
							</div>
							<Button onClick={() => setIsCreating(true)}>
								<Plus className="mr-2 h-4 w-4" /> New Session
							</Button>
						</div>

						{isCreating ? (
							<Card>
								<CardHeader>
									<CardTitle>Start New Session</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div>
										<Label>Title</Label>
										<Input
											value={sessionForm.title}
											onChange={(e) =>
												setSessionForm({
													...sessionForm,
													title: e.target.value,
												})
											}
											placeholder="Session title"
										/>
									</div>
								</CardContent>
								<CardFooter className="flex justify-end gap-2">
									<Button
										variant="outline"
										onClick={() => setIsCreating(false)}
									>
										Cancel
									</Button>
									<Button onClick={createSession}>Start Session</Button>
								</CardFooter>
							</Card>
						) : selectedSession ? (
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
														onClick={() => drawCard("exploration")}
													>
														Draw Card
													</Button>
													{speechSupported && (
														<Button
															variant={
																isListening &&
																activeTextareaRef.current === "exploration"
																	? "default"
																	: "outline"
															}
															size="sm"
															onClick={() => toggleListening("exploration")}
														>
															{isListening &&
															activeTextareaRef.current === "exploration" ? (
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
													updateSessionLog("explorationLog", e.target.value)
												}
												placeholder="Record your exploration..."
												rows={8}
												className="min-h-[200px]"
											/>
											{isListening &&
												activeTextareaRef.current === "exploration" && (
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
														onClick={() => drawCard("combat")}
													>
														Draw Card
													</Button>
													{speechSupported && (
														<Button
															variant={
																isListening &&
																activeTextareaRef.current === "combat"
																	? "default"
																	: "outline"
															}
															size="sm"
															onClick={() => toggleListening("combat")}
														>
															{isListening &&
															activeTextareaRef.current === "combat" ? (
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
												onChange={(e) =>
													updateSessionLog("combatLog", e.target.value)
												}
												placeholder="Record combat encounters..."
												rows={8}
												className="min-h-[200px]"
											/>
											{isListening &&
												activeTextareaRef.current === "combat" && (
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
															{card.type === "exploration"
																? "Exploration"
																: "Combat"}{" "}
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
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{sessions.filter((s) => s.campaignId === selectedCampaign.id)
									.length === 0 ? (
									<Card>
										<CardContent className="p-6 text-center">
											<p className="text-muted-foreground">
												No sessions for this campaign yet
											</p>
										</CardContent>
									</Card>
								) : (
									sessions
										.filter((s) => s.campaignId === selectedCampaign.id)
										.map((session) => (
											<Card
												key={session.id}
												className="hover:bg-gray-50 cursor-pointer"
												onClick={() => setSelectedSession(session)}
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
										))
								)}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
