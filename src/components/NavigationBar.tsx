import { Button } from "@/components/ui/button";

interface Props {
	view: "characters" | "campaigns" | "sessions";
	onSetView: (view: "characters" | "campaigns") => void;
}

export const NavigationBar = ({ view, onSetView }: Props) => {
	return (
		<div className="flex items-center gap-2 mb-6 text-sm">
			<Button
				variant={view === "characters" ? "default" : "outline"}
				size="sm"
				onClick={() => onSetView("characters")}
			>
				Characters
			</Button>
			{view !== "characters" && (
				<>
					<span>/</span>
					<Button
						variant={view === "campaigns" ? "default" : "outline"}
						size="sm"
						onClick={() => onSetView("campaigns")}
					>
						Campaigns
					</Button>
				</>
			)}
			{view === "sessions" && (
				<>
					<span>/</span>
					<Button variant="default" size="sm" disabled>
						Session
					</Button>
				</>
			)}
		</div>
	);
};
