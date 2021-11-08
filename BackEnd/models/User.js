const mongoose , {Schema} = require('mongoose');

const UserSchema = new Schema(
    {
        username:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        profileUrl:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        dateJoined:{
            type:Date,
            default:Date.now()
        },
        contributions:{
            type:Schema.Types.ObjectId,
            default:{
                audio:[],
                playlists:[]
            }
        },
        saved:{
            type:Schema.Types.ObjectId,
            default:{
                audio:[],
                playlists:[]
            }
        }
    }
    
)
module.exports=mongoose.model('user',UserSchema);