import { useState } from "react";
import type { Campaign, CampaignFormData } from "@/types/campaign";
import { useCampaigns } from "@/lib/store/CampaignContext";
import CampaignForm from "@/components/CampaignForm";
import CampaignList from "@/components/CampaignList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

interface Props {
	characterId: string;
}

const CampaignManagement = ({ characterId }: Props) => {
	const navigate = useNavigate();
	const [isCreating, setIsCreating] = useState(false);
	const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
	const [campaignForm, setCampaignForm] = useState<CampaignFormData>({
		title: "",
		description: "",
	});

	const {
		campaigns,
		isLoading,
		error,
		createCampaign,
		updateCampaign,
		deleteCampaign,
	} = useCampaigns(characterId);

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-bold">Campaigns</h2>
				{!isCreating && !editingCampaign && (
					<Button onClick={() => setIsCreating(true)}>
						<Plus className="mr-2 h-4 w-4" /> New Campaign
					</Button>
				)}
			</div>

			{isCreating || editingCampaign ? (
				<CampaignForm
					campaignForm={campaignForm}
					onSetCampaignForm={setCampaignForm}
					onCreateCampaign={async () => {
						if (editingCampaign) {
							await updateCampaign({
								...editingCampaign,
								...campaignForm,
							});
							setEditingCampaign(null);
						} else {
							await createCampaign({
								...campaignForm,
								characterId,
							});
						}
						setCampaignForm({ title: "", description: "" });
						setIsCreating(false);
					}}
					onCancel={() => {
						setEditingCampaign(null);
						setIsCreating(false);
						setCampaignForm({ title: "", description: "" });
					}}
					isEditing={!!editingCampaign}
				/>
			) : (
				<CampaignList
					campaigns={campaigns}
					onSelectCampaign={(campaign) => {
						navigate({
							to: "/campaign/$characterId/$campaignId",
							params: { characterId, campaignId: campaign.id },
						});
					}}
					onEditCampaign={(campaign) => {
						setEditingCampaign(campaign);
						setCampaignForm({
							title: campaign.title,
							description: campaign.description,
						});
					}}
					onDeleteCampaign={(campaign) => deleteCampaign(campaign.id)}
					isLoading={isLoading}
					error={error}
				/>
			)}
		</div>
	);
};

export default CampaignManagement;
