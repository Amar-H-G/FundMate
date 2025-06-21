const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const saveFund = asyncHandler(async (req, res) => {
  const { schemeCode, schemeName } = req.body;

  if (!schemeCode || !schemeName) {
    res.status(400);
    throw new Error("Please include both schemeCode and schemeName");
  }

  const user = await User.findById(req.user._id);

  // Check if fund already saved
  const alreadySaved = user.savedFunds.some(
    (fund) => fund.schemeCode === schemeCode
  );

  if (alreadySaved) {
    res.status(400);
    throw new Error("Fund already saved");
  }

  user.savedFunds.push({
    schemeCode,
    schemeName,
  });

  await user.save();

  res.status(201).json({
    schemeCode,
    schemeName,
    message: "Fund saved successfully",
  });
});

const getSavedFunds = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("savedFunds");
  res.status(200).json({
    count: user.savedFunds.length,
    funds: user.savedFunds,
  });
});

const removeFund = asyncHandler(async (req, res) => {
  const { schemeCode } = req.params;

  const user = await User.findById(req.user._id);

  const initialLength = user.savedFunds.length;
  user.savedFunds = user.savedFunds.filter(
    (fund) => fund.schemeCode !== schemeCode
  );

  if (user.savedFunds.length === initialLength) {
    res.status(404);
    throw new Error("Fund not found in saved funds");
  }

  await user.save();

  res.status(200).json({
    schemeCode,
    message: "Fund removed successfully",
  });
});

const checkSaved = asyncHandler(async (req, res) => {
  const { schemeCode } = req.params;

  const user = await User.findById(req.user._id);
  const isSaved = user.savedFunds.some(
    (fund) => fund.schemeCode === schemeCode
  );

  res.status(200).json({ isSaved, schemeCode });
});

module.exports = { saveFund, getSavedFunds, removeFund, checkSaved };
