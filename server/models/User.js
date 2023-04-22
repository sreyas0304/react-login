const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String

    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String

    },
    date: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,

    auth_type: {
        type: String,

    }


});
module.exports = User = mongoose.model("users", UserSchema);
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// // Create Schema
// const UserSchema = new Schema({
//     id: {
//         type: String,
//         required: true
//     },
//     name:{
//         type: String,
//     },
//     first_name: {
//         type: String,
//         required: false
//     },
//     last_name: {
//         type: String

//     },
//     email: {
//         type: String,
//         required: false
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     mobile: {
//         type: String

//     },
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     auth_type: {
//         type: String,

//     }


// });
// module.exports = User = mongoose.model("users", UserSchema);