import {
    addProjectMember,
    findProjectMembers,
    removeProjectMember,
} from "./projectMember.repository.js";

import AppError from "../../errors/AppError.js";

import { findProjectById } from "../projects/project.repository.js";

import { findUserById } from "../users/user.repository.js";


export async function addMember(
    projectId,
    userId,
    organizationId
) {

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

    const user = await findUserById(userId);

    if (
        !user ||
        user.organization_id !== organizationId
    ) {
        throw new AppError(
            "User not found.",
            404
        );
    }

    return await addProjectMember(
        projectId,
        userId
    );
}


export async function getMembers(
    projectId,
    organizationId
) {

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

    return await findProjectMembers(projectId);
}


export async function removeMember(
    projectId,
    userId,
    organizationId
) {

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

    const member = await removeProjectMember(
        projectId,
        userId
    );

    if (!member) {
        throw new AppError(
            "Project member not found.",
            404
        );
    }

    return member;
}