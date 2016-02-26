angular.module('todoServices', [])

.factory('Tasks', function() {
  var tasks;

  try {
    tasks = JSON.parse(window.localStorage['todoTasks']);
  } catch (e){
    tasks = [];
  }

  function getIndexById(id){
    for (var i in tasks){
      if(tasks[i].id == id){
        return i;
      }
    }

    return false;
  }

  function persist(){
    window.localStorage['todoTasks'] = JSON.stringify(tasks);
  }

  return {
    get: function(id){
      //load();
      // somehow filter method is not available
      var i;
      if(i = getIndexById(id)){
        return tasks[i]
      }

      return false;
    },

    getUndone: function(){
      //load();
      return tasks.filter(function(el){
        return el.done == 0;
      });
    },

    getDone: function(){
      //load();
      return tasks.filter(function(el){
        return el.done == 1;
      });
    },

    add: function(task){
      // TODO: maybe could add some validation, but not now
      task.id = tasks[tasks.length - 1].id + 1;
      tasks.push(task);
      persist();
    },

    markAsDone: function(id){
      // TODO: does it make sense to use int(1) instead of bool to save local storage space?
      var i;
      if (i = getIndexById(id)){
        tasks[i].done = 1;
        persist();
      }
    },

    remove: function(id){
      var i;
      if (i = getIndexById(id)){
        tasks.splice(i, 1);
      }
    }
  };
});
