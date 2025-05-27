import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useCharacters } from "@/lib/store/CharacterContext";
import { CampaignProvider } from "@/lib/store/CampaignContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { NotFoundState } from "@/components/NotFoundState";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { characterStorage } from "@/lib/storage/characterStorage";
import { campaignStorage } from "@/lib/storage/campaignStorage";

export const Route = createFileRoute(
	"/characters/$characterId/campaigns/$campaignId",
)({
	beforeLoad: async ({ params }) => {
		const [character, campaign] = await Promise.all([
			characterStorage.get(params.characterId),
			campaignStorage.get(params.campaignId),
		]);

		if (
			!character ||
			!campaign ||
			campaign.characterId !== params.characterId
		) {
			throw redirect({
				to: "/characters/$characterId",
				params: { characterId: params.characterId },
			});
		}

		return { character, campaign };
	},
	component: CampaignDetails,
});

function CampaignDetails() {
	const { characterId, campaignId } = Route.useParams();
	const {
		characters,
		isLoading: isCharactersLoading,
		error: charactersError,
	} = useCharacters();
	const navigate = useNavigate();

	const character = characters.find((c) => c.id === characterId);

	if (isCharactersLoading) {
		return <LoadingState />;
	}

	if (charactersError) {
		return <ErrorState message={charactersError.message} />;
	}

	if (!character) {
		return <NotFoundState message="Character not found" />;
	}

	const handleGoBack = () => {
		navigate({
			to: "/characters/$characterId",
			params: { characterId },
		});
	};

	return (
		<ErrorBoundary>
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<Button variant="ghost" onClick={handleGoBack}>
						<ArrowLeft className="mr-2 h-4 w-4" /> Back to Campaigns
					</Button>
				</div>

				<CampaignProvider characterId={characterId}>
					{({ campaigns, isLoading, error }) => {
						const campaign = campaigns.find((c) => c.id === campaignId);

						if (isLoading) {
							return <LoadingState />;
						}

						if (error) {
							return <ErrorState message={error.message} />;
						}

						if (!campaign) {
							return <NotFoundState message="Campaign not found" />;
						}

						return (
							<div className="space-y-4">
								<h2 className="text-2xl font-bold">{campaign.title}</h2>
								<p className="text-muted-foreground">{campaign.description}</p>
								{/* TODO: Add session management UI */}
							</div>
						);
					}}
				</CampaignProvider>
			</div>
		</ErrorBoundary>
	);
}
