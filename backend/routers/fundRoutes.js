const express = require("express");
const {
  saveFund,
  getSavedFunds,
  removeFund,
  checkSaved,
} = require("../controllers/fundController.js");
const { protect } = require("../middlewares/auth.js");

const router = express.Router();

router.use(protect);

router.route("/").post(saveFund).get(getSavedFunds);

router.route("/:schemeCode").delete(removeFund);

router.get("/check-saved/:schemeCode", checkSaved);

module.exports = router;
