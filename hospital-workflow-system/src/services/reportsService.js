const Request = require("../models/Request");
const historyService = require("./historyService");
const ApiError = require("../utils/ApiError");

const toRequestSummary = (request) => ({
  _id: request._id,
  patientId: request.patientId,
  type: request.type,
  currentDepartment: request.currentDepartment,
  status: request.status,
  paymentStatus: request.paymentStatus
});

const generateReport = async (id, user) => {
  const request = await Request.findById(id).select("-steps -currentStep");
  if (!request) throw new ApiError("Request not found", 404);

  if (request.status === "REPORT_GENERATED") {
  throw new ApiError("Report already generated", 400);
}

if (request.status !== "READY_FOR_REPORT") {
  throw new ApiError("Request is not ready for report", 400);
}


  request.status = "REPORT_GENERATED";
  request.currentDepartment = user.department;
  await request.save();

  await historyService.logHistory(
    request._id,
    user.department,
    "REPORT_GENERATED",
    request.status,
    user._id
  );

  return toRequestSummary(request);
};




const getQueue = async (user) => {
  return await Request.find({
    
    status: "COMPLETE/READY_FOR_REPORT"
  }).select("_id patientId type status paymentStatus");
};

const closeRequest = async (id, user) => {
  const request = await Request.findById(id).select("-steps -currentStep");
  if (!request) throw new ApiError("Request not found", 404);

  if (request.status === "CLOSED") {
    throw new ApiError("Request already closed", 400);
  }

  if (request.status !== "REPORT_GENERATED") {
    throw new ApiError("Only REPORT_GENERATED request can be closed", 400);
  }

  request.status = "CLOSED";

  await request.save();

  await historyService.logHistory(
    request._id,
    user.department,
    "CLOSED",
    request.status,
    user._id
  );

  return toRequestSummary(request);
};

module.exports = { generateReport, getQueue, closeRequest };
