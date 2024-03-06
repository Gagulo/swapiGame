import {Person} from "./person.model";
import {StarShip} from "./starship.model";

export type ApiResponse<DataType> = {
  results: DataType
}

export type PeopleResponse = ApiResponse<Person[]>
export type StarshipResponse = ApiResponse<StarShip[]>
