import pool from "../../config/db.js";

export async function createProject(data, db = pool) {

    const {
        organization_id,
        created_by,
        name,
        description,
        status,
        start_date,
        due_date,
    } = data;

    const { rows } = await db.query(
        `
        INSERT INTO projects (
            organization_id,
            created_by,
            name,
            description,
            status,
            start_date,
            due_date
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `,
        [
            organization_id,
            created_by,
            name,
            description,
            status,
            start_date,
            due_date,
        ]
    );

    return rows[0];
}
export async function updateProject(
    id,
    organizationId,
    data,
    db = pool
) {

    const {
        name,
        description,
        status,
        start_date,
        due_date,
    } = data;

    const { rows } = await db.query(
        `
        UPDATE projects
        SET
            name = COALESCE($1, name),
            description = COALESCE($2, description),
            status = COALESCE($3, status),
            start_date = COALESCE($4, start_date),
            due_date = COALESCE($5, due_date),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $6
        AND organization_id = $7
        RETURNING *;
        `,
        [
            name,
            description,
            status,
            start_date,
            due_date,
            id,
            organizationId,
        ]
    );

    return rows[0];
}
export async function findProjectsByOrganization(
    organizationId,
    db = pool
) {

    const { rows } = await db.query(
        `
        SELECT *
        FROM projects
        WHERE organization_id = $1
        ORDER BY created_at DESC;
        `,
        [organizationId]
    );

    return rows;
}
export async function findProjectById(
    id,
    organizationId,
    db = pool
) {

    const { rows } = await db.query(
        `
        SELECT *
        FROM projects
        WHERE id = $1
        AND organization_id = $2;
        `,
        [id, organizationId]
    );

    return rows[0];
}
export async function deleteProject(
    id,
    organizationId,
    db = pool
) {

    const { rows } = await db.query(
        `
        UPDATE projects
        SET
            status = 'ARCHIVED',
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        AND organization_id = $2
        RETURNING *;
        `,
        [id, organizationId]
    );

    return rows[0];
}