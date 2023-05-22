import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { register } from "../services/usersService";

export const registerUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const user = await register(email, password);
    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "User already exists") {
        return res.status(409).json({ error: error.message });
      }
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
