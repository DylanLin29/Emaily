const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser'); // express middleware
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport'); // because nothing is exported in the passport.js
// const authRoutes = require('./routes/authRoutes');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json()); // POST, PUT, PATCH request comes into the body, this middleware will assign
                            // to req.body
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // How long the cookie exists (last 30 days)
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Setup route handlers
// authRoutes(app);
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app); // returns a function that takes the app as parameter
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will server up production assets
    // like our main.js file, or main.css file
    app.use(express.static('client/build'));

    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}

const PORT = process.env.PORT || 5000; // The prior statement will be called if there app is running on Heroku
app.listen(PORT);