import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { FormDataComponent } from './form/formdata.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, FormDataComponent],
      imports: [routing, FormsModule, ReactiveFormsModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    });
    TestBed.compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
    expect(component.title).toBe('CoreNLP example');
  });
});
