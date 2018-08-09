import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReqHandlerService } from '../req-handler.service';
import { Component, OnInit } from '@angular/core';
import { D3Service } from '../d3.service';

@Component({
  selector: 'app-formdata',
  templateUrl: './formdata.component.html',
  styleUrls: ['./formdata.component.css'],
})
export class FormDataComponent implements OnInit {
  myForm: FormGroup;
  sentiment: number;

  constructor(private reqHandlerService: ReqHandlerService, private d3Service: D3Service) {}

  dataPrepare() {
    let annotators = [];
    this.myForm.value.ner ? annotators.push('ner') : false;
    this.myForm.value.lemma ? annotators.push('lemma') : false;
    return {
      text: this.myForm.value.text,
      annotators,
    };
  }

  onSubmit() {
    this.reqHandlerService.analyzeText(this.dataPrepare()).subscribe(result => {
      this.d3Service.fetchData(result);
      this.sentiment = (result as any).sentimentResult;
    });
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      lemma: new FormControl(true),
      ner: new FormControl(true),
    });
  }
}
