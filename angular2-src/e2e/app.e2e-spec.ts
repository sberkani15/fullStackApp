import { Angular2SrcPage } from './app.po';

describe('angular2-src App', () => {
  let page: Angular2SrcPage;

  beforeEach(() => {
    page = new Angular2SrcPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
