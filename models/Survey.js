const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient'); // import the RecipientSchema as a subDocument of surveySchema

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }, // associate the survey with a particular user
                                                        // _ is not required, but it's a convention
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);