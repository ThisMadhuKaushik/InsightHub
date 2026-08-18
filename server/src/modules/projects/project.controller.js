
import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
} from "./project.service.js";

export async function createProjectController(req, res, next) {

    try {

        const project = await createProject({
            ...req.body,
            organization_id: req.user.organization_id,
            created_by: req.user.id,
        });

        return res.status(201).json({
            success: true,
            data: project,
        });

    } catch (error) {

        next(error);

    }
}
export async function updateProjectController(
    req,
    res,
    next
) {

    try {

        const project = await updateProject(
            req.params.id,
            req.user.organization_id,
            req.body
        );

        return res.status(200).json({
            success: true,
            data: project,
        });

    } catch (error) {

        next(error);

    }
}

export async function getProjectsController(req, res, next) {

    try {

        const projects = await getProjects(
            req.user.organization_id
        );

        return res.status(200).json({
            success: true,
            data: projects,
        });

    } catch (error) {

        next(error);

    }
}


export async function getProjectByIdController(req, res, next) {

    try {

        const project = await getProjectById(
            req.params.id,
            req.user.organization_id
        );

        return res.status(200).json({
            success: true,
            data: project,
        });

    } catch (error) {

        next(error);

    }
}
export async function deleteProjectController(
    req,
    res,
    next
) {

    try {

        const project = await deleteProject(
            req.params.id,
            req.user.organization_id
        );

        return res.status(200).json({
            success: true,
            data: project,
        });

    } catch (error) {

        next(error);

    }
}