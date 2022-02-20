import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { getAllArticles } from 'src/app/shared/test-data';

describe('ApiService', () => {
  let service: ApiService;
  let controler: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    controler = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all articles', () => {
    service.loadArticles().subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data.success).toBeTrue();
      expect(data.articles.length).toBe(2);
    });
    const req = controler.expectOne(`${service.baseUrl}/articles`);
    expect(req.request.method).toBe('GET');
    req.flush({
      success: true,
      articles: getAllArticles(),
    });
  });
});
