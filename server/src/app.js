import express from "express";
import organizationRoutes from "./modules/organization/organization.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/api/v1/organizations", organizationRoutes);

app.use(errorHandler);
export default app;