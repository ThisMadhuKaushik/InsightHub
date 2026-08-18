import { Router } from "express";
import { registerUser, loginUser } from "./auth.controller.js";
import authenticate from "../../middlewares/authenticate.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", authenticate, (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
    });
});

export default router;