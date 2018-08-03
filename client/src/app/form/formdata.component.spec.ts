import { async, TestBed } from '@angular/core/testing';

import { FormDataComponent } from './formdata.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('FormComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormDataComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
    });
    TestBed.compileComponents();
  }));

  it('should create the component', () => {
    TestBed.configureTestingModule({
      declarations: [FormDataComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
    });
    const fixture = TestBed.createComponent(FormDataComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });

  it('should validate form as invalid when empty', () => {
    const fixture = TestBed.createComponent(FormDataComponent);
    const component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.myForm.valid).toBeFalsy();
  });

  it('should handle form inputs and prepare data in needed format', () => {
    let fixture = TestBed.createComponent(FormDataComponent);
    let component: FormDataComponent = fixture.componentInstance;
    let element = fixture.nativeElement;

    fixture.detectChanges();

    element.querySelector('#text').value = 'I am Jack from London';
    element.querySelector('#text').dispatchEvent(new Event('input'));
    element.querySelector('input[formControlName="ner"]').click();

    fixture.detectChanges();

    expect(component.myForm.value).toEqual({
      text: 'I am Jack from London',
      lemma: true,
      ner: false,
    });

    expect(component.dataPrepare()).toEqual({
      text: 'I am Jack from London',
      annotators: ['lemma'],
    });

    expect(component.myForm.valid).toBeTruthy();
    expect(element.querySelector('button[type="submit"]').disabled).toBe(false);
  });
});
