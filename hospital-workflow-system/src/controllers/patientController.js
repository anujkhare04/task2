
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
    const result = await patientService.viewPatient(req.params.id, req.user);

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
    getPatient
    
}
