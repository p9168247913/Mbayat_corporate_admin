const httpStatus = require("http-status");
const { response } = require("../../app");
const catchAsync = require("../../utils/catchAsync");
const model = require("./model");

const getAllBlockChain = catchAsync(async (req, res) => {
  try {
    const data = await model.find({});
    if (data) {
      res.status(httpStatus.OK).send({ data });
    } else {
      res.status(httpStatus.BAD_REQUEST).send({});
    }
  } catch (error) {
   res.status(httpStatus.BAD_REQUEST).send(error)
  }
});

module.exports = { getAllBlockChain };

