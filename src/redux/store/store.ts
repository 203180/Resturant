import {combineReducers, configureStore} from "@reduxjs/toolkit";
import locationReducer from '../slices/LocationSlice'
import categoriesReducer from '../slices/CategoriesSlice'
import productsReducer from '../slices/ProductsSlice'

const reducer = combineReducers({
    location: locationReducer,
    categories: categoriesReducer,
    products: productsReducer
})

export const store = configureStore({
    reducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
