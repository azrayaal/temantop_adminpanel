import { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {
  try {

    res.render("adminv2/privacy/index", {
      title: "Yong - Privacy Policy",
    });
  } catch (err: any) {
    console.error("Error in index route:", err.message || err);
  }
};