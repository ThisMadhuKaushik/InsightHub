import pool from "../../config/db.js";


// CREATE TASK
export async function createTask(data, db = pool) {

    const {
        project_id,
        parent_task_id,
        assigned_to,
        title,
        description,
        priority,
        status,
        start_date,
        due_date,
    } = data;

    const { rows } = await db.query(
        `
        INSERT INTO tasks (
            project_id,
            parent_task_id,
            assigned_to,
            title,
            description,
            priority,
            status,
            start_date,
            due_date
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
        `,
        [
            project_id,
            parent_task_id,
            assigned_to,
            title,
            description,
            priority,
            status,
            start_date,
            due_date,
        ]
    );

    return rows[0];
}


// GET ALL TASKS OF A PROJECT
export async function findTasksByProject(
    projectId,
    db = pool
) {

    const { rows } = await db.query(
        `
        SELECT
            t.*,
            u.name AS assigned_user_name,
            u.email AS assigned_user_email
        FROM tasks t
        LEFT JOIN users u
            ON u.id = t.assigned_to
        WHERE t.project_id = $1
        ORDER BY t.created_at DESC;
        `,
        [projectId]
    );

    return rows;
}


// GET ONE TASK
export async function findTaskById(
    taskId,
    projectId,
    db = pool
) {

    const { rows } = await db.query(
        `
        SELECT
            t.*,
            u.name AS assigned_user_name,
            u.email AS assigned_user_email
        FROM tasks t
        LEFT JOIN users u
            ON u.id = t.assigned_to
        WHERE t.id = $1
        AND t.project_id = $2;
        `,
        [taskId, projectId]
    );

    return rows[0];
}