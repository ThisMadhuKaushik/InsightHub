export async function findUserByEmail(email) {
    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE email = $1;
        `,
        [email]
    );

    return result.rows[0];
}
export async function findUserById(id) {
    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE id = $1;
        `,
        [id]
    );

    return result.rows[0];
}

export async function createUser(data) {
    const {
        organization_id,
        name,
        email,
        password,
        phone,
        role,
        status
    } = data;


    const result = await pool.query(
        `
        INSERT INTO users (organization_id,
            name,
            email,
            password,
            phone,
            role,
            status)
        VALUES ($1, $2, $3,$4,$5,$6,$7)
        RETURNING *;
        `,
        [organization_id,
        name,
        email,
        password,
        phone,
        role,
        status]
    );

    return result.rows[0];
}