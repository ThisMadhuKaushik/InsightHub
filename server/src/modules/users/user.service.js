
import {
    findUsersByOrganization,
    findUserById,
    updateUser as updateUserRepository,
} from "./user.repository.js";

import AppError from "../../errors/AppError.js";
import { updateUserSchema } from "./user.validation.js";
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
export async function updateUser(
    userId,
    organizationId,
    requesterId,
    requesterRole,
    data
) {
    // Validate input
    updateUserSchema.parse(data);

    // Check user exists
    const user = await findUserById(userId);

    if (!user) {
        throw new AppError(
            "User not found.",
            404
        );
    }

    // Tenant isolation
    if (user.organization_id !== organizationId) {
        throw new AppError(
            "User not found.",
            404
        );
    }
    if (
    requesterId !== userId &&
    requesterRole !== "OWNER" &&
    requesterRole !== "ADMIN"
) {
    throw new AppError(
        "You do not have permission to update this user.",
        403
    );
}

    // Update user
    const updatedUser = await updateUserRepository(
        userId,
        data
    );

    // Never return password
    const {
        password: _,
        ...userWithoutPassword
    } = updatedUser;

    return userWithoutPassword;
}

