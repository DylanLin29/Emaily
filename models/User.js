const mongoose = require('mongoose');
const { Schema } = mongoose; // equivalent to: const Schema = mongoose.Schema

const userSchema = new Schema({
    googleId: String
});

mongoose.model('users', userSchema); // the mongo collection we want to create
