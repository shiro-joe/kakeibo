import express from "express";
import { Expense, Tag } from "./database";

const router = express.Router();

router.get("/", (req, res) => {
  (async () => {
    let result;
    console.log(req.query);
    if (!req.query.tagId) {
      result = await Expense.findAll({
        include: {
          model: Tag,
          attributes: ["name"],
        },
      });
    } else {
      const tagId = Number(req.query.tagId);
      result = await Expense.findAll({
        include: {
          model: Tag,
          attributes: ["name"],
        },
        where: {
          TagId: tagId,
        },
      });
    }
    const expenses = result.map((e) => e.get({ plain: true }));
    const sum = expenses.map((v) => v.amount).reduce((x, y) => x + y, 0);
    res.render("index.njk", {
      expenses: expenses,
      sum: sum,
    });
  })();
});

router.post("/", (req, res) => {
  const amount: number = req.body.amount;
  const title: string = req.body.title;
  const TagId: number = req.body.TagId;
  const date: string = req.body.date;
  (async () => {
    try {
      await Expense.create({
        amount: amount,
        title: title,
        TagId: TagId,
        date: date,
      });
      res.redirect("/expenses");
    } catch (error) {
      console.error(`error: ${error}`);
      res.redirect("/");
      return;
    }
  })();
});

router.put("/", (req, res) => {
  res.send("変更しました");
});

router.delete("/", (req, res) => {
  res.send("削除しました");
});

export default router;
