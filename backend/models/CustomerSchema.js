const mongoose = require('mongoose')


const CustomerSchema = mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true,
        unique : true,
    },
    contact :{
        type : String,
        required: true,
        unique : true,
    }
})

const Customer = mongoose.model('Customer',CustomerSchema)

module.exports = Customer