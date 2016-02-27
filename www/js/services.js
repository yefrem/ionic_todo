angular.module('todoServices', [])

.factory('Tasks', function() {
  var tasks;

  loadData();

  function getIndexById(id){
    for (var i in tasks){
      if(tasks[i].id == id){
        return i;
      }
    }

    return false;
  }

  function persist(){
    window.localStorage['todoTasks'] = angular.toJson(tasks);
  }

  function loadData(){
    // added this only for testing purpose
    try {
      tasks = JSON.parse(window.localStorage['todoTasks']);
    } catch (e){
      tasks = [];
    }
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
      // TODO: I should have added a test for empty set case but don't know how to skip beforeEach and not sure how to organize it better without skipping
      task.id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
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
        persist();
      }
    },

    reload: function(){
      loadData();
    }
  };
});
