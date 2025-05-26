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
import type { Campaign } from "@/types/views";

interface CampaignFormProps {
	campaignForm: Omit<Campaign, "id" | "characterId">;
	onSetCampaignForm: React.Dispatch<
		React.SetStateAction<Omit<Campaign, "id" | "characterId">>
	>;
	onCreateCampaign: () => void;
	onCancel: () => void;
}

export const CampaignForm = ({
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
