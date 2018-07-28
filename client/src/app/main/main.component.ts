import { Component, OnInit } from '@angular/core';
import { ReqHandlerService } from '../req-handler.service';
import { Form } from '../form';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  isValidFormSubmitted = false;
  form = new Form();
  constructor(private reqHandlerService: ReqHandlerService) {}

  onFormSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.form.text = form.controls['searchString'].value.trim();
    this.form.mode = form.controls['mode'].value;
    this.form.tokenize = form.controls['tokenize'].value ? 'tokenize,' : '';
    this.form.ssplit = form.controls['ssplit'].value ? 'ssplit,' : '';
    this.form.parse = form.controls['parse'].value ? 'parse,' : '';
    this.form.pos = form.controls['pos'].value ? 'pos,' : '';
    this.form.ner = form.controls['ner'].value ? 'ner,' : '';
    this.form.lemma = form.controls['lemma'].value ? 'lemma,' : '';
    let annotators = (
      this.form.tokenize +
      this.form.ssplit +
      this.form.parse +
      this.form.pos +
      this.form.ner +
      this.form.lemma
    ).slice(0, -1);
    const data = {
      text: this.form.text,
      annotators,
      mode: this.form.mode,
    };
    this.reqHandlerService.analyzeText(data).subscribe(result => {
      global.console.log(result);
    });
  }

  ngOnInit() {}
}
