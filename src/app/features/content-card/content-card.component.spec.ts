import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCardComponent } from './content-card.component';
import {ResourcesService} from "../../shared/services/resources.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { of } from 'rxjs';

describe('ContentCardComponent', () => {
  let component: ContentCardComponent;
  let fixture: ComponentFixture<ContentCardComponent>;
  let resourcesService: ResourcesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentCardComponent, HttpClientTestingModule],
      providers: [ResourcesService]
    }).compileComponents();

    fixture = TestBed.createComponent(ContentCardComponent);
    component = fixture.componentInstance;
    resourcesService = TestBed.inject(ResourcesService);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call resourcesService methods on pickRandomElement', () => {
    const mockPeople = [{ name: 'Luke Skywalker', uid: 1, url: '' }];
    const mockStarships = [{ name: 'X-Wing', uid: 1, url: ''  }];
    const mockPersonDetails = { name: 'Luke Skywalker', mass: '76' };
    const mockStarshipDetails = { name: 'X-Wing', crew: '1' };

    spyOn(resourcesService, 'getCharacterDetails').and.returnValue(of({ result: { properties: mockPersonDetails } }));
    spyOn(resourcesService, 'getStarshipDetails').and.returnValue(of({ result: { properties: mockStarshipDetails } }));

    component.people = mockPeople;
    component.starships = mockStarships;

    component.pickRandomElement();

    expect(resourcesService.getCharacterDetails).toHaveBeenCalledWith(mockPeople[0]);
    expect(resourcesService.getStarshipDetails).toHaveBeenCalledWith(mockStarships[0]);
    expect(component.person).toEqual(mockPersonDetails);
    expect(component.starship).toEqual(mockStarshipDetails);
  });
});
