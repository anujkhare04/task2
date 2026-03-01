const adminService = require("../services/adminService");
const billingService = require("../services/billingService");
const patientService = require("../services/patientService");

const listUsersController = async (req, res, next) => {
  try {
    const users = await adminService.listUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

const updateUserController = async (req, res, next) => {
  try {
    const updated = await adminService.updateUser(req.params.id, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

const deleteUserController = async (req, res, next) => {
  try {
    const result = await adminService.deleteUser(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getBillController = async (req, res, next) => {
  try {
    const bill = await billingService.getBill(req.params.id);
    res.status(200).json({ success: true, data: bill });
  } catch (error) {
    next(error);
  }
};

const updateBillController = async (req, res, next) => {
  try {
    const updated = await billingService.updateBill(
      req.params.id,
      req.body,
      req.user
    );
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

const deleteBillController = async (req, res, next) => {
  try {
    const result = await billingService.deleteBill(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const listPatientsController = async (req, res, next) => {
  try {
    const patients = await patientService.viewAllPatient();
    res.status(200).json({ success: true, data: patients });
  } catch (error) {
    next(error);
  }
};

const getPatientController = async (req, res, next) => {
  try {
    const patient = await patientService.viewPatientById(req.params.id);
    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
};

const updatePatientController = async (req, res, next) => {
  try {
    const updated = await patientService.updatePatient(req.params.id, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

const deletePatientController = async (req, res, next) => {
  try {
    const result = await patientService.deletePatient(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  listUsersController,
  updateUserController,
  deleteUserController,
  getBillController,
  updateBillController,
  deleteBillController,
  listPatientsController,
  getPatientController,
  updatePatientController,
  deletePatientController,
};
