import jwt from "jsonwebtoken";

export default function authenticate(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({
      success: false,
      message: "Authentication token is required.",
    });
  }

  const parts = authorizationHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({
      success: false,
      message: "Invalid authentication token format.",
    });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
}
