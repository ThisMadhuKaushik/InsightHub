
import {
    createProject as createProjectRepository,
    findProjectsByOrganization,
    findProjectById,
    updateProject as updateProjectRepository,
    deleteProject as deleteProjectRepository,
} from "./project.repository.js";

import {
    createProjectSchema,
    updateProjectSchema
} from "./project.validation.js";

import AppError from "../../errors/AppError.js";


export async function createProject(data) {

    createProjectSchema.parse(data);

    const projectData = {
        organization_id: data.organization_id,
        created_by: data.created_by,
        name: data.name,
        description: data.description,
        status: data.status || "PLANNING",
        start_date: data.start_date,
        due_date: data.due_date,
    };

    return await createProjectRepository(projectData);
}

export async function updateProject(
    id,
    organizationId,
    data
) {

    updateProjectSchema.parse(data);

    const project = await updateProjectRepository(
        id,
        organizationId,
        data
    );

    if (!project) {
        throw new AppError(
            "Project not found.",
            404
        );
    }

    return project;
}

export async function getProjects(organizationId) {

    return await findProjectsByOrganization(
        organizationId
    );
}


export async function getProjectById(
    id,
    organizationId
) {

    const project = await findProjectById(
        id,
        organizationId
    );

    if (!project) {
        throw new AppError(
            "Project not found.",
            404
        );
    }

    return project;
}
export async function deleteProject(
    id,
    organizationId
) {

    const project = await deleteProjectRepository(
        id,
        organizationId
    );

    if (!project) {
        throw new AppError(
            "Project not found.",
            404
        );
    }

    return project;
}