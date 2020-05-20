const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

// Users have to login before use the surveys
// check the amount of credits the current user has 
// to make sure they have enough credits to start the survey
// the function requireLogin will users go to the current route
module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting!');
    })

    // these are the order of excuting, first requireLogin then requireCredits
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        // create an instantance of survey
        const survey = new Survey({
            title,
            subject,
            body,
            // split the recipients into array and make it becomes objects
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        try{
            // Send email
            const mailer = new Mailer(survey, surveyTemplate(survey));
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            
            res.send(user); // send back the user model to update the users' model
        } catch (err) {
            res.status(422).send(err);
        }
    });
};