const authService=require('../services/Auth Service')


const registerController = async (req, res, next) => {
  try {
    const result = await authService.register(req);

    res.status(200).json({
      success: true,
      data: result
    });
  
  } catch (error) {
    
    next(error);
  }
};

 const loginController = async (req, res, next) => {
  try {
    const result = await authService.login(req);
     
    res.status(200).json({
      success: true,
      data: result
    });

    
  
  } catch (error) {
    next(error);
  }
};


 const logoutController = async (req, res, next) => {
  try {

    // here not need to logout because we not using frontend 

    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  
  } catch (error) {
    next(error);
  }
};

  const profileController = async (req, res, next) => {
  try {
    const result = await authService.profile(req);

    res.status(200).json({
      success: true,
      data: result
    });
  
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  profileController
};
