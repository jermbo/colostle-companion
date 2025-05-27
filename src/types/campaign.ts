export interface Campaign {
	id: string;
	characterId: string;
	title: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface CampaignFormData {
	title: string;
	description: string;
}

export interface CampaignContextType {
	campaigns: Campaign[];
	isLoading: boolean;
	error: Error | null;
	createCampaign: (
		campaign: Omit<Campaign, "id" | "createdAt" | "updatedAt">,
	) => Promise<void>;
	updateCampaign: (campaign: Campaign) => Promise<void>;
	deleteCampaign: (id: string) => Promise<void>;
}
