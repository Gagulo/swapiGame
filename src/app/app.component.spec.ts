import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ResourcesService } from './shared/services/resources.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let resourcesService: ResourcesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [ResourcesService]
    }).compileComponents();

    resourcesService = TestBed.inject(ResourcesService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'swapi' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('swapi');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('swapi');
  });

  it('should call getResources and combine observables', () => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    resourcesService = TestBed.inject(ResourcesService);

    const mockPeopleResponse = { results: { results:[{ name: 'Luke Skywalker', uid: 1, url: '' }] }};
    const mockStarshipResponse = { results: { results: [{name: 'X-Wing', uid: 1, url: ''}]} };

    spyOn(resourcesService, 'getPeopleData').and.returnValue(of(mockPeopleResponse));
    spyOn(resourcesService, 'getStarshipsData').and.returnValue(of(mockStarshipResponse));

    component.getResources();

    expect(resourcesService.getPeopleData).toHaveBeenCalled();
    expect(resourcesService.getStarshipsData).toHaveBeenCalled();
    expect(component.combineResources$).toBeDefined();
    component.combineResources$.subscribe(([people, starships]) => {
      expect(people).toEqual(mockPeopleResponse.results);
      expect(starships).toEqual(mockStarshipResponse.results);
    });
  });
});
