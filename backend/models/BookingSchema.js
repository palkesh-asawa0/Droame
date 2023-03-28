const mongoose = require('mongoose')

const BookingSchema = mongoose.Schema({
    customer : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Customer",
    },
    locationID : {
        type: String,
        required: true
    },
    droneShotID : {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Booking = mongoose.model('Booking',BookingSchema)

module.exports = Booking