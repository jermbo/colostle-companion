import supertest from "supertest";
import app from "../index.js";
import { ItemsService } from "../services/items.service.js";
import { Item } from "../../types/gameData.js";

const request = supertest(app);

// Mock the ItemsService
jest.mock("../services/items.service.js", () => ({
	ItemsService: {
		getAllItems: jest.fn(),
		getItemById: jest.fn(),
		createItem: jest.fn(),
		updateItem: jest.fn(),
		deleteItem: jest.fn(),
	},
}));

describe("Items API", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	const mockItem: Item = {
		id: "ace",
		name: "Treasure",
		description: "For trading",
	};

	describe("GET /api/items", () => {
		it("should return all items", async () => {
			// Setup mock
			(ItemsService.getAllItems as jest.Mock).mockResolvedValue([mockItem]);

			// Make request
			const response = await request.get("/api/items");

			// Assertions
			expect(response.status).toBe(200);
			expect(response.body.status).toBe("success");
			expect(response.body.data).toHaveLength(1);
			expect(response.body.data[0]).toEqual(mockItem);
			expect(ItemsService.getAllItems).toHaveBeenCalledTimes(1);
		});
	});

	describe("GET /api/items/:id", () => {
		it("should return a single item", async () => {
			// Setup mock
			(ItemsService.getItemById as jest.Mock).mockResolvedValue(mockItem);

			// Make request
			const response = await request.get("/api/items/ace");

			// Assertions
			expect(response.status).toBe(200);
			expect(response.body.status).toBe("success");
			expect(response.body.data).toEqual(mockItem);
			expect(ItemsService.getItemById).toHaveBeenCalledWith("ace");
		});

		it("should return 404 if item is not found", async () => {
			// Setup mock to throw an error
			const error = new Error("Item not found");
			(error as any).statusCode = 404;
			(ItemsService.getItemById as jest.Mock).mockRejectedValue(error);

			// Make request
			const response = await request.get("/api/items/nonexistent");

			// Assertions
			expect(response.status).toBe(404);
			expect(response.body.status).toBe("error");
		});
	});

	describe("POST /api/items", () => {
		it("should create a new item", async () => {
			// Setup mock
			(ItemsService.createItem as jest.Mock).mockResolvedValue(mockItem);

			// Make request
			const response = await request.post("/api/items").send(mockItem);

			// Assertions
			expect(response.status).toBe(201);
			expect(response.body.status).toBe("success");
			expect(response.body.data).toEqual(mockItem);
			expect(ItemsService.createItem).toHaveBeenCalledWith(mockItem);
		});
	});

	describe("PUT /api/items/:id", () => {
		it("should update an existing item", async () => {
			// Setup mock
			const updatedItem = { ...mockItem, name: "Updated Treasure" };
			(ItemsService.updateItem as jest.Mock).mockResolvedValue(updatedItem);

			// Make request
			const response = await request
				.put("/api/items/ace")
				.send({ name: "Updated Treasure" });

			// Assertions
			expect(response.status).toBe(200);
			expect(response.body.status).toBe("success");
			expect(response.body.data).toEqual(updatedItem);
			expect(ItemsService.updateItem).toHaveBeenCalledWith("ace", {
				name: "Updated Treasure",
			});
		});
	});

	describe("DELETE /api/items/:id", () => {
		it("should delete an item", async () => {
			// Setup mock
			(ItemsService.deleteItem as jest.Mock).mockResolvedValue(undefined);

			// Make request
			const response = await request.delete("/api/items/ace");

			// Assertions
			expect(response.status).toBe(200);
			expect(response.body.status).toBe("success");
			expect(response.body.message).toBe("Item deleted successfully");
			expect(ItemsService.deleteItem).toHaveBeenCalledWith("ace");
		});
	});
});
