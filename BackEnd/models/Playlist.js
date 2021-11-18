const mongoose = require('mongoose'); 
const {Schema} = require('mongoose');


const PlaylistSchema = new Schema(
    {
        clip:{
            type:String
        },
        name:{
            type:String,
        },
        createdBy:{
            type:String,
            required:true,
            ref:'user'
        },
        dateCreated:{
            type:Date,
            default:Date.now()
        },
        dateLastModified:{
            type:Date,
            default:Date.now()
        },
        followers:{
            type:Number,
            default:0
        }
    }
)
module.exports=mongoose.model('playlist',PlaylistSchema);