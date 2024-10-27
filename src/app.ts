import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { errorHandler } from "./common/middleware/errorHandler";
import userRoutes from "./routes/user.route";
import { scheduleBirthdayMessages } from "./scheduler";

const app = express();
dotenv.config();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use("/api/users", userRoutes);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SDT-Test API Documentation",
      version: "1.0.0",
      description: "API documentation for the SDT-Test project",
    },
  },
  apis: ["./src/docs/*.yml"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

scheduleBirthdayMessages();

export default app;
