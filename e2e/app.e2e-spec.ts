import { AuhackFrontendPage } from './app.po';

describe('auhack-frontend App', () => {
  let page: AuhackFrontendPage;

  beforeEach(() => {
    page = new AuhackFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
