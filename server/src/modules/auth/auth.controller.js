import { register,login } from "./auth.service.js";

export async function registerUser(req, res, next) {
    try {

        const user = await register(req.body);

        return res.status(201).json({
            success: true,
            data: user,
        });

    } catch (error) {

        next(error);

    }
}
export async function loginUser(req, res, next) {
    try {
        const loginData = await login(req.body);
        return res.status(200).json({
            success: true,
            data: loginData,
        });
    } catch (error) {
        next(error);
    }
}