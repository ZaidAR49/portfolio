import Logger from './helpers/logger-helper.js';

console.log("--- Testing Logger Utility ---\n");

Logger.info("Starting process...", { processId: 12345 });

Logger.success("Database connected successfully", { host: "localhost", port: 5432 });

Logger.warn("Memory usage high", { usage: "85%" });

const largeData = {
    id: 1,
    name: "Test Project",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==... " + "A".repeat(1000),
    details: {
        description: "A".repeat(200) // Long string
    }
};

Logger.info("Received project data", largeData);

Logger.error("Failed to save project", new Error("Database connection lost"));

const specificError = { message: "Validation failed", code: 400 };
Logger.error("Validation error", specificError);

console.log("\n--- End of Test ---");
