import {People} from "./people.model";
import {StarShip} from "./starship.model";

export type ApiResponse<DataType> = {
  results: DataType
}

export type PeopleResponse = ApiResponse<People[]>
export type StarshipResponse = ApiResponse<StarShip[]>
