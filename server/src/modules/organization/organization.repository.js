
import pool from "../../config/db.js";

export async function createOrganization(data) {
    const { name, slug, email,status,plan } = data;

    const result = await pool.query(
        `
        INSERT INTO organizations (name, slug, email,status,plan)
        VALUES ($1, $2, $3,$4,$5)
        RETURNING *;
        `,
        [name, slug, email,status,plan]
    );

    return result.rows[0];
}
export async function findOrganizationByEmail(email) {
    const result = await pool.query(
        `
        SELECT *
        FROM organizations
        WHERE email = $1;
        `,
        [email]
    );

    return result.rows[0];
}
export async function findOrganizationBySlug(slug) {

    const result = await pool.query(
        `
        SELECT id
        FROM organizations
        WHERE slug = $1;
        `,
        [slug]
    );

    return result.rows[0];

}