import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {PeopleResponse, StarshipResponse} from "../../shared/models/resources.model";
import {AsyncPipe, NgIf} from "@angular/common";
import {Person, PersonDetails} from "../../shared/models/person.model";
import {StarShip, StarshipDetails} from "../../shared/models/starship.model";
import {MatButton} from "@angular/material/button";
import {ResourcesService} from "../../shared/services/resources.service";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-content-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    NgIf,
    MatButton,
    AsyncPipe
  ],
  templateUrl: './content-card.component.html',
  styleUrl: './content-card.component.css'
})
export class ContentCardComponent implements OnChanges {
  @Input({required: true}) cardContent!: [PeopleResponse, StarshipResponse];

  people!: Person[];
  starships!: StarShip[];

  person$!: Observable<PersonDetails>;
  starship$!: Observable<StarshipDetails>;

  constructor(private resourcesService: ResourcesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const {cardContent} = changes;
    const [People, Starships] = cardContent.currentValue;
    if (cardContent && cardContent?.currentValue) this.onDataReceived(People, Starships);
  }

  onDataReceived(people: Person[], starships: StarShip[]): void {
    this.people = people;
    this.starships = starships
  }

  pickRandomElement(): void {
    this.person$ = this.resourcesService.getCharacterDetails(this.getRandomElement(this.people)).pipe(map((character) => character.result.properties))
    this.starship$ = this.resourcesService.getStarshipDetails(this.getRandomElement(this.starships)).pipe(map((character) => character.result.properties))
  }

  private getRandomElement<DataElement>(array: DataElement[]): DataElement {
    return array[Math.floor(Math.random() * array.length)];
  }
}
