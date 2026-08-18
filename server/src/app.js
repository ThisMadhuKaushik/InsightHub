import express from "express";

import organizationRoutes from "./modules/organization/organization.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import projectRoutes from "./modules/projects/project.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import projectMemberRoutes from "./modules/project-members/projectMember.routes.js";
import taskRoutes from "./modules/tasks/task.routes.js";
const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/organizations", organizationRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/projects",projectMemberRoutes);
app.use("/api/v1/projects", taskRoutes);
app.use(errorHandler);

export default app;