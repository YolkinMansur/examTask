import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responce } from './films/films.component';
import { Responce1 } from './information/information.component';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiURl = 'https://swapi.dev/api/films';
  starshipURL = 'https://swapi.dev/api/starships';
  constructor(private http: HttpClient) {}

  getAllFilms() {
    return this.http.get<Responce>(this.apiURl);
  }
  getAllStarship() {
    return this.http.get<Responce1>(this.starshipURL);
  }
}
