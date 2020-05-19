const mongoose = require('mongoose');
const { Schema } = mongoose; // equivalent to: const Schema = mongoose.Schema

// mongoose user schema
const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema); // the mongo collection we want to create
