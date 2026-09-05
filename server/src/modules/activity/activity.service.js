import {
createActivityLog,
findActivitiesByProject,
} from "./activity.repository.js";

import { findProjectById } from "../projects/project.repository.js";

import AppError from "../../errors/AppError.js";

export async function logActivity(data, db) {

    console.log("🔥 ACTIVITY LOG CALLED:", data);
return await createActivityLog(
    data,
    db
);

}

export async function getProjectActivities(
projectId,
organizationId
) {

// Check project belongs to organization
const project = await findProjectById(
    projectId,
    organizationId
);

if (!project) {
    throw new AppError(
        "Project not found.",
        404
    );
}

return await findActivitiesByProject(
    projectId,
    organizationId
);

}