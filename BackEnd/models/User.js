const mongoose = require('mongoose'); 
const {Schema} = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        dateJoined: {
            type: Date,
            default: Date.now(),
        },
        contribAudio: {
            type: Schema.Types.Array,
            default: [],
        },
        contribPlayList: {
            type: Schema.Types.Array,
            default: [],
        },
        savedAudio: {
            type: Schema.Types.Array,
            default: [],
        },
        savedPlayList: {
            type: Schema.Types.Array,
            default: [],
        },
        recent: {
            type: Schema.Types.Array,
            default: [],
        },
    }
)
module.exports=mongoose.model('user',UserSchema);
