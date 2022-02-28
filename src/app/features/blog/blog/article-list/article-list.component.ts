import { Article } from './../../../../store/article/article.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  @Input() articleList: Article[] | null = [];

  constructor() {}

  ngOnInit(): void {}
}
