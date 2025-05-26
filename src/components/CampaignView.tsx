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
import { Plus, Map, ArrowLeft, List } from "lucide-react";
import type { Character } from "@/types/character";
import type { Campaign } from "@/types/views";

interface CampaignFormProps {
	campaignForm: Omit<Campaign, "id" | "characterId">;
	onSetCampaignForm: React.Dispatch<
		React.SetStateAction<Omit<Campaign, "id" | "characterId">>
	>;
	onCreateCampaign: () => void;
	onCancel: () => void;
}

const CampaignForm = ({
	campaignForm,
	onSetCampaignForm,
	onCreateCampaign,
	onCancel,
}: CampaignFormProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Create New Campaign</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div>
					<Label htmlFor="campaignTitle">Title</Label>
					<Input
						id="campaignTitle"
						value={campaignForm.title}
						onChange={(e) =>
							onSetCampaignForm({ ...campaignForm, title: e.target.value })
						}
						placeholder="Campaign title"
					/>
				</div>
				<div>
					<Label htmlFor="campaignDescription">Description</Label>
					<Textarea
						id="campaignDescription"
						value={campaignForm.description}
						onChange={(e) =>
							onSetCampaignForm({
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
				<Button variant="outline" onClick={onCancel}>
					Cancel
				</Button>
				<Button onClick={onCreateCampaign}>Create Campaign</Button>
			</CardFooter>
		</Card>
	);
};

interface CampaignListProps {
	campaigns: Campaign[];
	selectedCharacter: Character;
	onSelectCampaign: (campaign: Campaign) => void;
	// For navigating to session list of a campaign without starting a new one or selecting it.
	// This seems to be the intent of the original UI with the "Sessions" button.
	onListViewSessions: (campaign: Campaign) => void;
}

const CampaignList = ({
	campaigns,
	selectedCharacter,
	onSelectCampaign,
	onListViewSessions,
}: CampaignListProps) => {
	const characterCampaigns = campaigns.filter(
		(c) => c.characterId === selectedCharacter.id,
	);

	if (characterCampaigns.length === 0) {
		return (
			<Card>
				<CardContent className="p-6 text-center">
					<p className="text-muted-foreground">
						No campaigns for this character yet
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{characterCampaigns.map((campaign) => (
				<Card key={campaign.id} className="hover:bg-gray-50">
					<CardHeader>
						<CardTitle>{campaign.title}</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="line-clamp-3 text-sm">{campaign.description}</p>
					</CardContent>
					<CardFooter className="flex justify-between">
						<Button
							variant="outline"
							onClick={() => onListViewSessions(campaign)} // Potentially sets view to sessions and selectedCampaign, but not isCreating.
						>
							<List className="mr-2 h-4 w-4" /> Sessions
						</Button>
						<Button onClick={() => onSelectCampaign(campaign)}>Continue</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	);
};

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
	// Add a new prop for the "List Sessions" button functionality
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
					onListViewSessions={onListViewSessions} // Pass down the new handler
				/>
			)}
		</div>
	);
};
