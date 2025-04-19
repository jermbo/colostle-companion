import { useInventory } from "../../context/InventoryContext";
import { Item } from "../../types/inventory";
import Button from "../ui/Button";

interface Props {
	itemId: string;
	onClose: () => void;
}

const ItemDetails = ({ itemId, onClose }: Props) => {
	const { inventory, useItem, equipItem, unequipItem, removeItem } =
		useInventory();

	const item = inventory?.items.find((item) => item.id === itemId);
	if (!item) {
		return null;
	}

	const handleUse = async () => {
		await useItem(itemId);
	};

	const handleEquip = async () => {
		if (item.isEquipped) {
			await unequipItem(itemId);
		} else {
			await equipItem(itemId);
		}
	};

	const handleRemove = async () => {
		await removeItem(itemId);
		onClose();
	};

	return (
		<div className="card__content">
			<div className="card__header">
				<h3 className="card__title">{item.name}</h3>
				<Button variant="text" onClick={onClose}>
					×
				</Button>
			</div>

			<div className="card__content">
				<p>{item.description}</p>

				<div className="card__stats">
					<div className="card__stat">
						<span>Category:</span>
						<span>{item.category}</span>
					</div>
					<div className="card__stat">
						<span>Weight:</span>
						<span>{item.weight}kg</span>
					</div>
					<div className="card__stat">
						<span>Quantity:</span>
						<span>{item.quantity}</span>
					</div>
				</div>

				<div className="card__actions">
					{item.category === "consumable" && (
						<Button variant="primary" onClick={handleUse}>
							Use
						</Button>
					)}
					{(item.category === "weapon" || item.category === "armor") && (
						<Button variant="primary" onClick={handleEquip}>
							{item.isEquipped ? "Unequip" : "Equip"}
						</Button>
					)}
					<Button variant="secondary" onClick={handleRemove}>
						Remove
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ItemDetails;
