const Customer = require("../models/CustomerSchema");
const Booking = require("../models/BookingSchema");

const createCustomer = async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();

    const customers = await Customer.find().select("-__v");
    res.status(201).send(customers);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Cannot fetch!" });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().select("-__v");
    res.send(customers);
  } catch (e) {
    res.status(500).send({ error: "Cannot fetch!" });
  }
};

const editCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.body._id, req.body);

    const customers = await Customer.find().select("-__v");
    res.send(customers);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "No customer Found" });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params._id);
    await Booking.deleteMany({ customer: req.params._id });

    const customers = await Customer.find().select("-__v");
    res.send(customers);
  } catch (e) {
    res.status(500).send({ error: "Customer Not Found" });
  }
};

module.exports = { getCustomers, deleteCustomer, createCustomer, editCustomer };
