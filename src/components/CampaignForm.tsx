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
import type { CampaignFormData } from "@/types/campaign";
import { useCallback, useMemo } from "react";

interface Props {
	campaignForm: CampaignFormData;
	onSetCampaignForm: React.Dispatch<React.SetStateAction<CampaignFormData>>;
	onCreateCampaign: () => void;
	onCancel: () => void;
	isEditing?: boolean;
}

const CampaignForm = ({
	campaignForm,
	onSetCampaignForm,
	onCreateCampaign,
	onCancel,
	isEditing = false,
}: Props): React.ReactElement => {
	const isFormValid: boolean = useMemo(() => {
		return campaignForm.title.trim() !== "";
	}, [campaignForm.title]);

	const handleSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>): void => {
			event.preventDefault();

			if (isFormValid) {
				onCreateCampaign();
			}
		},
		[isFormValid, onCreateCampaign],
	);

	const formTitle = useMemo(() => {
		if (isEditing) {
			return `Editing - ${campaignForm.title}`;
		}
		return "Create New Campaign";
	}, [isEditing, campaignForm.title]);

	return (
		<form onSubmit={handleSubmit} className="w-full">
			<Card>
				<CardHeader>
					<CardTitle>{formTitle}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<Label htmlFor="campaignTitle">Title</Label>
						<Input
							id="campaignTitle"
							value={campaignForm.title}
							onChange={(e) =>
								onSetCampaignForm({
									...campaignForm,
									title: e.target.value,
								})
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
							className="min-h-[100px]"
						/>
					</div>
				</CardContent>
				<CardFooter className="flex justify-end gap-2">
					<Button type="button" variant="outline" onClick={onCancel}>
						Cancel
					</Button>
					<Button type="submit" disabled={!isFormValid}>
						{isEditing ? "Update Campaign" : "Create Campaign"}
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
};

export default CampaignForm;
