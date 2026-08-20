import pool from "../../config/db.js";

export async function findUserByEmail(email, db = pool) {
    const { rows } = await db.query(
        `
        SELECT *
        FROM users
        WHERE email = $1;
        `,
        [email]
    );

    return rows[0];
}
export async function findUserById(id, db = pool) {

    const { rows } = await db.query(
        `
        SELECT
            id,
            organization_id,
            name,
            email,
            phone,
            role,
            status,
            last_login,
            created_at,
            updated_at
        FROM users
        WHERE id = $1;
        `,
        [id]
    );

    return rows[0];
}
export async function createUser(data, db = pool) {
    const {
        organization_id,
        name,
        email,
        password,
        phone,
        role,
        status
    } = data;

    const { rows } = await db.query(
        `
        INSERT INTO users (
            organization_id,
            name,
            email,
            password,
            phone,
            role,
            status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `,
        [
            organization_id,
            name,
            email,
            password,
            phone,
            role,
            status
        ]
    );

    return rows[0];
}
export async function findUsersByOrganization(
    organizationId,
    db = pool
) {

    const { rows } = await db.query(
        `
        SELECT
            id,
            organization_id,
            name,
            email,
            phone,
            role,
            status,
            last_login,
            created_at,
            updated_at
        FROM users
        WHERE organization_id = $1
        ORDER BY created_at DESC;
        `,
        [organizationId]
    );

    return rows;
}
export async function updateUser(
    id,
    data,
    db = pool
) {
    const {
        name,
        phone,
    } = data;

    const { rows } = await db.query(
        `
        UPDATE users
        SET
            name = COALESCE($1, name),
            phone = COALESCE($2, phone),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING *;
        `,
        [
            name,
            phone,
            id,
        ]
    );

    return rows[0];
}