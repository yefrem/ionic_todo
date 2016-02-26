describe('TODO', function() {
  // TODO: there should be the way to pre-set local storage data before testing (UPD: probably using executeScript)

  it('shows and updates undone', function () {
    browser.get('#/tab/todo');
    var tasks = element.all(by.css('.undone-task'));
    var input = element(by.model('newTask'));
    var button = element(by.css('.button.button-positive'));
    expect(tasks.count()).toBe(0);

    input.sendKeys('Task 1');
    button.click();
    input.sendKeys('Task 2');
    button.click();
    expect(input.getAttribute('value')).toBe('');

    expect(tasks.count()).toBe(2);
  });

  it('shows persisted undone tasks', function () {
    browser.get('#/tab/todo');
    var tasks = element.all(by.css('.undone-task'));
    expect(tasks.count()).toBe(2);
  });

  it("doesn't show done from the beginning", function(){
    browser.get('#/tab/done');
    var tasks = element.all(by.css('.done-task'));
    expect(tasks.count()).toBe(0);
  });

  it("moves task to done tab when marked as done", function(){
    browser.get('#/tab/todo');
    //var doneButton = element(by.css('.undone-task .mark-as-done'));
    //doneButton.click();

    // workaround to click invisible button
    // IRL I would find/develop working way to simulate swipe
    browser.executeScript('angular.element(document.getElementsByClassName("mark-as-done")[0]).triggerHandler("click");');

    var tasks = element.all(by.css('.undone-task'));
    expect(tasks.count()).toBe(1);
    //
    browser.get('#/tab/done');
    tasks = element.all(by.css('.done-task'));
    expect(tasks.count()).toBe(1);
  });

  it('properly removes undone task', function(){
    browser.get('#/tab/todo');
    browser.executeScript('angular.element(document.getElementsByClassName("remove")[0]).triggerHandler("click");');
    var tasks = element.all(by.css('.undone-task'));
    expect(tasks.count()).toBe(0);
  });

  it('properly removes done task', function(){
    browser.get('#/tab/done');
    browser.executeScript('angular.element(document.getElementsByClassName("remove")[0]).triggerHandler("click");');
    var tasks = element.all(by.css('.done-task'));
    expect(tasks.count()).toBe(0);
  });
});
