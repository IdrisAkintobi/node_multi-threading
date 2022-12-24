import app from "./app";
import db from "./db/connectDB";
import logger from "./utils/logger";
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await db.sync({ alter: true });
    logger.info("🔌 Database connected successfully.");
    app.listen(PORT, () =>
      logger.info(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    logger.error("❌ Error occurred:", error);
    process.exit(1);
  }
};

// Start the server
startServer();
