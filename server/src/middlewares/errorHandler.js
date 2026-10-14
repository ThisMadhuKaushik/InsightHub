export default function errorHandler(error, req, res, next) {
    console.error("API Error:", error);
    console.error("Error message:", error?.message);
    console.error("Error stack:", error?.stack);

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        message: error.message || "Internal Server Error",
    });
}