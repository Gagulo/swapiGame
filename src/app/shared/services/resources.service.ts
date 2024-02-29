import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse, PeopleResponse, StarshipResponse} from "../models/resources.model";

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  private rootEndPoint = 'https://www.swapi.tech/api';

  constructor(private http: HttpClient) { }

  getPeopleData(): Observable<ApiResponse<PeopleResponse>> {
    return this.http.get<ApiResponse<PeopleResponse>>(`${this.rootEndPoint}/people`);
  }

  getStarshipsData(): Observable<ApiResponse<StarshipResponse>> {
    return this.http.get<ApiResponse<StarshipResponse>>(`${this.rootEndPoint}/starships`)
  }
}
