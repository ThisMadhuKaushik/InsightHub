import {
    getUsers,
    getUserById,
    updateUser,
} from "./user.service.js";

export async function getAllUsers(req, res, next) {

    try {

        const users = await getUsers(
            req.user.organization_id
        );

        return res.status(200).json({
            success: true,
            data: users,
        });

    } catch (error) {

        next(error);

    }
}

export async function getSingleUser(req, res, next) {

    try {

        const user = await getUserById(
            req.params.id,
            req.user.organization_id
        );

        return res.status(200).json({
            success: true,
            data: user,
        });

    } catch (error) {

        next(error);

    }
}
export async function updateUserController(req, res, next) {

    try {
        const user = await updateUser(
            req.params.id,
            req.user.organization_id,
            req.user.id,
            req.user.role,
            req.body
        );
        return res.status(200).json({
            success: true,
            data: user,
        });

    } catch (error) {

        next(error);

    }
}