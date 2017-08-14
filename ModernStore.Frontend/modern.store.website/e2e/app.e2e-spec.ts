import { Modern.Store.AppPage } from './app.po';

describe('modern.store.app App', () => {
  let page: Modern.Store.AppPage;

  beforeEach(() => {
    page = new Modern.Store.AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
