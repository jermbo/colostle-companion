import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Edit, Trash2, Calendar } from "lucide-react";
import type { Campaign } from "@/types/campaign";
import { format } from "date-fns";

interface Props {
	campaigns: Campaign[];
	onSelectCampaign: (campaign: Campaign) => void;
	onEditCampaign: (campaign: Campaign) => void;
	onDeleteCampaign: (campaign: Campaign) => void;
	isLoading: boolean;
	error: Error | null;
}

const CampaignList = ({
	campaigns,
	onSelectCampaign,
	onEditCampaign,
	onDeleteCampaign,
	isLoading,
	error,
}: Props): React.ReactElement => {
	if (isLoading) {
		return <div>Loading campaigns...</div>;
	}

	if (error) {
		return <div>Error loading campaigns: {error.message}</div>;
	}

	if (campaigns.length === 0) {
		return (
			<div className="text-center text-muted-foreground">
				No campaigns found. Create your first campaign to get started!
			</div>
		);
	}

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{campaigns.map((campaign) => (
				<Card
					key={campaign.id}
					className="cursor-pointer transition-colors hover:bg-muted/50"
					onClick={() => onSelectCampaign(campaign)}
				>
					<CardHeader>
						<div className="flex items-start justify-between">
							<div>
								<CardTitle>{campaign.title}</CardTitle>
								<CardDescription className="mt-1 flex items-center gap-1">
									<Calendar className="h-4 w-4" />
									{format(new Date(campaign.createdAt), "MMM d, yyyy")}
								</CardDescription>
							</div>
							<div className="flex gap-1">
								<Button
									variant="ghost"
									size="icon"
									onClick={(e) => {
										e.stopPropagation();
										onEditCampaign(campaign);
									}}
								>
									<Edit className="h-4 w-4" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									onClick={(e) => {
										e.stopPropagation();
										onDeleteCampaign(campaign);
									}}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground line-clamp-3">
							{campaign.description}
						</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export default CampaignList;
