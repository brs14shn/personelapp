"use strict";

const { Schema } = require("mongoose");
const { mongoose } = require("../configs/dbConnection");

//TODO: Department Model 🗡
const DepartmentSchema = new Schema(
    {
        name: { 
            type: String, 
            required: true, 
            trim: true, 
            unique: true },
    },
    {collection:"departments",timestamps:true}
);

module.exports=mongoose.model('Department',DepartmentSchema)