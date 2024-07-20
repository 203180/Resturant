import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Category} from "../../types/Category";

interface CategoriesSlice {
    categories: Category[],
    isLoading: boolean,
    selectedCategory: Category | null
}

const initialState: CategoriesSlice = {
    categories: [],
    isLoading: false,
    selectedCategory: null
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
        },
        setSelectedCategory: (state, action: PayloadAction<number>) => {
            state.selectedCategory = state.categories[action.payload]
        }
    },
})

export const { setCategories, setIsCategoriesLoading, setSelectedCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer
