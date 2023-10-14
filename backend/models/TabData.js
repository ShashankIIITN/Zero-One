const { json } = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserTabs = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    Tab: {
        type:String,
        default: null
    },
    TabContent: [],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('TabData', UserTabs);