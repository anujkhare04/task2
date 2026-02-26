const WORKFLOW = require("../config/workflowConfig");
const Request = require("../models/Request");
const Patient = require("../models/paitence");
const ApiError = require("../utils/ApiError");
const historyService=require("../services/historyService")

const normalizeDepartment = (value) =>
  String(value || "").toLowerCase().replace(/[^a-z\s]/g, "").trim();

const createRequest = async (data, user) => {
  const { patientId, type } = data;

  const existing = await Request.findOne({
    patientId,
    type,
    status: {
      $in: ["PENDING_APPROVAL", "APPROVED", "IN_PROGRESS", "READY_FOR_REPORT"],
    },
  });

  if (existing) {
    throw new ApiError("Request already exists for this patient and type", 409);
  }

  const patient = await Patient.findById(patientId);

  if (!patient) throw new ApiError("Patient not found", 404);

  const steps = WORKFLOW[type];
  if (!steps) throw new ApiError("Invalid request type", 400);

  const newRequest = await Request.create({
    patientId,
    type,
    steps,
    currentStep: 1,
    currentDepartment: steps[0],
    status: "PENDING_APPROVAL",
    paymentStatus: "PENDING",
  });

  await historyService.logHistory(
    newRequest._id,
    user.department,
    "CREATED",
    newRequest.status,
    user._id,
  );

  return newRequest;
};


const getAllRequests = async (user) => {

  if (user.role === "ADMIN") {
    return await Request.find().populate("patientId");
  }

  const allRequests = await Request.find().populate("patientId");
  return allRequests.filter(
    (item) =>
      normalizeDepartment(item.currentDepartment) ===
      normalizeDepartment(user.department)
  );
};


const updateRequest = async (id, data, user) => {

  const request = await Request.findById(id);
  if (!request) throw new ApiError("Request not found", 404);

  if (
    user.role !== "ADMIN" &&
    normalizeDepartment(user.department) !==
      normalizeDepartment(request.currentDepartment)
  ) {
    throw new ApiError("Not allowed to update this request", 403);
  }

  
  if (data.status) {
    request.status = data.status;
  }

  await request.save();

  await historyService.logHistory(
    request._id,
    user.department,
    "STATUS_UPDATED",
    request.status,
    user._id
  );

  return request;
};

const getRequestById = async (id, user) => {

  const request = await Request.findById(id)
    .populate("patientId");

  if (!request) throw new ApiError("Request not found", 404);

  if (user.role !== "ADMIN" &&
      normalizeDepartment(user.department) !==
        normalizeDepartment(request.currentDepartment)) {
    throw new ApiError("Access denied", 403);
  }

  return request;
};

module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest
};


