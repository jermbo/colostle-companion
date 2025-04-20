import { useState } from "react";
import Button from "./ui/Button";
import { Modal } from "./ui/Modal";

interface Props {
	onSubmit: (data: { name: string; type: string }) => void;
	isOpen: boolean;
	onClose: () => void;
}

export const CompanionForm = ({ onSubmit, isOpen, onClose }: Props) => {
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
			onClose();
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Create Companion">
			<form onSubmit={handleSubmit}>
				<fieldset className="fieldset bg-base-200 border-base-300 rounded-box flex flex-col gap-4 border p-4">
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

					<div className="flex gap-2">
						<Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit" variant="primary" className="flex-1" disabled={isSubmitting}>
							{isSubmitting ? "Creating..." : "Create Companion"}
						</Button>
					</div>
				</fieldset>
			</form>
		</Modal>
	);
};
