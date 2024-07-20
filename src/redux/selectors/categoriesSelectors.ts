import { createSelector } from 'reselect';

const selectCategories = (state: any) => state.categories;

export const selectCategoriesData = createSelector(
    [selectCategories],
    (pipeline) => pipeline.categories
);
