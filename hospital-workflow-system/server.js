const app = require("./app");
require("dotenv").config();
const connectDb = require("./src/config/db");
const port = process.env.PORT;

const startServer = async () => {
  await connectDb();

  app.listen(port, () =>
    console.log(`Server started at http://localhost:${port}`),
  );
};

startServer();
