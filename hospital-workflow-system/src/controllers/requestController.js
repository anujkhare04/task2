const requestService = require("../services/requestService");

const createRequestController = async (req, res, next) => {
  try {
    const result = await requestService.createRequest(req.body, req.user);

    res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};

const getAllRequestsController = async (req, res, next) => {
  try {
    const result = await requestService.getAllRequests(req.user);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};

const getRequestByIdController = async (req, res, next) => {
  try {
    const result = await requestService.getRequestById(req.params.id, req.user);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};

const updateRequestController = async (req, res, next) => {
  try {
    const result = await requestService.updateRequest(
      req.params.id,
      req.body,
      req.user
    );

    

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRequestController,
  getAllRequestsController,
  getRequestByIdController,
  updateRequestController
};