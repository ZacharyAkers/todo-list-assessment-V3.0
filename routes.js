const express =  require('express');
const router = express.Router();
const models = require('./models');

completedList = [];

router.get("/", function(req, res){
  models.Todos.findAll().then(function(todos){
    res.render("index", {todos: todos});
  });
});

const getTodo = function(req, res, next) {
  models.Todos.findById(req.params.todoid).then(function(toDo) {
    if (toDo) {
      req.toDo = toDo;
      next();
    } else {
      res.status(404).send("Not Found");
    }
  });
}

router.post("/", function(req, res){
req.checkBody("newTodo", "You must enter a new todo").notEmpty();

const todoItem = {
  todo: req.body.newTodo,
  completed: false
};

  req.getValidationResult().then(function(result){
    if(result.isEmpty()){
      models.Todos.create(todoItem).then(function(toDo){
        res.redirect("/");
      });
    } else {
        res.redirect("/");
      }

  });
});

router.post("/:todoid/complete", getTodo, function(req, res){

  req.toDo.completed = true;
  console.log(req.toDo.completed);
  req.toDo.save();
  res.redirect("/");
})



router.post("/:todoid/delete", getTodo, function(req, res) {
  req.toDo.destroy().then(function() {
    res.redirect("/");
  });
});


module.exports = router;