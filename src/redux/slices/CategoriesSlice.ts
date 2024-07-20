import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Category} from "../types/Category";

interface CategoriesSlice {
    categories: Category[],
    isLoading: boolean
}

const initialState: CategoriesSlice = {
    categories: [],
    isLoading: false
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload
        },
        setIsCategoriesLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    },
})

export const { setCategories, setIsCategoriesLoading } = categoriesSlice.actions;
export default categoriesSlice.reducer
