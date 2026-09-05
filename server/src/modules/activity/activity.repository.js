import pool from "../../config/db.js";

export async function createActivityLog(data,db = pool)
{
    const {
        organization_id,
        user_id,
        project_id,
        task_id,
        action,
        entity_type,
        entity_id,
        metadata,
    } = data;

    const { rows } = await db.query(
        `
        INSERT INTO activity_logs (
            organization_id,
            user_id,
            project_id,
            task_id,
            action,
            entity_type,
            entity_id,
            metadata
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
        `,
        [
            organization_id,
            user_id,
            project_id,
            task_id,
            action,
            entity_type,
            entity_id,
            metadata,
        ]
    );

    return rows[0];
}

export async function findActivitiesByProject(projectId,organizationId,db = pool) 
{
    const { rows } = await db.query(
    `
        SELECT
            al.id,
            al.organization_id,
            al.user_id,
            al.project_id,
            al.task_id,
            al.action,
            al.entity_type,
            al.entity_id,
            al.metadata,
            al.created_at,
            u.name AS user_name,
            u.email AS user_email
        FROM activity_logs al
        LEFT JOIN users u
            ON u.id = al.user_id
        WHERE al.project_id = $1
        AND al.organization_id = $2
        ORDER BY al.created_at DESC;
        `,
        [projectId, organizationId]
    );

    return rows;
}