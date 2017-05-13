import { RifqPage } from './app.po';

describe('rifq App', () => {
  let page: RifqPage;

  beforeEach(() => {
    page = new RifqPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
