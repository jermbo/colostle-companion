import { EventsRepository } from "../repositories/events.repository";
import { Event } from "../../types/gameData";
import { ApiError } from "../middlewares/error.middleware";

export const EventsService = {
	// Get all events
	async getAllEvents(): Promise<Event[]> {
		try {
			return await EventsRepository.getAll();
		} catch (error: any) {
			throw new ApiError(error.message);
		}
	},

	// Get event by ID
	async getEventById(id: string): Promise<Event> {
		try {
			const event = await EventsRepository.getById(id);

			if (!event) {
				const error = new ApiError(`Event with ID ${id} not found`);
				error.statusCode = 404;
				throw error;
			}

			return event;
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(error.message);
		}
	},

	// Create a new event
	async createEvent(eventData: Event): Promise<Event> {
		try {
			// Check if event with the same ID already exists
			const existingEvent = await EventsRepository.getById(eventData.id);

			if (existingEvent) {
				const error = new ApiError(
					`Event with ID ${eventData.id} already exists`
				);
				error.statusCode = 409; // Conflict
				throw error;
			}

			return await EventsRepository.create(eventData);
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(`Failed to create event: ${error.message}`);
		}
	},

	// Update an existing event
	async updateEvent(id: string, eventData: Partial<Event>): Promise<Event> {
		try {
			const updatedEvent = await EventsRepository.update(id, eventData);

			if (!updatedEvent) {
				const error = new ApiError(`Event with ID ${id} not found`);
				error.statusCode = 404;
				throw error;
			}

			return updatedEvent;
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(`Failed to update event: ${error.message}`);
		}
	},

	// Delete an event
	async deleteEvent(id: string): Promise<void> {
		try {
			const deleted = await EventsRepository.delete(id);

			if (!deleted) {
				const error = new ApiError(`Event with ID ${id} not found`);
				error.statusCode = 404;
				throw error;
			}
		} catch (error: any) {
			if (error instanceof ApiError) {
				throw error;
			}

			throw new ApiError(`Failed to delete event: ${error.message}`);
		}
	},

	// Batch import events (used for initial data seeding)
	async importEvents(events: Event[]): Promise<number> {
		try {
			return await EventsRepository.batchInsert(events);
		} catch (error: any) {
			throw new ApiError(`Failed to import events: ${error.message}`);
		}
	},
};
