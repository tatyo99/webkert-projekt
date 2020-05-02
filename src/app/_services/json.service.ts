import { Film } from './../_models/film';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class JSONService {
  private usersJSON = 'assets/users.json';
  private filmsJSON = 'assets/films.json';

  constructor(private http: Http) { }

  loadUsers(): Observable<User[]> {
    return this.http.get(this.usersJSON).pipe(map((resp: Response) => resp.json()));
  }

  loadFilms(): Observable<Film[]> {
    return this.http.get(this.filmsJSON).pipe(map((resp: Response) => resp.json()));
  }
}
