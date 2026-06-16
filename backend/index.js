import http from "http";
import dotenv from "dotenv";
import app from "./src/configs/express-config.js";

dotenv.config({ quiet: true });

const appServer = http.createServer(app);

appServer.listen(process.env.PORT, (error) => {
  if (error) {
    console.error("Server failed to start: ", error);
    process.exit(1);
  }
  console.log(`Server started on port ${process.env.PORT}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully.");
  appServer.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
