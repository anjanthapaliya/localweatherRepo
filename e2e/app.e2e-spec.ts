import { WEATHERWIDGETPage } from './app.po';

describe('weather-widget App', () => {
  let page: WEATHERWIDGETPage;

  beforeEach(() => {
    page = new WEATHERWIDGETPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
