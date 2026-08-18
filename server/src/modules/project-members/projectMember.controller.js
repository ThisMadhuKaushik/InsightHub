import {
    addMember,
    getMembers,
    removeMember,
} from "./projectMember.service.js";


export async function addMemberController(req, res, next) {

    try {

        const member = await addMember(
            req.params.projectId,
            req.body.user_id,
            req.user.organization_id
        );

        return res.status(201).json({
            success: true,
            data: member,
        });

    } catch (error) {

        next(error);

    }
}


export async function getMembersController(req, res, next) {

    try {

        const members = await getMembers(
            req.params.projectId,
            req.user.organization_id
        );

        return res.status(200).json({
            success: true,
            data: members,
        });

    } catch (error) {

        next(error);

    }
}


export async function removeMemberController(req, res, next) {

    try {

        const member = await removeMember(
            req.params.projectId,
            req.params.userId,
            req.user.organization_id
        );

        return res.status(200).json({
            success: true,
            data: member,
        });

    } catch (error) {

        next(error);

    }
}