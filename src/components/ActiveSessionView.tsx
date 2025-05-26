import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff } from "lucide-react";
import type { Session } from "@/types/views";

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

export const ActiveSessionView = ({
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
