
const mongoose = require('mongoose'); 
const {Schema} = require('mongoose');

const PlaylistSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        audio:{
            type:String,
            required:true
        },
        clip:{
            type:String,
            required:true
        },
        uploadedBy:{
            type:String,
            required:true,
            ref:'user'
        },
        dateUploaded:{
            type:Date,
            default:Date.now()
        },
        plays:{
            type:Number,
            default:0
        }
    }
)
module.exports=mongoose.model('audio',PlaylistSchema);