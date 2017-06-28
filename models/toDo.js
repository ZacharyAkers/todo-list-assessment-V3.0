'use strict';
module.exports = function(sequelize, DataTypes) {
  var toDo = sequelize.define('todo', {
    name: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return toDo;
};