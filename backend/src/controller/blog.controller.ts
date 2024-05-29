import { Request, Response, NextFunction } from "express";
import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from "../services/blog.services";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await createOne(req, res, next);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getAll(req);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getOne(req, res);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await updateOne(req, res);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await deleteOne(req, res);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const c = {
  create,
  list,
  get,
  update,
  remove,
};

export default c;
