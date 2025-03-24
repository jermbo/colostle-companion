import {
	Item,
	Location,
	Encounter,
	OceanEncounter,
	Weather,
	CityAmenity,
	Event,
} from "../types/gameData";

const API_URL = "/api";

// Generic API response type
interface ApiResponse<T> {
	status: "success" | "error";
	data?: T;
	message?: string;
	statusCode?: number;
}

// Generic API client helper
async function fetchApi<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<T> {
	const headers = {
		"Content-Type": "application/json",
		...options.headers,
	};

	const response = await fetch(`${API_URL}${endpoint}`, {
		...options,
		headers,
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || `API Error: ${response.status}`);
	}

	return data.data;
}

// Items API
export const ItemsApi = {
	getAll: (): Promise<Item[]> => fetchApi<Item[]>("/items"),

	getById: (id: string): Promise<Item> => fetchApi<Item>(`/items/${id}`),

	create: (item: Item): Promise<Item> =>
		fetchApi<Item>("/items", {
			method: "POST",
			body: JSON.stringify(item),
		}),

	update: (id: string, item: Partial<Item>): Promise<Item> =>
		fetchApi<Item>(`/items/${id}`, {
			method: "PUT",
			body: JSON.stringify(item),
		}),

	delete: (id: string): Promise<void> =>
		fetchApi<void>(`/items/${id}`, {
			method: "DELETE",
		}),
};

// Locations API
export const LocationsApi = {
	getAll: (): Promise<Location[]> => fetchApi<Location[]>("/locations"),

	getById: (id: string): Promise<Location> =>
		fetchApi<Location>(`/locations/${id}`),
	// Add other location API methods as needed
};

// Encounters API
export const EncountersApi = {
	getAll: (): Promise<Encounter[]> => fetchApi<Encounter[]>("/encounters"),

	getById: (id: string): Promise<Encounter> =>
		fetchApi<Encounter>(`/encounters/${id}`),
	// Add other encounter API methods as needed
};

// Ocean Encounters API
export const OceanEncountersApi = {
	getAll: (): Promise<OceanEncounter[]> =>
		fetchApi<OceanEncounter[]>("/ocean-encounters"),

	getById: (id: string): Promise<OceanEncounter> =>
		fetchApi<OceanEncounter>(`/ocean-encounters/${id}`),
	// Add other ocean encounter API methods as needed
};

// Weather API
export const WeatherApi = {
	getAll: (): Promise<Weather[]> => fetchApi<Weather[]>("/weather"),

	getById: (id: string): Promise<Weather> =>
		fetchApi<Weather>(`/weather/${id}`),
	// Add other weather API methods as needed
};

// City Amenities API
export const CityAmenitiesApi = {
	getAll: (): Promise<CityAmenity[]> =>
		fetchApi<CityAmenity[]>("/city-amenities"),

	getById: (id: string): Promise<CityAmenity> =>
		fetchApi<CityAmenity>(`/city-amenities/${id}`),
	// Add other city amenity API methods as needed
};

// Events API
export const EventsApi = {
	getAll: (): Promise<Event[]> => fetchApi<Event[]>("/events"),

	getById: (id: string): Promise<Event> => fetchApi<Event>(`/events/${id}`),
	// Add other event API methods as needed
};
