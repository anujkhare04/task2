const app=require('./app')
require("dotenv").config();
const connectDb=require('./src/config/db')
const usermodel=require('./src/models/user')
const port =process.env.PORT
const bcrypt = require("bcryptjs");

const createDefaultAdmin = async () => {
  const existingAdmin = await usermodel.findOne({ role: "ADMIN" });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await usermodel.create({
      name: "Admin",
      email: "admin@hospital.com",
      password: hashedPassword,
      role: "ADMIN",
      department: null
    });

    console.log("Default Admin Created");
  }
};

const startServer = async () => {
  await connectDb();
  await createDefaultAdmin();
  app.listen(port, () => console.log(`Server started at ${port}`));
};

startServer();

