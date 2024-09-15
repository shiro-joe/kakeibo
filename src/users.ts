import express from "express";
import { User } from "./database";

const router = express.Router();

router.get("/", (req, res) => {
  (async () => {
    const users = await User.findAll();
    res.json(users);
  })();
});

router.post("/", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  (async () => {
    try {
      await User.create({
        name: name,
        password: password,
      });
    } catch (error) {
      console.error(`error: ${error}`);
    }
  })();
});

export default router;
