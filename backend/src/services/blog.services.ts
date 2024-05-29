import { RES_STATUS_CODE } from "../constant/resStatusCode";
import responseWrapper from "../helper/responseWrapper";
import blogModel from "../model/blog.model";
import { COMMON_MESSAGE } from "../utils/messages.enum";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const createOne = async (req: Request, res: Response, next: NextFunction) => {
  const blog = new blogModel(req.body);
  await blog.save();
  return responseWrapper(
    true,
    COMMON_MESSAGE.Success,
    RES_STATUS_CODE.RS200,
    blog
  );
};

const getAll = async (req: Request) => {
  const { search, sortOrder } = req.body;
  const match: { [key: string]: any } = {};
  const searchQuery = { $regex: search, $options: "i" };
  if (search) {
    match["$or"] = [
      { title: searchQuery },
      { description: searchQuery },
      { category: searchQuery },
    ];
  }
  const res = await blogModel.aggregate([
    {
      $match: match,
    },
    {
      $sort: {
        createdAt: sortOrder === "asc" ? 1 : -1,
      },
    },
  ]);
  if (res.length > 0)
    return responseWrapper(
      true,
      COMMON_MESSAGE.Success,
      RES_STATUS_CODE.RS200,
      res
    );
  else
    return responseWrapper(
      false,
      COMMON_MESSAGE.Not_Found,
      RES_STATUS_CODE.RS404,
      null
    );
};

const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(RES_STATUS_CODE.RS400)
      .send(COMMON_MESSAGE.MONGOOSE_ID_VALIDATION);
  }
  const data = await blogModel.findById(id);
  if (data)
    return responseWrapper(
      true,
      COMMON_MESSAGE.Success,
      RES_STATUS_CODE.RS200,
      data
    );
  else
    return responseWrapper(
      false,
      COMMON_MESSAGE.Not_Found,
      RES_STATUS_CODE.RS404,
      null
    );
};

const updateOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(RES_STATUS_CODE.RS400)
      .send(COMMON_MESSAGE.MONGOOSE_ID_VALIDATION);
  }
  const updates = req.body;
  const data = await blogModel.findByIdAndUpdate(id, updates, { new: true });
  if (data)
    return responseWrapper(
      true,
      COMMON_MESSAGE.Success,
      RES_STATUS_CODE.RS200,
      data
    );
  else
    return responseWrapper(
      false,
      COMMON_MESSAGE.Not_Found,
      RES_STATUS_CODE.RS404,
      null
    );
};

const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(RES_STATUS_CODE.RS400)
      .send(COMMON_MESSAGE.MONGOOSE_ID_VALIDATION);
  }
  const data = await blogModel.findByIdAndDelete(id);
  if (data)
    return responseWrapper(
      true,
      COMMON_MESSAGE.Success,
      RES_STATUS_CODE.RS200,
      data
    );
  else
    return responseWrapper(
      false,
      COMMON_MESSAGE.Not_Found,
      RES_STATUS_CODE.RS404,
      null
    );
};

export { createOne, getAll, getOne, updateOne, deleteOne };
