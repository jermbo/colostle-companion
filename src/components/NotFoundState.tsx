import { SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotFoundStateProps {
	message?: string;
	className?: string;
}

export const NotFoundState = ({
	message = "The requested resource could not be found",
	className,
}: NotFoundStateProps): React.ReactElement => {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center p-8 text-center",
				className,
			)}
		>
			<SearchX className="h-8 w-8 text-muted-foreground" />
			<p className="text-muted-foreground mt-4">{message}</p>
		</div>
	);
};
