import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        createdBy:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        isComplete:{
            type:Boolean,
            default:false
        }
    },
    {timestamps:true}
)

export const Todos=mongoose.model("Todos",todoSchema)