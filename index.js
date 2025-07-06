const connectDB = require("./db");

const main = async () => {
  require("dotenv").config();

  const express = require("express");
  const app = express();
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(require("cors")());

  const router = require("./router/router");

  const attachResponseHelpers = require("./middlewares/attachResponseHelpers");
  const validateRequest = require("./middlewares/validateRequest");
  const validateTenantAndUser = require("./middlewares/validateTenantAndUser");

  app.use("/", attachResponseHelpers, validateRequest, validateTenantAndUser, router);

  await connectDB();

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server started at port - ${PORT}`);
  });
};

main();
