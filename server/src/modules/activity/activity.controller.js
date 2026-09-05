import {
getProjectActivities,
} from "./activity.service.js";

export async function getProjectActivitiesController(
req,
res,
next
) {

try {

    const activities = await getProjectActivities(
        req.params.projectId,
        req.user.organization_id
    );

    return res.status(200).json({
        success: true,
        data: activities,
    });

} catch (error) {

    next(error);

}

}