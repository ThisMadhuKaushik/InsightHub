import {
    findUsersByOrganization,
    findUserById,
} from "./user.repository.js";

import AppError from "../../errors/AppError.js";

export async function getUsers(organizationId) {

    return await findUsersByOrganization(organizationId);

}

export async function getUserById(id, organizationId) {

    const user = await findUserById(id);

    if (!user) {
        throw new AppError(
            "User not found.",
            404
        );
    }

    if (user.organization_id !== organizationId) {
        throw new AppError(
            "User not found.",
            404
        );
    }

    return user;
}