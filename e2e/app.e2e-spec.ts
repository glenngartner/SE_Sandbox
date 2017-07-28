import { DsPrototypesPage } from './app.po';

describe('ds-prototypes App', () => {
  let page: DsPrototypesPage;

  beforeEach(() => {
    page = new DsPrototypesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
