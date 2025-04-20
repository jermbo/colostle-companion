interface Props {
	name: string;
	type: string;
}

export const CompanionCard = ({ name, type }: Props) => {
	return (
		<div className="bg-base-200 hover:bg-base-300 relative block overflow-hidden rounded-lg p-6 shadow-lg transition-colors">
			<h3 className="mb-2 text-xl font-bold">{name}</h3>
			<p className="text-base-content/60 mb-4 text-sm">{type}</p>
		</div>
	);
};
