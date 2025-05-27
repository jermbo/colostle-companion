import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
	message?: string;
	onRetry?: () => void;
	className?: string;
}

export const ErrorState = ({
	message = "An unexpected error occurred",
	onRetry,
	className,
}: ErrorStateProps): React.ReactElement => {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center p-8 text-center",
				className,
			)}
		>
			<AlertCircle className="h-8 w-8 text-red-500" />
			<p className="text-red-500 mt-4 mb-4">{message}</p>
			{onRetry && (
				<Button onClick={onRetry} variant="destructive">
					Try Again
				</Button>
			)}
		</div>
	);
};
