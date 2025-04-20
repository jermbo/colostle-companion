import { useRef, useEffect } from "react";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: Props) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (isOpen) {
			dialogRef.current?.showModal();
		} else {
			dialogRef.current?.close();
		}
	}, [isOpen]);

	return (
		<dialog
			ref={dialogRef}
			className="bg-base-200 fixed top-1/2 left-1/2 m-0 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg"
		>
			<div className="relative p-6">
				<button onClick={onClose} className="text-base-content/60 hover:text-base-content absolute top-4 right-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
				{title && <h3 className="mb-4 pr-8 text-lg font-bold">{title}</h3>}
				{children}
			</div>
		</dialog>
	);
};
