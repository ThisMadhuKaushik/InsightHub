import pool from "../../config/db.js";

export async function createOrganization(data, db = pool) {
    const { name, slug, email, status, plan } = data;

    const { rows } = await db.query(
        `
        INSERT INTO organizations (
            name,
            slug,
            email,
            status,
            plan
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `,
        [name, slug, email, status, plan]
    );

    return rows[0];
}

export async function findOrganizationByEmail(email, db = pool) {
    const { rows } = await db.query(
        `
        SELECT *
        FROM organizations
        WHERE email = $1;
        `,
        [email]
    );

    return rows[0];
}

export async function findOrganizationBySlug(slug, db = pool) {
    const { rows } = await db.query(
        `
        SELECT id
        FROM organizations
        WHERE slug = $1;
        `,
        [slug]
    );

    return rows[0];
}