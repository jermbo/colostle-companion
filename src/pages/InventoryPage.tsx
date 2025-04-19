import { ReactElement } from "react";
import { InventoryProvider } from "../context/InventoryContext";
import InventoryList from "../components/inventory/InventoryList";

const InventoryPage = (): ReactElement => {
	return (
		<InventoryProvider>
			<div className="page inventory">
				<div className="page__header">
					<h1 className="page__title">Inventory</h1>
					<p className="page__description">
						Manage your character's items and equipment.
					</p>
				</div>

				<InventoryList />
			</div>
		</InventoryProvider>
	);
};

export default InventoryPage;
