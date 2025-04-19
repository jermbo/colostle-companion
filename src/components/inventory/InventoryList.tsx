import { ReactElement, useState } from "react";
import { useInventory } from "../../context/InventoryContext";
import { ItemCategory } from "../../types/inventory";
import AddItemForm from "./AddItemForm";
import ItemDetails from "./ItemDetails";
import Card from "../ui/Card";
import Button from "../ui/Button";

const InventoryList = (): ReactElement => {
	const { inventory, isLoading, error } = useInventory();
	const [isAddingItem, setIsAddingItem] = useState(false);
	const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

	if (isLoading) {
		return <Card>Loading inventory...</Card>;
	}

	if (error) {
		return <Card className="card--error">{error}</Card>;
	}

	if (!inventory || inventory.items.length === 0) {
		return (
			<>
				<div className="action-bar">
					<Button variant="primary" onClick={() => setIsAddingItem(true)}>
						Add Item
					</Button>
				</div>
				<Card>
					<p>Your inventory is empty</p>
				</Card>
			</>
		);
	}

	const itemsByCategory = inventory.items.reduce((acc, item) => {
		if (!acc[item.category]) {
			acc[item.category] = [];
		}
		acc[item.category].push(item);
		return acc;
	}, {} as Record<ItemCategory, typeof inventory.items>);

	return (
		<>
			<div className="action-bar">
				<Button variant="primary" onClick={() => setIsAddingItem(true)}>
					Add Item
				</Button>
				<div className="action-bar__stats">
					<span>
						Weight: {inventory.currentWeight}/{inventory.capacity}
					</span>
				</div>
			</div>

			<div className="grid grid--2-cols">
				{Object.entries(itemsByCategory).map(([category, items]) => (
					<Card key={category}>
						<div className="card__header">
							<h3 className="card__title">{category}</h3>
						</div>
						<div className="card__content">
							{items.map((item) => (
								<div
									key={item.id}
									className={`card__item ${
										item.isEquipped ? "card__item--equipped" : ""
									}`}
									onClick={() => setSelectedItemId(item.id)}
								>
									<div>{item.name}</div>
									<div>
										<span>x{item.quantity}</span>
										<span>{item.weight}kg</span>
									</div>
								</div>
							))}
						</div>
					</Card>
				))}
			</div>

			{isAddingItem && (
				<Card>
					<AddItemForm onClose={() => setIsAddingItem(false)} />
				</Card>
			)}

			{selectedItemId && (
				<Card>
					<ItemDetails
						itemId={selectedItemId}
						onClose={() => setSelectedItemId(null)}
					/>
				</Card>
			)}
		</>
	);
};

export default InventoryList;
