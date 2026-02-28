const Request = require("../models/Request");
const historyService = require("./historyService");

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

module.exports = { pay, getQueue };
