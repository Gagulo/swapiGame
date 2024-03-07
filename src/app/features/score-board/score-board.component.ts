import {Component, Input} from '@angular/core';
import {PersonDetails} from "../../shared/models/person.model";
import {StarshipDetails} from "../../shared/models/starship.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-score-board',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './score-board.component.html',
  styleUrl: './score-board.component.css'
})
export class ScoreBoardComponent {
  @Input() person!: PersonDetails;
  @Input() starship!: StarshipDetails;

  winner(personMass: string, starshipCrew: string): string {
    const personMassValue = parseInt(personMass);
    const starshipCrewValue = parseInt(starshipCrew);

    if (!isNaN(personMassValue) && !isNaN(starshipCrewValue)) {
      if (personMassValue > starshipCrewValue) {
        return 'Person';
      } else if (personMassValue < starshipCrewValue) {
        return 'Starship';
      } else {
        return 'It\'s a tie!';
      }
    } else {
      return 'Cannot determine the winner';
    }
  }
}
