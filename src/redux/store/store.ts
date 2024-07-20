import {combineReducers, configureStore} from "@reduxjs/toolkit";
import locationReducer from '../slices/LocationSlice'
import categoriesReducer from '../slices/CategoriesSlice'

const reducer = combineReducers({
    location: locationReducer,
    categories: categoriesReducer
})

export const store = configureStore({
    reducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
