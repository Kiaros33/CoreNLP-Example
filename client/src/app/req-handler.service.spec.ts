import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReqHandlerService } from './req-handler.service';

describe('ReqHandlerService', () => {
  let service: ReqHandlerService;
  let httpMock: HttpTestingController;
  let dataToSend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReqHandlerService],
    });

    service = TestBed.get(ReqHandlerService);
    httpMock = TestBed.get(HttpTestingController);
    dataToSend = {
      text: 'Hello, London!',
      annotators: ['ssplit', 'parse', 'pos'],
      mode: 'pipeline',
    };
  });

  it('should post data', () => {
    service.analyzeText(dataToSend).subscribe((data: any) => {
      expect(data.responseWords).toEqual(['Hello', ',', 'London', '!']);
      expect(data.responseNerTags).toEqual([null, null, null, null]);
    });

    const req = httpMock.expectOne(`http://localhost:3001/api/text`, 'call to api');
    expect(req.request.method).toBe('POST');

    req.flush({
      responseWords: ['Hello', ',', 'London', '!'],
      responseNerTags: [null, null, null, null],
    });

    httpMock.verify();
  });
});
