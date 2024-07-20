import {Product} from "../../types/Product";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Location} from "../../types/Location";

interface ProductsSlice {
    products: Product[],
    isLoading: boolean
}

const initialState: ProductsSlice = {
    products: [],
    isLoading: false
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload.map(product => ({
                ...product,
                is_photo_expanded: false
            }))
        },
        setAreProductsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        expandPhoto: (state, action: PayloadAction<number>) => {
            const productIndex = state.products.findIndex(product => product.id === action.payload);
            state.products[productIndex].is_photo_expanded = !(state.products[productIndex].is_photo_expanded);
        }
    }
});


export const {setProducts, setAreProductsLoading, expandPhoto} = productsSlice.actions;
export default productsSlice.reducer