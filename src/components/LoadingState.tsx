import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
	message?: string;
	className?: string;
}

export const LoadingState = ({
	message = "Loading...",
	className,
}: LoadingStateProps): React.ReactElement => {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center p-8 text-center",
				className,
			)}
		>
			<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
			<p className="text-muted-foreground mt-4">{message}</p>
		</div>
	);
};
