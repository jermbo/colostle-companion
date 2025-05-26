import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { List } from "lucide-react";
import type { Character } from "@/types/character";
import type { Campaign } from "@/types/views";

interface CampaignListProps {
	campaigns: Campaign[];
	selectedCharacter: Character;
	onSelectCampaign: (campaign: Campaign) => void;
	onListViewSessions: (campaign: Campaign) => void;
}

export const CampaignList = ({
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
							onClick={() => onListViewSessions(campaign)}
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
