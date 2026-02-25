const authService=require('../services/Auth Service')


const registerController = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);

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
    const result = await authService.login(req.body);

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
    const result = await authService.logout(req.body);

    res.status(200).json({
      success: true,
      data: result
    });
  
  } catch (error) {
    next(error);
  }
};

  const profileController = async (req, res, next) => {
  try {
    const result = await authService.profile(req.body);

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
