import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, selectEntities, selectAll } from './article.reducer';

export const state = createFeatureSelector<State>('article');
export const entities = createSelector(state, selectEntities);

export const allArticles = createSelector(state, selectAll);

export const allCategories = () =>
  createSelector(allArticles, (articles) => {
    const categories = articles.map((article) => article.categories).flat();
    /** remove duplicated categories using Set */
    return [...new Set(categories)].sort();
  });

export const getArticlesByCategory = (category: string) =>
  createSelector(allArticles, (articles) => {
    const relatedArticles = articles.filter((article) =>
      article.categories.includes(category)
    );
    return relatedArticles;
  });

export const allTags = () =>
  createSelector(allArticles, (articles) => {
    const tags = articles.map((article) => article.tags).flat();
    return [...new Set(tags)].sort();
  });

export const getArticlesByTag = (tag: string) =>
  createSelector(allArticles, (articles) => {
    const relatedArticles = articles.filter((article) =>
      article.tags.includes(tag)
    );
    return relatedArticles;
  });

export const allAuthors = () =>
  createSelector(allArticles, (articles) => {
    const authors = articles.map((article) => article.author);
    return [...new Set(authors)].sort();
  });

export const getArticlesByAuthor = (author: string) =>
  createSelector(allArticles, (articles) => {
    const relatedArticles = articles.filter(
      (article) => article.author === author
    );
    return relatedArticles;
  });

export const view = createSelector(state, (state: State) => state.view);

export const isLoading = createSelector(state, (state) => state.loading);
