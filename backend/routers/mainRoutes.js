const express = require("express");
const authRoutes = require("./authRoutes.js");
const fundRoutes = require("./fundRoutes.js");

const router = express.Router();

router.use("/api/user", authRoutes);
router.use("/api/funds", fundRoutes);

router.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

module.exports = router;
