const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const dept = require("../middleware/departmentMidlleware");
const { createBill, pay, getQueue, listBills, getBill, updateBill, deleteBill } = require("../controllers/billingController");

// Create a bill for a request
router.post("/requests/:id/bill", auth, dept("Billing department"), createBill);

// Pay existing bill
router.patch("/requests/:id/pay", auth, dept("Billing department"), pay);

// Billing queue (pending payments)
router.get("/queue", auth, dept("Billing department"), getQueue);

// CRUD for bills
router.get("/bills", auth, dept("Billing department"), listBills);
router.get("/bills/:id", auth, dept("Billing department"), getBill);
router.patch("/bills/:id", auth, dept("Billing department"), updateBill);
router.delete("/bills/:id", auth, dept("Billing department"), deleteBill);

module.exports = router;
