// assert the users already logged in before they can user other routeHandlers
module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in' })
    }

    next(); // this means the user already logged in 
}