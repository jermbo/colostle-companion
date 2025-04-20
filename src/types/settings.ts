export interface UserSettings {
	id: string;
	theme: "light" | "dark";
	fontSize: number;
	notifications: boolean;
	autoSave: boolean;
	cloudSync: boolean;
	lastSync: Date;
}
