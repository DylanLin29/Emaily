const passport = require('passport');
module.exports = (app) => {
    // when user goes to this link, need to be authenticated
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    )

    // already got the user code from the users, don't have to authenticate like above
    app.get(
        '/auth/google/callback',
        passport.authenticate('google')
    )

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user)
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })
}