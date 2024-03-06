import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse, PeopleResponse, StarshipResponse} from "../models/resources.model";
import {StarShip, StarshipDetails} from "../models/starship.model";
import {Person, PersonDetails} from "../models/person.model";

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  private rootEndPoint = 'https://www.swapi.tech/api';

  constructor(private http: HttpClient) { }

  getPeopleData(): Observable<ApiResponse<PeopleResponse>> {
    return this.http.get<ApiResponse<PeopleResponse>>(`${this.rootEndPoint}/people?page=1&limit=99`);
  }

  getCharacterDetails(data: Person): Observable<{ result: { properties: PersonDetails }}> {
    return this.http.get<{ result: { properties: PersonDetails }}>(data.url)
  }

  getStarshipsData(): Observable<ApiResponse<StarshipResponse>> {
    return this.http.get<ApiResponse<StarshipResponse>>(`${this.rootEndPoint}/starships?page=1&limit=99`)
  }

  getStarshipDetails(data: StarShip): Observable<{ result: { properties: StarshipDetails }}> {
    return this.http.get<{ result: { properties: StarshipDetails }}>(data.url)
  }
}
