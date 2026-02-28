const Request = require("../models/Request");
const historyService = require("./historyService");

const createBill = async (id, payload) => {
  const request = await Request.findById(id);
  if (!request) throw new Error("Request not found");

  if (payload.paymentAmount === undefined || payload.paymentAmount === null) {
    throw new Error("paymentAmount is required");
  }

  request.paymentAmount = payload.paymentAmount;
  request.paymentStatus = "PENDING";
  await request.save();

  return {
    _id: request._id,
    paymentAmount: request.paymentAmount,
    paymentStatus: request.paymentStatus,
  };
};

const pay = async (id, user) => {

  const request = await Request.findById(id);
  if (!request) throw new Error("Request not found");

  if (request.paymentStatus === "PAID")
    throw new Error("Already paid");

  request.paymentStatus = "PAID";
  request.paidAt = new Date();
  request.status = "IN_PROGRESS";
  request.currentStep += 1;
  request.currentDepartment = request.steps[request.currentStep];

  await request.save();

  await historyService.logHistory(
    request._id,
    user.department,
    "PAYMENT_DONE",
    request.status,
    user._id
  );

  return {
    _id: request._id,
    paymentStatus: request.paymentStatus,
    status: request.status
  };
};

const getQueue = async (user) => {
  return await Request.find({
    currentDepartment: user.department,
    paymentStatus: "PENDING"
  }).select("-steps -currentStep");
};

const listBills = async () => {
  return Request.find({})
    .select("paymentStatus paymentAmount paidAt paidBy status patientId type");
};

const getBill = async (id) => {
  const request = await Request.findById(id).select(
    "paymentStatus paymentAmount paidAt paidBy status patientId type"
  );
  if (!request) throw new Error("Bill not found");
  return request;
};

const updateBill = async (id, payload, user) => {
  // If status update to PAID, reuse pay logic
  if (payload.paymentStatus === "PAID") {
    return await pay(id, user);
  }

  const request = await Request.findById(id);
  if (!request) throw new Error("Bill not found");

  if (payload.paymentAmount !== undefined) {
    request.paymentAmount = payload.paymentAmount;
  }

  if (payload.paymentStatus && ["PENDING", "PAID"].includes(payload.paymentStatus)) {
    request.paymentStatus = payload.paymentStatus;
  }

  await request.save();
  return request;
};

const deleteBill = async (id) => {
  const request = await Request.findById(id);
  if (!request) throw new Error("Bill not found");

  request.paymentAmount = undefined;
  request.paymentStatus = "PENDING";
  request.paidAt = undefined;
  request.paidBy = undefined;
  await request.save();

  return { message: "Bill reset to pending" };
};

module.exports = { pay, getQueue, createBill, listBills, getBill, updateBill, deleteBill };
