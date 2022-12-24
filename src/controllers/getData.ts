import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Person from "../model/person.schema";
import { memory } from "./fetchData";

const getPerson = asyncHandler(async (req: Request, res: Response) => {
  const { uid } = req.params;
  const person = await Person.findOne({ where: { uid } });
  if (!person) {
    res.status(400);
    throw new Error("Person not found");
  }
  res.status(200).json(person);
});

const getPeople = asyncHandler(async (req: Request, res: Response) => {
  //TODO: validate offset and limit to ensure no negative value is passed
  let { page, limit } = req.query;
  page = page ? page : "1";
  limit = limit ? limit : "10";
  const offset = (+page - 1) * +limit;
  const allRows = Person.count();
  const persons = Person.findAndCountAll({
    offset,
    limit: +limit,
  });
  const [totalDocs, { count, rows }] = await Promise.all([allRows, persons]);
  const pages = Math.ceil(totalDocs / +limit);
  const data = {
    totalDocs,
    persons: rows,
    totalPage: pages,
    previous: Boolean(+page > 1),
    next: Boolean(pages > +page),
  };
  res.status(200).json(data);
});

const fetchDataStatus = async (_: Request, res: Response) => {
  res.status(200).json(memory);
};

export { getPerson, getPeople, fetchDataStatus };
