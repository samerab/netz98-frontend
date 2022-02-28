import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent implements OnInit {
  @Input() list: string[] | null = [];
  @Output() onSelect = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  _onSelect(item: string) {
    this.onSelect.emit(item);
  }
}
