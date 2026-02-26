const historyService = require("../services/historyService");
const ApiError = require("../utils/ApiError");

const getHistoryController = async (req, res, next) => {
 
  try {
    if (!req.params.id) {
      throw new ApiError("Request id is required", 400);
    }

    const result = await historyService.getHistoryByRequest(req.params.id);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { getHistoryController };
