import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {PeopleResponse, StarshipResponse} from "../../shared/models/resources.model";
import {AsyncPipe, NgIf} from "@angular/common";
import {Person, PersonDetails} from "../../shared/models/person.model";
import {StarShip, StarshipDetails} from "../../shared/models/starship.model";
import {MatButton} from "@angular/material/button";
import {ResourcesService} from "../../shared/services/resources.service";
import {Subject} from "rxjs";
import {takeUntil } from 'rxjs/operators';
import {ScoreBoardComponent} from "../score-board/score-board.component";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-content-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    NgIf,
    MatButton,
    AsyncPipe,
    ScoreBoardComponent,
    MatDivider
  ],
  templateUrl: './content-card.component.html',
  styleUrl: './content-card.component.css'
})
export class ContentCardComponent implements OnChanges, OnDestroy {
  @Input({required: true}) cardContent!: [PeopleResponse, StarshipResponse];

  private unsubscribe$ = new Subject<void>();
  people!: Person[];
  starships!: StarShip[];

  person!: PersonDetails;
  starship!: StarshipDetails;

  constructor(private resourcesService: ResourcesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const {cardContent} = changes;
    const [People, Starships] = cardContent.currentValue;
    if (cardContent && cardContent?.currentValue) this.onDataReceived(People, Starships);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onDataReceived(people: Person[], starships: StarShip[]): void {
    this.people = people;
    this.starships = starships
  }

  pickRandomElement(): void {
    this.resourcesService.getCharacterDetails(this.getRandomElement(this.people))
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((character) => this.person = character.result.properties);

    this.resourcesService.getStarshipDetails(this.getRandomElement(this.starships))
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((starship) => this.starship = starship.result.properties);
  }

  private getRandomElement<DataElement>(array: DataElement[]): DataElement {
    return array[Math.floor(Math.random() * array.length)];
  }
}
