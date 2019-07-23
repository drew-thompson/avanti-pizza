import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PizzaMenu } from '@avanti-pizza/api-interface';
import { MenuService } from './menu.service';

describe('MenuService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: MenuService = TestBed.get(MenuService);
    expect(service).toBeTruthy();
  });

  it('should get the menu', () => {
    const testMenu: PizzaMenu = {
      Belmont: {
        name: 'Belmont',
        description: 'Something delicious',
        thin: false
      },
      'Garden Veggie': {
        name: 'Garden Veggie',
        description: 'Vegetables! Oh yeah.',
        thin: false
      }
    };
    httpClient.get<PizzaMenu>('/api/menu').subscribe(res => expect(res).toEqual(testMenu));
  });
});
