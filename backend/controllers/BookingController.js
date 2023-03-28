const Booking = require("../models/BookingSchema");

const getBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.params._id });

    res.send(bookings);
  } catch (e) {
    res.status(500).send({ error: "Cannot fetch!" });
  }
};

const createBooking = async (req, res) => {
  try {
    const customer = req.body.customer;
    const booking = new Booking(req.body);
    await booking.save();

    const bookings = await Booking.find({ customer });
    res.status(201).send(bookings);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Cannot fetch!" });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params._id);

    const bookings = await Booking.find({ customer: booking.customer });

    res.status(200).send(bookings);
  } catch (e) {
    res.send({ error: "Booking not available" });
  }
};

const editBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });

    const bookings = await Booking.find({ customer: booking.customer });
    res.status(200).send(bookings);
  } catch (e) {
    res.send({ error: "Booking not Available" });
  }
};

module.exports = { getBooking, createBooking, deleteBooking, editBooking };
