import { join } from "path";

import express from "express";
import nunjucks from "nunjucks";
import { setupDatabase } from "./database";
import users from "./users";
import expenses from "./expenses";
import tags from "./tags";

const app = express();
const port = 3000;

nunjucks.configure(join(__dirname, "..", "views"), {
  autoescape: true,
  express: app,
});

app.use(express.static(join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/expenses");
});

app.use("/users", users);
app.use("/expenses", expenses);
app.use("/tags", tags);

setupDatabase();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
