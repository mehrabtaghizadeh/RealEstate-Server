import mongoose from "mongoose";

const Schema = mongoose.Schema;

const propertySchema = new Schema({
    title:{
        type:String,
        // required:true 
    }, 
    description:{
        type:String,
        // required:true
    },
    year:{
        type:String
    },
    category:{
        type:String,
        // required:true
    },
    location:{
        type:String,
        // required:true
    },
    area:{
        type:Number,
        // min:1
    },
    phone:{
        type:Number,
        // min:11,
        // max:11
    },
    images:{
        type:Array,
        default:[]
        // required:true,
    },
    contract:{
      type:String
    },
    bedroom:{
        type:Number
    },
    price:{
        type:String
    },
    rent:String,
    perMonth:String,
    userId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
},{timestamps:true})
const Property = mongoose.model('Property',propertySchema)
export default Property;