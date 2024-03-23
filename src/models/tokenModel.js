"use strict";

//! 1-

//! 2-

const { mongoose } = require("../configs/dbConnection");

// {
//     "userId": "65343222b67e9681f937f001",
//     "token": "...tokenKey..."
//   }
/* ------------------------------------------------------- */

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      index:true,
      required: true,
      ref:"Personnel"
    },
    token: {
        type: String,
        unique : true,
        required: true,
        trim:true,
        index:true
    },
  },
  { collection: "tokens", timestamps: true }
);

module.exports = mongoose.model("Token",TokenSchema)
