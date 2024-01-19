const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

//@desc get goals
//@route GET /api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json({ goals });
});

//@desc set goals
//@route SET /api/goals
//@access private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json({ goal });
});

//@desc update goals
//@route UPDATE /api/goals/:id
//@access private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found!");
  }
  //user check
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found!");
  }

  //check user===goal.user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }

  //update the goal
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ updatedGoal });
});

//@desc delete goals
//@route DELETE /api/goals/:id
//@access private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found!");
  }

    //user check
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(400);
      throw new Error("User not found!");
    }
    
    //check user===goal.user
    if (goal.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized!");
    }

  await goal.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
