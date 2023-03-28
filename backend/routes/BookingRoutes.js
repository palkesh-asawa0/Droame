const express = require('express')
const router = express.Router()
const {getBooking,createBooking, deleteBooking, editBooking} = require('../controllers/BookingController')

router.get("/:_id",getBooking)
router.post("", createBooking)
router.delete("/:_id", deleteBooking)
router.put("", editBooking)


module.exports = router