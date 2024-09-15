import express from "express";
import { Tag } from "./database";

const router = express.Router();

router.get("/", (req, res) => {
  (async () => {
    const tags = await Tag.findAll();
    res.render("tag.njk", {
      tags: tags,
    });
  })();
});

router.post("/", (req, res) => {
  const name = req.body.name;
  (async () => {
    try {
      await Tag.create({
        name: name,
      });
    } catch (error) {
      console.error(`error: ${error}`);
    }
    res.redirect("/tags");
  })();
});

router.put("/", (req, res) => {
  res.send("カテゴリ変更しました");
});

export default router;
