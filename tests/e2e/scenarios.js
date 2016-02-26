describe('TODO', function() {
  // TODO: there should be the way to pre-set local storage data before testing

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
    element(by.css('.undone-task .mark-as-done')).click();
    var tasks = element.all(by.css('.undone-task'));
    expect(tasks.count()).toBe(1);

    browser.get('#/tab/done');
    tasks = element.all(by.css('.done-task'));
    expect(tasks.count()).toBe(1);
  });

  it('properly removes undone task', function(){
    browser.get('#/tab/todo');
    element(by.css('.undone-task .remove')).click();
    var tasks = element.all(by.css('.undone-task'));
    expect(tasks.count()).toBe(0);
  });

  it('properly removes done task', function(){
    browser.get('#/tab/done');
    element(by.css('.done-task .remove')).click();
    var tasks = element.all(by.css('.done-task'));
    expect(tasks.count()).toBe(0);
  });
});
