import express from "express";
import { createOrganization } from "./organization.controller.js";

const router = express.Router();

router.post("/", createOrganization);

export default router;