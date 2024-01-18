//@desc get goals
//@route GET /api/goals
//@access private
const getGoals = (req, res)=>{
    res.status(200).json({message:'Get goals'});
}

//@desc set goals
//@route SET /api/goals
//@access private
const setGoal = (req, res)=>{
    res.status(200).json({message:'Set goals'});
}

//@desc update goals
//@route UPDATE /api/goals/:id
//@access private
const updateGoal = (req, res)=>{
    res.status(200).json({message:'Update goals'});
}

//@desc delete goals
//@route DELETE /api/goals/:id
//@access private
const deleteGoal = (req, res)=>{
    res.status(200).json({message:'Delete goals'});
}




module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}