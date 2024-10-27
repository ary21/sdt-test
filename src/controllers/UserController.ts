import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  async createUser(req: Request, res: Response): Promise<any> {
    try {
      const { email, firstName, lastName, timeZone, birthDate } = req.body;
      const checkEmail = await UserService.getUserOneSpecific({ email });
      if (checkEmail) {
        return res.status(409).json({ error: "Email already exists" });
      }

      const user = await UserService.createUser({
        email,
        firstName,
        lastName,
        timeZone,
        birthDate,
      });
      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<any> {
    try {
      const user = await UserService.getUserById(parseInt(req.params.id));
      user
        ? res.json({ user })
        : res.status(404).json({ error: "User not found" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  }

  async getAllUsers(_req: Request, res: Response): Promise<any> {
    try {
      const users = await UserService.getAllUsers();
      res.json({ users });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  async updateUser(req: Request, res: Response): Promise<any> {
    try {
      const { email, firstName, lastName, timeZone, birthDate } = req.body;

      const checkEmail = await UserService.getUserOneSpecific({
        email,
        id: { not: +req.params.id },
      });
      if (checkEmail) {
        return res.status(409).json({ error: "Email already exists" });
      }

      const user = await UserService.updateUser(+req.params.id, {
        email,
        firstName,
        lastName,
        timeZone,
        birthDate,
      });
      user
        ? res.json({ user })
        : res.status(404).json({ error: "User not found" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<any> {
    try {
      const user = await UserService.deleteUser(+req.params.id);
      user
        ? res.status(204)
        : res.status(404).json({ error: "User not found" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  }
}

export default new UserController();
