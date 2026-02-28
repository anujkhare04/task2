
const patientService=require('../services/patientService')


const createPatientController = async (req, res, next) => {
  try {
    const result = await patientService.createPatient(req);

    res.status(201).json({
      success: true,
      data: result 
    });
  
  } catch (error) {

    next(error);
  }
};

const getPatient= async (req, res, next) => {
  try {
    const result = await patientService.viewPatient(req.params.phone);

    res.status(200).json({
      success: true,
      data: result
    });
  
  } catch (error) {

    next(error);
  }
};

const viewAllPatient = async (req, res, next) => {
  try {
    const result = await patientService.viewAllPatient ();

    res.status(200).json({
      success: true,
      data: result
    });
  
  } catch (error) {

    next(error);
  }
};

const getPatientById = async (req, res, next) => {
  try {
    const result = await patientService.viewPatientById(req.params.id);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const updatePatientController = async (req, res, next) => {
  try {
    const result = await patientService.updatePatient(req.params.id, req.body);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const deletePatientController = async (req, res, next) => {
  try {
    const result = await patientService.deletePatient(req.params.id);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

module.exports={
    createPatientController,
    getPatient,
    viewAllPatient,
    getPatientById,
    updatePatientController,
    deletePatientController
    
}
