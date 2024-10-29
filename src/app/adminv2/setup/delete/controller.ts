import { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {
  try {

    res.render("adminv2/delete/index", {
      title: "Yong - Delete Account",
    });
  } catch (err: any) {
    console.error("Error in index route:", err.message || err);
  }
};