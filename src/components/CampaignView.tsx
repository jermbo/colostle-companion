import { Button } from "@/components/ui/button";
import { Plus, Map, ArrowLeft } from "lucide-react";
import type { Character } from "@/types/character";
import type { Campaign } from "@/types/views";
import { CampaignForm } from "@/components/CampaignForm";
import { CampaignList } from "@/components/CampaignList";

interface Props {
	campaigns: Campaign[];
	campaignForm: Omit<Campaign, "id" | "characterId">;
	selectedCharacter: Character | null;
	isCreating: boolean;
	onSetCampaignForm: React.Dispatch<
		React.SetStateAction<Omit<Campaign, "id" | "characterId">>
	>;
	onCreateCampaign: () => void;
	onSelectCampaign: (campaign: Campaign) => void;
	onSetIsCreating: (isCreating: boolean) => void;
	onGoBack: () => void;
	onListViewSessions: (campaign: Campaign) => void;
}

export const CampaignView = ({
	campaigns,
	campaignForm,
	selectedCharacter,
	isCreating,
	onSetCampaignForm,
	onCreateCampaign,
	onSelectCampaign,
	onSetIsCreating,
	onGoBack,
	onListViewSessions,
}: Props) => {
	if (!selectedCharacter) {
		return (
			<div className="text-center text-muted-foreground">
				Select a character to see their campaigns.
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
						<Map className="h-5 w-5" /> Campaigns for {selectedCharacter.name}
					</h2>
				</div>
				<Button onClick={() => onSetIsCreating(true)}>
					<Plus className="mr-2 h-4 w-4" /> New Campaign
				</Button>
			</div>

			{isCreating ? (
				<CampaignForm
					campaignForm={campaignForm}
					onSetCampaignForm={onSetCampaignForm}
					onCreateCampaign={onCreateCampaign}
					onCancel={() => onSetIsCreating(false)}
				/>
			) : (
				<CampaignList
					campaigns={campaigns}
					selectedCharacter={selectedCharacter}
					onSelectCampaign={onSelectCampaign}
					onListViewSessions={onListViewSessions}
				/>
			)}
		</div>
	);
};
