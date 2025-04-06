import { ReactElement } from "react";
import Grid from "../components/layout/Grid";

const Settings = (): ReactElement => {
	return (
		<div className="settings">
			<h2>Settings</h2>
			<p>Customize your Colostle Companion experience.</p>

			<Grid columns={1} gap="md">
				<div className="settings__section">
					<h3>Appearance</h3>
					<div className="settings__option">
						<label htmlFor="theme">Theme</label>
						<select id="theme" className="settings__select">
							<option value="light">Light</option>
							<option value="dark">Dark</option>
							<option value="system">System</option>
						</select>
					</div>

					<div className="settings__option">
						<label htmlFor="font-size">Font Size</label>
						<select id="font-size" className="settings__select">
							<option value="small">Small</option>
							<option value="medium">Medium</option>
							<option value="large">Large</option>
						</select>
					</div>
				</div>

				<div className="settings__section">
					<h3>Notifications</h3>
					<div className="settings__option">
						<label htmlFor="notifications">Enable Notifications</label>
						<input
							type="checkbox"
							id="notifications"
							className="settings__checkbox"
						/>
					</div>

					<div className="settings__option">
						<label htmlFor="reminders">Session Reminders</label>
						<input
							type="checkbox"
							id="reminders"
							className="settings__checkbox"
						/>
					</div>
				</div>

				<div className="settings__section">
					<h3>Data Management</h3>
					<div className="settings__option">
						<button className="settings__button">Export Data</button>
					</div>

					<div className="settings__option">
						<button className="settings__button">Import Data</button>
					</div>

					<div className="settings__option">
						<button className="settings__button settings__button--danger">
							Clear All Data
						</button>
					</div>
				</div>
			</Grid>
		</div>
	);
};

export default Settings;
