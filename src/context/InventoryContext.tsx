import {
	createContext,
	useContext,
	useState,
	useCallback,
	ReactNode,
} from "react";
import { InventoryContextType, Inventory, Item } from "../types/inventory";
import { useCharacterContext } from "./CharacterContext";

const InventoryContext = createContext<InventoryContextType | null>(null);

interface Props {
	children: ReactNode;
}

export const InventoryProvider = ({ children }: Props) => {
	const { characters } = useCharacterContext();
	const currentCharacter = characters[0]; // For now, just use the first character
	const [inventory, setInventory] = useState<Inventory | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const addItem = useCallback(
		async (item: Omit<Item, "id" | "createdAt" | "updatedAt">) => {
			if (!currentCharacter) {
				setError("No character selected");
				return;
			}

			setIsLoading(true);
			try {
				// TODO: Implement actual storage logic
				const newItem: Item = {
					...item,
					id: crypto.randomUUID(),
					createdAt: new Date(),
					updatedAt: new Date(),
				};

				setInventory((prev: Inventory | null) => {
					if (!prev) {
						return {
							id: crypto.randomUUID(),
							characterId: currentCharacter.id,
							items: [newItem],
							capacity: 100,
							currentWeight: newItem.weight * newItem.quantity,
							createdAt: new Date(),
							updatedAt: new Date(),
						};
					}

					const newWeight =
						prev.currentWeight + newItem.weight * newItem.quantity;
					if (newWeight > prev.capacity) {
						throw new Error("Inventory capacity exceeded");
					}

					return {
						...prev,
						items: [...prev.items, newItem],
						currentWeight: newWeight,
						updatedAt: new Date(),
					};
				});
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to add item");
			} finally {
				setIsLoading(false);
			}
		},
		[currentCharacter]
	);

	const removeItem = useCallback(async (itemId: string) => {
		setIsLoading(true);
		try {
			setInventory((prev: Inventory | null) => {
				if (!prev) return null;

				const itemToRemove = prev.items.find(
					(item: Item) => item.id === itemId
				);
				if (!itemToRemove) return prev;

				return {
					...prev,
					items: prev.items.filter((item: Item) => item.id !== itemId),
					currentWeight:
						prev.currentWeight - itemToRemove.weight * itemToRemove.quantity,
					updatedAt: new Date(),
				};
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to remove item");
		} finally {
			setIsLoading(false);
		}
	}, []);

	const updateItem = useCallback(
		async (itemId: string, updates: Partial<Item>) => {
			setIsLoading(true);
			try {
				setInventory((prev: Inventory | null) => {
					if (!prev) return null;

					const itemIndex = prev.items.findIndex(
						(item: Item) => item.id === itemId
					);
					if (itemIndex === -1) return prev;

					const updatedItem = {
						...prev.items[itemIndex],
						...updates,
						updatedAt: new Date(),
					};
					const newItems = [...prev.items];
					newItems[itemIndex] = updatedItem;

					const newWeight = newItems.reduce(
						(total, item) => total + item.weight * item.quantity,
						0
					);
					if (newWeight > prev.capacity) {
						throw new Error("Inventory capacity exceeded");
					}

					return {
						...prev,
						items: newItems,
						currentWeight: newWeight,
						updatedAt: new Date(),
					};
				});
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to update item");
			} finally {
				setIsLoading(false);
			}
		},
		[]
	);

	const useItem = useCallback(async (itemId: string) => {
		setIsLoading(true);
		try {
			setInventory((prev: Inventory | null) => {
				if (!prev) return null;

				const itemIndex = prev.items.findIndex(
					(item: Item) => item.id === itemId
				);
				if (itemIndex === -1) return prev;

				const item = prev.items[itemIndex];
				if (item.quantity <= 0) {
					throw new Error("No items left to use");
				}

				const newItems = [...prev.items];
				newItems[itemIndex] = {
					...item,
					quantity: item.quantity - 1,
					updatedAt: new Date(),
				};

				return {
					...prev,
					items: newItems,
					currentWeight: prev.currentWeight - item.weight,
					updatedAt: new Date(),
				};
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to use item");
		} finally {
			setIsLoading(false);
		}
	}, []);

	const equipItem = useCallback(async (itemId: string) => {
		setIsLoading(true);
		try {
			setInventory((prev: Inventory | null) => {
				if (!prev) return null;

				const itemIndex = prev.items.findIndex(
					(item: Item) => item.id === itemId
				);
				if (itemIndex === -1) return prev;

				const newItems = prev.items.map((item: Item) => ({
					...item,
					isEquipped: item.id === itemId ? true : item.isEquipped,
					updatedAt: new Date(),
				}));

				return {
					...prev,
					items: newItems,
					updatedAt: new Date(),
				};
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to equip item");
		} finally {
			setIsLoading(false);
		}
	}, []);

	const unequipItem = useCallback(async (itemId: string) => {
		setIsLoading(true);
		try {
			setInventory((prev: Inventory | null) => {
				if (!prev) return null;

				const itemIndex = prev.items.findIndex(
					(item: Item) => item.id === itemId
				);
				if (itemIndex === -1) return prev;

				const newItems = prev.items.map((item: Item) => ({
					...item,
					isEquipped: item.id === itemId ? false : item.isEquipped,
					updatedAt: new Date(),
				}));

				return {
					...prev,
					items: newItems,
					updatedAt: new Date(),
				};
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to unequip item");
		} finally {
			setIsLoading(false);
		}
	}, []);

	return (
		<InventoryContext.Provider
			value={{
				inventory,
				addItem,
				removeItem,
				updateItem,
				useItem,
				equipItem,
				unequipItem,
				isLoading,
				error,
			}}
		>
			{children}
		</InventoryContext.Provider>
	);
};

export const useInventory = () => {
	const context = useContext(InventoryContext);
	if (!context) {
		throw new Error("useInventory must be used within an InventoryProvider");
	}
	return context;
};
