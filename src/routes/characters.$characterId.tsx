import { createFileRoute } from "@tanstack/react-router";
import { useCharacters } from "@/lib/store/CharacterContext";
import { CampaignView } from "@/components/CampaignView";
import { useState } from "react";
import type { Campaign } from "@/types/views";
import { useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/characters/$characterId")({
	component: CharacterDetails,
});

function CharacterDetails() {
	const { characterId } = Route.useParams();
	const { characters } = useCharacters();
	const router = useRouter();
	const [campaigns, setCampaigns] = useState<Campaign[]>([]);
	const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
		null,
	);
	const [isCreating, setIsCreating] = useState(false);

	const character = characters.find((c) => c.id === characterId);

	if (!character) {
		return <div>Character not found</div>;
	}

	const handleGoBack = () => {
		router.navigate({ to: "/characters" });
	};

	const handleListViewSessions = (campaign: Campaign) => {
		router.navigate({
			to: "/characters/$characterId/campaigns/$campaignId/sessions",
			params: { characterId, campaignId: campaign.id },
		});
	};

	return (
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
	);
}
