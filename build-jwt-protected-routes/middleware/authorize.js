export default function authorize(role) {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            res.status(403).json({ message: "Access denied" });
        } else {
            next();
        }
    }
}