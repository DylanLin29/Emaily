
module.exports = (req, res, next) => {
    if (req.user.credits < 1) {
        // there are multiple status code can be used, not only 401
        return res.status(403).send({ error: 'Not enough credits!' })
    }

    next(); // this means the user has enough credits
}