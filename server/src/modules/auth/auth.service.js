import jwt from "jsonwebtoken";

import pool from "../../config/db.js";

import bcrypt from "bcrypt";

import AppError from "../../errors/AppError.js";

import { registerSchema ,loginSchema} from "./auth.validation.js";

import { createOrganization } from "../organization/organization.service.js";

import {
    findUserByEmail,
    createUser,
} from "../users/user.repository.js";

export async function register(data) {

    registerSchema.parse(data);

    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        const {
            organizationName,
            organizationEmail,
            name,
            email,
            password,
            phone,
        } = data;

        const existingUser = await findUserByEmail(email, client);

        if (existingUser) {
            throw new AppError("User email already exists.", 409);
        }

        const organization = await createOrganization(
            {
                name: organizationName,
                email: organizationEmail,
            },
            client
        );

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser(
            {
                organization_id: organization.id,
                name,
                email,
                password: hashedPassword,
                phone,
                role: "OWNER",
                status: "ACTIVE",
            },
            client
        );
        const { password: _, ...userWithoutPassword } = user;
        await client.query("COMMIT");

        return userWithoutPassword;

    } catch (error) {

        await client.query("ROLLBACK");

        throw error;

    } finally {

        client.release();

    }
}
export async function login(data) {

    loginSchema.parse(data);

    const { email, password } = data;

    const user = await findUserByEmail(email);

    if (!user) {
        throw new AppError(
            "Invalid email or password.",
            401
        );
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new AppError(
            "Invalid email or password.",
            401
        );
    }

    const token = jwt.sign(
        {
            id: user.id,
            organization_id: user.organization_id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );

    const { password: _, ...userWithoutPassword } = user;

    return {
        token,
        user: userWithoutPassword,
    };
}