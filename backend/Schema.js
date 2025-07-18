import mongoose, { Mongoose, trusted } from "mongoose";

const TodoSchema = mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    Detail:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        default:"Not Started"
    },
    Username:{
        type:String, 
        required:true
    }
})

const ParameterSchema = mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    Date:{
        type:Date, 
        required:true
    },
    EngOil:{
        type:Number,
        required:true
    },
    Coolant:{
        type:Number,
        required:true
    },
    Hydraullic:{
        type:Number,
        required:true
    },
    Transmission:{
        type:Number,
        required:true
    }
})

const todo = mongoose.model('Todo', TodoSchema, 'Todo')
const Parameter = mongoose.model('parameter', ParameterSchema, 'Parameters')

export  {todo, Parameter}