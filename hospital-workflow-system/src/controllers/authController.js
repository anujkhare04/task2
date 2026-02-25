const authService=require('../services/Auth Service')


export const registerController = async (req, res, next) => {
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

export const loginController = async (req, res, next) => {
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


export const logoutController = async (req, res, next) => {
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

export const profileController = async (req, res, next) => {
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
