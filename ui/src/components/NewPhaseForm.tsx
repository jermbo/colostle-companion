import React, { useState, useEffect, useRef } from "react";
import { useGame, PhaseType } from "../context/GameContext";

export const NewPhaseForm: React.FC<{ onClose: () => void }> = ({
	onClose,
}) => {
	const { startNewPhase } = useGame();
	const [title, setTitle] = useState("");
	const [type, setType] = useState<PhaseType>("exploration");
	const [error, setError] = useState("");
	const modalRef = useRef<HTMLDivElement>(null);
	const titleInputRef = useRef<HTMLInputElement>(null);

	// Focus on the title input when the modal opens
	useEffect(() => {
		if (titleInputRef.current) {
			titleInputRef.current.focus();
		}

		// Trap focus within the modal
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!title.trim()) {
			setError("Please enter a phase title");
			return;
		}

		startNewPhase(type, title.trim());
		onClose();
	};

	return (
		<div
			className="modal-overlay"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			ref={modalRef}
		>
			<div className="modal-content">
				<header className="modal-header">
					<h2 id="modal-title">Start New Phase</h2>
					<button
						onClick={onClose}
						className="close-button"
						aria-label="Close dialog"
					>
						×
					</button>
				</header>

				{error && (
					<div className="error-message" role="alert">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="phase-title" className="form-label">
							Phase Title
						</label>
						<input
							id="phase-title"
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter a title for this phase"
							className="form-input"
							ref={titleInputRef}
							aria-required="true"
						/>
					</div>

					<fieldset className="form-group">
						<legend className="form-label">Phase Type</legend>
						<div className="type-options-container">
							<TypeOption
								selected={type === "exploration"}
								onClick={() => setType("exploration")}
								icon="🧭"
								label="Exploration"
								color="#4a69bd"
								id="phase-type-exploration"
							/>
							<TypeOption
								selected={type === "combat"}
								onClick={() => setType("combat")}
								icon="⚔️"
								label="Combat"
								color="#9b2226"
								id="phase-type-combat"
							/>
							<TypeOption
								selected={type === "event"}
								onClick={() => setType("event")}
								icon="🎲"
								label="Event"
								color="#457b9d"
								id="phase-type-event"
							/>
						</div>
					</fieldset>

					<footer className="form-actions">
						<button
							type="button"
							onClick={onClose}
							className="secondary-button"
						>
							Cancel
						</button>
						<button type="submit" className={`primary-button ${type}-button`}>
							Start Phase
						</button>
					</footer>
				</form>
			</div>
		</div>
	);
};

interface TypeOptionProps {
	selected: boolean;
	onClick: () => void;
	icon: string;
	label: string;
	color: string;
	id: string;
}

const TypeOption: React.FC<TypeOptionProps> = ({
	selected,
	onClick,
	icon,
	label,
	color,
	id,
}) => {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onClick();
		}
	};

	return (
		<div
			onClick={onClick}
			onKeyDown={handleKeyDown}
			className={`type-option ${selected ? "selected" : ""}`}
			style={{
				borderColor: selected ? color : undefined,
				backgroundColor: selected ? `${color}19` : undefined,
			}}
			role="radio"
			aria-checked={selected}
			tabIndex={0}
			id={id}
		>
			<span className="type-icon" aria-hidden="true">
				{icon}
			</span>
			<span className={`type-label ${selected ? "selected" : ""}`}>
				{label}
			</span>
		</div>
	);
};
