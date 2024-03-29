import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ResourcesService} from './shared/services/resources.service';
import {ContentCardComponent} from "./features/content-card/content-card.component";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {combineLatest, Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {PeopleResponse, StarshipResponse} from "./shared/models/resources.model";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ContentCardComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'swapi';
  combineResources$!: Observable<[PeopleResponse, StarshipResponse]>

  constructor(private resourcesService: ResourcesService) {
  }

  ngOnInit(): void {
    this.getResources();
  }

  getResources(): void {
    this.combineResources$ = combineLatest([
      this.resourcesService.getPeopleData().pipe(map(data => data.results)),
      this.resourcesService.getStarshipsData().pipe(map(data => data.results))
    ]);
  }
}
