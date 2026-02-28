const billingService =require("../services/billingService")

const createBill = async (req, res, next) => {
  try {
    const result = await billingService.createBill(req.params.id, req.body);

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const pay = async (req, res, next) => {
  try {
    const result = await billingService.pay(req.params.id, req.user);

    res.status(200).json({
      success: true,
      data: result
    });
  
  } catch (error) {
    
    next(error);
  }
};

const getQueue = async (req, res, next) => {
  try {
    const result = await billingService.getQueue(req.user);

    res.status(200).json({
      success: true,
      data: result
    });
  
  } catch (error) {
    
    next(error);
  }
};

const listBills = async (req, res, next) => {
  try {
    const result = await billingService.listBills();

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getBill = async (req, res, next) => {
  try {
    const result = await billingService.getBill(req.params.id);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const updateBill = async (req, res, next) => {
  try {
    const result = await billingService.updateBill(req.params.id, req.body, req.user);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const deleteBill = async (req, res, next) => {
  try {
    const result = await billingService.deleteBill(req.params.id);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

module.exports={
    createBill,
    pay,
    getQueue,
    listBills,
    getBill,
    updateBill,
    deleteBill
}
