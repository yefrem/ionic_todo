describe('TODO', function(){
  it('should show header', function(){
    browser.get('/');
    expect(element(by.css('.title')).getText()).toEqual('My Awesome ToDo App');
  });
});
