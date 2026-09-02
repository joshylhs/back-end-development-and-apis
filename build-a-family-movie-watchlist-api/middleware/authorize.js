export function authorizeModification(req, res, next) {
    const { role, id } = req.user;
    const isParent = role === 'parent';
    const isOwnChild = role === 'child' && Number(id) === Number(req.params.userId);

    if (!isParent && !isOwnChild) {
        return res.status(403).json({ error: "Access denied" });
    }

    next();
}

