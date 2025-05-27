import { createFileRoute, redirect } from "@tanstack/react-router";
import { useCharacters } from "@/lib/store/CharacterContext";
import { CampaignView } from "@/components/CampaignView";
import { useState } from "react";
import type { Campaign } from "@/types/views";
import { useRouter } from "@tanstack/react-router";
import { ErrorBoundary } from "@/components/ErrorBoundary";

import { characterStorage } from "@/lib/storage/characterStorage";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { NotFoundState } from "@/components/NotFoundState";

export const Route = createFileRoute("/characters/$characterId")({
	beforeLoad: async ({ params }) => {
		// Pre-fetch character data
		const character = await characterStorage.get(params.characterId);
		if (!character) {
			throw redirect({
				to: "/characters",
			});
		}
		return { character };
	},
	component: CharacterDetails,
});

function CharacterDetails() {
	const { characterId } = Route.useParams();
	const { characters, isLoading, error } = useCharacters();
	const router = useRouter();
	const [campaigns, setCampaigns] = useState<Campaign[]>([]);
	const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
		null,
	);
	const [isCreating, setIsCreating] = useState(false);

	const character = characters.find((c) => c.id === characterId);

	if (isLoading) {
		return <LoadingState />;
	}

	if (error) {
		return <ErrorState message={error.message} />;
	}

	if (!character) {
		return <NotFoundState message="Character not found" />;
	}

	const handleGoBack = () => {
		router.navigate({ to: "/characters" });
	};

	const handleListViewSessions = (campaign: Campaign) => {
		// TODO: Implement session view route
		console.log("View sessions for campaign:", campaign.id);
	};

	return (
		<ErrorBoundary>
			<CampaignView
				campaigns={campaigns}
				campaignForm={{ title: "", description: "" }}
				selectedCharacter={character}
				isCreating={isCreating}
				onSetCampaignForm={() => {}}
				onCreateCampaign={() => {}}
				onSelectCampaign={setSelectedCampaign}
				onSetIsCreating={setIsCreating}
				onGoBack={handleGoBack}
				onListViewSessions={handleListViewSessions}
			/>
		</ErrorBoundary>
	);
}
