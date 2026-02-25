const usermodel=require('../models/user')
const errorhandler=require('../middleware/errorMiddleware')
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')

    const register = async (req) => {
   
        const { email, password, name, role, department } = req.body;

        const user = await usermodel.findOne({ email }); 
        // Here user means internal hospital member like register dep and other dep and admin
        

        if (user) {
        throw new errorhandler("user already exist", 400);
        }

        const hash = await bcrypt.hash(password, 10);

        const Newuser = await usermodel.create({
        name,
        email,
        password,
        role,
        department: role === "STAFF" ? department : null,
        });

        return {
        id: Newuser.id,
        name: Newuser.name,
        email: Newuser.email,
        role: Newuser.role,
        department: Newuser.department,
        };
    
    };

const  login = async (req) => {

  const { email, password } = req.body;

  if (!email || !password) {
    throw new errorhandler("Email and password required", 400);
  }

  const user = await usermodel.findOne({ email });

  if (!user) {
    throw new errorhandler("User not found", 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new errorhandler("Invalid credentials", 401);
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      department: user.department
    },
    process.env.JWT_SECRET,                         
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department
    }
  };

}

 // Here not need to logout because we not  create frontend

 

const profile = async (req) => {
   
    const userId=req.user._id

  const user = await usermodel.findById(userId).select("-password");

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  return user;
};




module.exports = { register, login, profile };
