import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    property:[{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Property"
   }]
,
},{timestamps:true})
const User = mongoose.model('User',userSchema)
export default User;