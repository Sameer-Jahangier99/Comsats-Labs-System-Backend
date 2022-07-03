const Lab = require("../models/labModal");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

// @desc    auth user
// @route   POST user/login
// @access  Public

const AddLab = asyncHandler(async (req, res) => {
  const { name, softwares, imageUrl,qrId} = req.body;
  const createdLab = await Lab.create({name,softwares, imageUrl, qrId})
  if(createdLab)
  {
    res.json({
        message: "Successfully Created",
        data: createdLab,
        success: true,
    })

  }
  else {
      throw new Error("Lab not created");
  }
});

const UpdateLab = asyncHandler(async (req, res) => {
  const { _id, softwares } = req.body;
  console.log(req.body._id);
  const lab = await Lab.findOne({ _id });
  if (lab) {
    const software = lab.softwares;
    lab.softwares = [...software, softwares];

    const updatedLab = await lab.save();

    res.json({
      _id: updatedLab._id,
      name: updatedLab.name,
      softwares: updatedLab.softwares,
    });
  } else {
    throw new Error("Lab not Found");
  }
});

const AllLab = asyncHandler(async (req, res) => {
  const allLabs = await Lab.find({});
  if (allLabs) {
    res.json(allLabs);
  } else {
    throw new Error("Lab not created");
  }
});

// @desc    find lab by qrId
// @route   POST /lab/qrId
// @access  Public

const findLab = asyncHandler(async (req, res) => {
  const { qrId } = req.body;
  const lab = await Lab.findOne({ qrId })
  if (lab) {
      res.json({ lab })
  }
  else {
      res.status(400);
      throw new Error("Product not Found");
  }
});


module.exports = {
  AddLab,
  AllLab,
  UpdateLab,
  findLab
};