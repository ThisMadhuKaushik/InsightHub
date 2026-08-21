import pool from "../../config/db.js";


export async function createComment(
    data,
    db = pool
) {

    const {
        task_id,
        user_id,
        content,
    } = data;

    const { rows } = await db.query(
        `
        INSERT INTO comments (
            task_id,
            user_id,
            content
        )
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
        [
            task_id,
            user_id,
            content,
        ]
    );

    return rows[0];
}

export async function findCommentsByTask(
    taskId,
    db = pool
) {

    const { rows } = await db.query(
        `
        SELECT
            c.id,
            c.task_id,
            c.user_id,
            c.content,
            c.created_at,
            c.updated_at,
            u.name AS user_name,
            u.email AS user_email
        FROM comments c
        JOIN users u
            ON u.id = c.user_id
        WHERE c.task_id = $1
        ORDER BY c.created_at ASC;
        `,
        [taskId]
    );

    return rows;
}
export async function updateComment(
    commentId,
    userId,
    content,
    db = pool
) {
    const { rows } = await db.query(
        `
        UPDATE comments
        SET
            content = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        AND user_id = $3
        RETURNING *;
        `,
        [content, commentId, userId]
    );

    return rows[0];
}
export async function deleteComment(
    commentId,
    userId,
    db = pool
) {
    const { rows } = await db.query(
        `
        DELETE FROM comments
        WHERE id = $1
        AND user_id = $2
        RETURNING *;
        `,
        [commentId, userId]
    );

    return rows[0];
}