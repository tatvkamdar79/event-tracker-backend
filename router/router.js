const express = require("express");
const router = express.Router();

const tenantRouter = require("./tenantRouter");
const authRouter = require("./authRouter");

router.use("/tenant", tenantRouter);
router.use("/auth", authRouter);

module.exports = router;
