const express = require('express')
const router = express.Router()

const {getCustomers, createCustomer, deleteCustomer, editCustomer} = require('../controllers/CustomerController')


router.get("",getCustomers)
router.post("",createCustomer)
router.delete("/:_id", deleteCustomer)
router.put("", editCustomer)

module.exports = router