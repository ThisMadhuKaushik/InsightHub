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
export async function updateTask(
    taskId,
    projectId,
    data,
    db = pool
) {
    const {
        title,
        description,
        assigned_to,
        priority,
        status,
        start_date,
        due_date,
        completed_at,
    } = data;

    const { rows } = await db.query(
        `
        UPDATE tasks
        SET
            title = COALESCE($1, title),
            description = COALESCE($2, description),
            assigned_to = COALESCE($3, assigned_to),
            priority = COALESCE($4, priority),
            status = COALESCE($5, status),
            start_date = COALESCE($6, start_date),
            due_date = COALESCE($7, due_date),
            completed_at = COALESCE($8, completed_at),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $9
        AND project_id = $10
        RETURNING *;
        `,
        [
            title,
            description,
            assigned_to,
            priority,
            status,
            start_date,
            due_date,
            completed_at,
            taskId,
            projectId,
        ]
    );

    return rows[0];
}