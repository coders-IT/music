const mongoose = require('mongoose'); 
const {Schema} = require('mongoose');


const PlayListAudio = new Schema(
    {
        playlist:{
            type:String
        },
        songs:{
            type:Schema.Types.Array,
            ref:'audio'
        }
    }
)
module.exports=mongoose.model('PlayListAudio',PlayListAudio);