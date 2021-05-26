const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const router = express.Router();
const Todo = require("../models/Todo");

/* CREATE */
router.post("/", authenticateUser(), async (req, res, next) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.send(newTodo);
  } catch (err) {
    next(err);
  }
});

/* READ */
router.get("/", async (req, res, next) => {
  const { filter } = req.query;

  const todos = await Todo.find(filter);
  res.send(todos);
});

router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });
    res.send(todo);
  } catch (err) {
    res.status(404);
    res.send({ error: "Todo doesn't exist!" });
  }
});

/* UPDATE */
router.put("/:id", async (req, res, next) => {
  const dataToUpdate = req.body;
  const { id } = req.params;

  try {
    await Todo.updateOne({ _id: id }, dataToUpdate);
    res.send({ message: "Updated Todo succefull!", dataToUpdate });
  } catch (err) {
    res.status(404);
    res.send({ error: "Could not update!" });
  }
});

/* DELETE */
router.delete("/:id", async (req, res, next) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    // res.status(204);
    res.send({ message: "Deleted succefully", deletedId: req.params.id });
  } catch {
    res.status(404);
    res.send({ error: "Todo doesn't exist!" });
  }
});

module.exports = router;
