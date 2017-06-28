const express = require("express");
const router = express.Router();
const models = require("./models");

router.get("/", function(req, res) {
  res.redirect("/todo");
});

router.get("/todo", function(req, res) {
  models.todo.findAll().then(function(todo) {
    res.render("index", {
      todo: todo
    });
  });
});

router.post("/todo", function(req, res) {
  const newTodo = {
    name: req.body.todo,
    completed: false
  };
  models.todo.create(newTodo).then(function () {
    res.redirect("/");
  });
});
module.exports = router;
