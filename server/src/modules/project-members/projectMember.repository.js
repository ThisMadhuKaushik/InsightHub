import pool from "../../config/db.js";

export async function addProjectMember(
    projectId,
    userId,
    role = "MEMBER",
    db = pool
) {
    const { rows } = await db.query(
        `
        INSERT INTO project_members (
            project_id,
            user_id,
            role
        )
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
        [projectId, userId, role]
    );

    return rows[0];
}


export async function findProjectMembers(
    projectId,
    db = pool
) {
    const { rows } = await db.query(
        `
        SELECT
            pm.project_id,
            pm.user_id,
            pm.role,
            pm.joined_at,
            u.name,
            u.email
        FROM project_members pm
        JOIN users u
            ON u.id = pm.user_id
        WHERE pm.project_id = $1
        ORDER BY pm.joined_at ASC;
        `,
        [projectId]
    );

    return rows;
}


export async function removeProjectMember(
    projectId,
    userId,
    db = pool
) {
    const { rows } = await db.query(
        `
        DELETE FROM project_members
        WHERE project_id = $1
        AND user_id = $2
        RETURNING *;
        `,
        [projectId, userId]
    );

    return rows[0];
}