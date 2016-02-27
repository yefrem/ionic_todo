'use strict';

describe('service', function() {
  var tasksBackup;
  // load modules
  beforeEach(module('todo'));
  beforeEach(function(){
    tasksBackup = window.localStorage['todoTasks'];
    window.localStorage['todoTasks'] = angular.toJson([
      {
        id: 1,
        label: 'Undone Task 1',
        done: 0
      },
      {
        id: 2,
        label: 'Undone Task 2',
        done: 0
      },
      {
        id: 3,
        label: 'Done Task 1',
        done: 1
      },
      {
        id: 4,
        label: 'Done Task 2',
        done: 1
      },
      {
        id: 5,
        label: 'Done Task 3',
        done: 1
      }
    ]);
  });

  afterEach(function(){
    // I'm sure there should be better way for this
    // also not sure if it works at all and if it's really needed, will see later
    window.localStorage['todoTasks'] = tasksBackup
  });

  // Test service availability
  it('checks the existence of Tasks factory', inject(function(Tasks) {
    expect(Tasks).toBeDefined();
  }));

  it('fetches undone tasks', inject(function(Tasks) {
    expect(Tasks.getUndone().length).toEqual(2);
  }));

  it('fetches done tasks', inject(function(Tasks) {
    expect(Tasks.getDone().length).toEqual(3);
  }));

  it('fetches single task by ID', inject(function(Tasks) {
    expect(Tasks.get(2).label).toEqual('Undone Task 2');
  }));

  it('creates new task with correct ID', inject(function(Tasks) {
    Tasks.add({
      label: 'New Task',
      done: 0
    });
    expect(Tasks.get(6).label).toEqual('New Task');
  }));

  it('creates new task with correct ID when no tasks are present', inject(function(Tasks) {
    var bak = window.localStorage['todoTasks'];
    window.localStorage['todoTasks'] = undefined;
    Tasks.reload();
    Tasks.add({
      label: 'New Task',
      done: 0
    });
    expect(Tasks.get(1).label).toEqual('New Task');

    window.localStorage['todoTasks'] = bak;
  }));

  it('marks task as done', inject(function(Tasks) {
    Tasks.markAsDone(2);
    expect(Tasks.get(2).done).toEqual(1);
  }));

  it('removes task', inject(function(Tasks) {
    Tasks.remove(1);
    Tasks.reload(); // check if change persisted
    expect(Tasks.get(1)).toEqual(false);
  }));
});
