import { MovieQuotesPage } from './app.po';

describe('movie-quotes App', () => {
  let page: MovieQuotesPage;

  beforeEach(() => {
    page = new MovieQuotesPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
