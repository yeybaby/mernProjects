const validateToken = (req, res, next) => {
    const accessToken = req.cookie[accessToken];
    if(!accessToken) {
        res.send("not authenticated!")
    }
    req.isAuthorized = true;
    res.send("authentication accessed");
    next();
}

module.exports = validateToken;

