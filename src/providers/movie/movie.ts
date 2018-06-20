import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {
    private baseApiPath = 'https://api.themoviedb.org/3';

  constructor(public http: HttpClient) {
    console.log('Hello MovieProvider Provider');
  }

  getLatestMovies(page = 1) {
      return this.http.get(this.baseApiPath + `/movie/popular?page=${page}&api_key=` + this.getApiKey());
  }

  getMovieDetails(filmeid) {
    return this.http.get(this.baseApiPath + `/movie/${filmeid}?api_key=` + this.getApiKey());
}

  getApiKey(): string{
    return '8409c84eee71febd97e9587c87d5854f';
  }

}
