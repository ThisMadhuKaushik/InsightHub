import "dotenv/config";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

console.log("DATABASE_URL exists:", Boolean(databaseUrl));

if (databaseUrl) {
    try {
        const parsedUrl = new URL(databaseUrl);
        console.log("Database host:", parsedUrl.hostname);
        console.log("Database name:", parsedUrl.pathname.slice(1));
    } catch {
        console.error("DATABASE_URL is not a valid URL");
    }
}

const pool = new Pool({
    connectionString: databaseUrl,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.on("connect", () => {
    console.log("Connected to Neon PostgreSQL");
});

pool.on("error", (err) => {
    console.error("Unexpected database pool error:", err.message);
});

export default pool;