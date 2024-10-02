import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  constructor(private http: HttpClient) { }

  private baseURL = 'https://api.themoviedb.org/3';
  private apiKey = 'fcb0bca73f2284ac2b3ee439fe15f725'

  backgroudnAPI(): Observable<any>{
    return this.http.get(`${this.baseURL}/trending/all/week?api_key=${this.apiKey}`)
  }

  tredingMovieApiData():Observable<any>{
    return this.http.get(`${this.baseURL}/trending/movie/day?api_key=${this.apiKey}`)
  }

  actionMovies():Observable<any>{
    return this.http.get(`${this.baseURL}/discover/movie?api_key=${this.apiKey}&with_genres=28`)
  }

  adventureMovies(): Observable<any>{
    return this.http.get(`${this.baseURL}/discover/movie?api_key=${this.apiKey}&with_genres=12`)
  }

  animationMovies(): Observable<any>{
    return this.http.get(`${this.baseURL}/discover/movie?api_key=${this.apiKey}&with_genres=16`)
  }

  comedyMovies(): Observable<any> {
    return this.http.get(`${this.baseURL}/discover/movie?api_key=${this.apiKey}&with_genres=35`)
  }

  scienceMovies(): Observable<any>{
    return this.http.get(`${this.baseURL}/discover/movie?api_key=${this.apiKey}&with_genres=878`)
  }

  thrillerMovies(): Observable<any> {
    return this.http.get(`${this.baseURL}/discover/movie?api_key=${this.apiKey}&with_genres=53`);
  }

  getMovieVideo(data: any): Observable<any> {
    return this.http.get(`${this.baseURL}/movie/${data}/videos?api_key=${this.apiKey}`)
  }

  getMovieCast(data: any): Observable<any> {
    return this.http.get(`${this.baseURL}/movie/${data}/credits?api_key=${this.apiKey}`)
  }

  getSearchMovie(data: any): Observable<any> {
    console.log(data)
    return this.http.get(`${this.baseURL}/search/movie?api_key=${this.apiKey}&query=${data}`);

  }
}
