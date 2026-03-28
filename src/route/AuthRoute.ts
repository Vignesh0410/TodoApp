import { Router } from "express";
import { UserService } from "../service/UserService";

const router = Router();
const userService = new UserService();

router.post("/signup", async (req, res) => {
  try {
    const response = await userService.signUp(req.body);
    return res.status(200).json({ token: response });
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const response = await userService.login(req.body);
    return res.status(200).json({ token: response });
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
});

export default router;
