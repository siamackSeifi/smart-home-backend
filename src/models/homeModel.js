const mongoose =require("mongoose");

const schema = new mongoose.Schema({
    endpoint: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^https?:\/\/.+$/ // Regular expression to ensure URLs start with 'http://' or 'https://'
    },
    home: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minLength: 5,
        maxLength: 11
    },
    userId: {
        type: Number,
        required: true,
    },
    careGiverId: {
        type: Number,
        required: true,
    },
    rooms: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
    }],
    // pills: [{
    //     name: {
    //         type: String,
    //         required: true,
    //         trim: true
    //     },
    //     left: {
    //         type: Number,
    //         required: true,
    //     },
    //     amount: {
    //         type: Number,
    //         required: true,
    //     },
    //     every: {
    //         type: Number,
    //         required: true,
    //     },
    //     tray: {
    //         type: String,
    //         required: true,
    //         enum: ['tray1, tray2, tray3'],
    //     },
    // }],
    emergencyCalls: [{
        receiver: {
            type: String,
            required: true,
            enum: ['911', 'caregiver', 'user']
        },
        reason: {
            type: String,
            required: true,
            enum: ['pillShortage', 'smokeDetection', 'pillNotTaken']
        },
        room: {
            type: String,
        },
        timestamp: {
            type: Date,
            default: Date.now()
        }
    }],
    vacuum: [{
        room: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now()
        }
    }],
    mowLawn: [{
        type: Date
    }]
});

const Model = mongoose.model("Home", schema, 'Home');
module.exports = Model;
