import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'result-box',
  templateUrl: './result-box.component.html',
  styleUrls: ['./result-box.component.scss'],
})
export class ResultBoxComponent implements OnInit {
  @Input() originTotal: number | null = 0;
  @Input() resultTotal = 0;
  @Input() resultTitle = '';

  constructor() {}

  ngOnInit(): void {}
}
