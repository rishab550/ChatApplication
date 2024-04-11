import app from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { server } from "./socket/socket.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error:", error);
    });

    server.listen(process.env.PORT || 5000, () => {
      console.log(`Server is Running at Port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Error: ", error);
  });
