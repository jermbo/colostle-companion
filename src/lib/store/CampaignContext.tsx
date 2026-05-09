import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Campaign, CampaignContextType } from "@/types/campaign";
import { campaignStorage } from "@/lib/storage/campaignStorage";

const CampaignContext = createContext<CampaignContextType | undefined>(
	undefined,
);

export const useCampaigns = (characterId: string) => {
	const queryClient = useQueryClient();

	const {
		data: campaigns = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ["campaigns", characterId],
		queryFn: async () => {
			const storedCampaigns = await campaignStorage.getByCharacter(characterId);
			return storedCampaigns.map((campaign) => ({
				...campaign,
				createdAt: new Date(campaign.createdAt),
				updatedAt: new Date(campaign.updatedAt),
			}));
		},
	});

	const createMutation = useMutation({
		mutationFn: async (
			newCampaign: Omit<Campaign, "id" | "createdAt" | "updatedAt">,
		) => {
			console.log("Creating new campaign:", newCampaign);
			const campaign: Campaign = {
				...newCampaign,
				id: crypto.randomUUID(),
				createdAt: new Date(),
				updatedAt: new Date(),
			};
			console.log("Campaign to be stored:", campaign);
			await campaignStorage.set(campaign);
			return campaign;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["campaigns", characterId] });
		},
	});

	const updateMutation = useMutation({
		mutationFn: async (campaign: Campaign) => {
			const updatedCampaign = {
				...campaign,
				updatedAt: new Date(),
			};
			await campaignStorage.set(updatedCampaign);
			return updatedCampaign;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["campaigns", characterId] });
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async (id: string) => {
			await campaignStorage.delete(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["campaigns", characterId] });
		},
	});

	return {
		campaigns,
		isLoading,
		error: error as Error | null,
		createCampaign: async (
			campaign: Omit<Campaign, "id" | "createdAt" | "updatedAt">,
		) => {
			await createMutation.mutateAsync(campaign);
		},
		updateCampaign: async (campaign: Campaign) => {
			await updateMutation.mutateAsync(campaign);
		},
		deleteCampaign: async (id: string) => {
			await deleteMutation.mutateAsync(id);
		},
	};
};

interface CampaignProviderProps {
	children: (context: CampaignContextType) => ReactNode;
	characterId: string;
}

export const CampaignProvider = ({
	children,
	characterId,
}: CampaignProviderProps) => {
	const queryClient = useQueryClient();

	const {
		data: campaigns = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ["campaigns", characterId],
		queryFn: async () => {
			const storedCampaigns = await campaignStorage.getByCharacter(characterId);
			return storedCampaigns.map((campaign) => ({
				...campaign,
				createdAt: new Date(campaign.createdAt),
				updatedAt: new Date(campaign.updatedAt),
			}));
		},
	});

	const createMutation = useMutation({
		mutationFn: async (
			newCampaign: Omit<Campaign, "id" | "createdAt" | "updatedAt">,
		) => {
			console.log("Creating new campaign:", newCampaign);
			const campaign: Campaign = {
				...newCampaign,
				id: crypto.randomUUID(),
				createdAt: new Date(),
				updatedAt: new Date(),
			};
			console.log("Campaign to be stored:", campaign);
			await campaignStorage.set(campaign);
			return campaign;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["campaigns", characterId] });
		},
	});

	const updateMutation = useMutation({
		mutationFn: async (campaign: Campaign) => {
			const updatedCampaign = {
				...campaign,
				updatedAt: new Date(),
			};
			await campaignStorage.set(updatedCampaign);
			return updatedCampaign;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["campaigns", characterId] });
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async (id: string) => {
			await campaignStorage.delete(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["campaigns", characterId] });
		},
	});

	const value: CampaignContextType = {
		campaigns,
		isLoading,
		error: error as Error | null,
		createCampaign: async (campaign) => {
			await createMutation.mutateAsync(campaign);
		},
		updateCampaign: async (campaign) => {
			await updateMutation.mutateAsync(campaign);
		},
		deleteCampaign: async (id) => {
			await deleteMutation.mutateAsync(id);
		},
	};

	return <>{children(value)}</>;
};
