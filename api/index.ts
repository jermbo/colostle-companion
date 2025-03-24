import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

// Routes
import itemsRouter from "./routes/items.routes";
import locationsRouter from "./routes/locations.routes";
import encountersRouter from "./routes/encounters.routes";
import eventsRouter from "./routes/events.routes";
import oceanEncountersRouter from "./routes/oceanEncounters.routes";
import weatherRouter from "./routes/weather.routes";
import cityAmenitiesRouter from "./routes/cityAmenities.routes";

// Middlewares
import { errorHandler } from "./middlewares/error.middleware";
import { notFoundHandler } from "./middlewares/notFound.middleware";
import { requestLogger } from "./middlewares/logger.middleware";

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(requestLogger);

// Load Swagger document
const swaggerDocument = YAML.load(
	path.join(__dirname, "./config/swagger.yaml")
);

// API routes
app.use("/api/items", itemsRouter);
app.use("/api/locations", locationsRouter);
app.use("/api/encounters", encountersRouter);
app.use("/api/events", eventsRouter);
app.use("/api/ocean-encounters", oceanEncountersRouter);
app.use("/api/weather", weatherRouter);
app.use("/api/city-amenities", cityAmenitiesRouter);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check endpoint
app.get("/health", (_req, res) => {
	res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Error handling middlewares
app.use(notFoundHandler);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

export default app;
