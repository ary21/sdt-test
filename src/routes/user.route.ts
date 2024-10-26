import { Router } from "express";
import UserController from "../controllers/UserController";
import { UserDTO } from "../common/validator/UserValidator";
import zodValidationMiddleware from "../common/middleware/zodValidationMiddleware";

const router = Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.post("/", zodValidationMiddleware(UserDTO), UserController.createUser);
router.put("/:id", zodValidationMiddleware(UserDTO), UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;
