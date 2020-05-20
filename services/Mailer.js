const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    constructor({ subject, recipients}, content ) {
        super();

        //SendGrid setup
        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('lin1257462400@gmail.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body); // helper.Mail's built in function
        this.addClickTracking();
        this.addRecipients(); // use to process the recipients
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    // required sendgrid code
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        // iterate over the recipients
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    // call api request, usually require async function
    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON() // Defined by the mail base class
        });

        const response = await this.sgApi.API(request); // send info to sendgrid
        return response;
    }
}

module.exports = Mailer