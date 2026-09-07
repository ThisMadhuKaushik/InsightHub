-- Indexes for multi-tenant queries and common lookups

-- Users
CREATE INDEX IF NOT EXISTS idx_users_organization
ON users (organization_id);

-- Projects
CREATE INDEX IF NOT EXISTS idx_projects_organization
ON projects (organization_id);

CREATE INDEX IF NOT EXISTS idx_projects_creator
ON projects (created_by);

-- Project members
CREATE INDEX IF NOT EXISTS idx_project_members_user
ON project_members (user_id);

-- Tasks
CREATE INDEX IF NOT EXISTS idx_tasks_project
ON tasks (project_id);

CREATE INDEX IF NOT EXISTS idx_tasks_assigned
ON tasks (assigned_to);

CREATE INDEX IF NOT EXISTS idx_tasks_status
ON tasks (status);

CREATE INDEX IF NOT EXISTS idx_tasks_assigned_status
ON tasks (assigned_to, status);

-- Activity logs
CREATE INDEX IF NOT EXISTS idx_activity_logs_project_created
ON activity_logs (project_id, created_at DESC);

-- Comments
CREATE INDEX IF NOT EXISTS idx_comments_task_created
ON comments (task_id, created_at ASC);