import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        // return res.status(401).json({ message: "Access Denied: No Token Provided" });
        res.redirect("/login");
    }
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(401).json({message: "Invalid Token"});
    }
};
