import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

interface MovieQuote {
  movie: string;
  quote: string;
  $key?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly quotesPath = 'quotes';

  formMovieQuote: MovieQuote = {
    'quote': '',
    'movie': '',
  };

  movieQuotesStream: FirebaseListObservable<MovieQuote[]>;

  constructor(db: AngularFireDatabase) {
    this.movieQuotesStream = db.list(this.quotesPath);
  }

  onSubmit(): void {
    try {
      if (this.formMovieQuote.$key) {
        this.movieQuotesStream.update(this.formMovieQuote.$key, this.formMovieQuote)
      } else {
        this.movieQuotesStream.push(this.formMovieQuote);
      }

      this.formMovieQuote = {
        'quote': '',
        'movie': ''
      }
    } catch (e) {
      console.log('Form error:', e);
    }
  }

  edit(movieQuote: MovieQuote): void {
    this.formMovieQuote = movieQuote;
  }

  remove(movieQuoteKey: string): void {
    this.movieQuotesStream.remove(movieQuoteKey);
  }
}
