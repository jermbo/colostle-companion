import { useState } from "react";
import Button from "./ui/Button";

interface Props {
	onSubmit: (data: { name: string; type: string }) => void;
}

export const CompanionForm = ({ onSubmit }: Props) => {
	const [name, setName] = useState("");
	const [type, setType] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			await onSubmit({
				name,
				type,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<fieldset className="fieldset bg-base-200 border-base-300 rounded-box flex flex-col gap-4 border p-4">
				<legend className="fieldset-legend">Create Companion</legend>

				<label className="label w-full" htmlFor="companionName">
					Companion Name
				</label>
				<input
					type="text"
					id="companionName"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="input w-full"
					placeholder="Enter companion name"
					required
				/>

				<label className="label w-full" htmlFor="companionType">
					Companion Type
				</label>
				<input
					type="text"
					id="companionType"
					value={type}
					onChange={(e) => setType(e.target.value)}
					className="input w-full"
					placeholder="Enter companion type (e.g., Rookling)"
					required
				/>

				<Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
					{isSubmitting ? "Creating..." : "Create Companion"}
				</Button>
			</fieldset>
		</form>
	);
};
