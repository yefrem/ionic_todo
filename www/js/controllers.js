angular.module('todoControllers', [])

  .controller('TodoCtrl', function($scope, Tasks) {
    $scope.tasks = Tasks.getUndone();

    $scope.add = function(label){
      if (label) {
        Tasks.add({label: label, done: 0});
        $scope.tasks = Tasks.getUndone();
        // this looks like a dirty random hack but that's the only way I managed to make this working
        // probably I should refresh my knowledge on JS scopes and learn more about Angular $scope. But it works and I'm happy
        this.newTask = '';
      }
    };

    $scope.remove = function(task){
      Tasks.remove(task.id);
      // somehow auto-update is not happening like it does in demo tabs app
      $scope.tasks = Tasks.getUndone();
    };

    $scope.markAsDone = function(task){
      Tasks.markAsDone(task.id);
      $scope.tasks = Tasks.getUndone();
    }
  })

  .controller('DoneCtrl', function($scope, Tasks) {
    $scope.tasks = Tasks.getDone();
  });
