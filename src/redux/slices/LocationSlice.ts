import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Location} from "../types/Location";

interface LocationSlice {
    location: Location,
    isLoading: boolean
}

const initialState : LocationSlice = {
    location: {
        id: 0,
        name: '',
        description: '',
        active: false,
        logo: '',
        cover: '',
        category_id: 0,
        catalog_ids: [],
        updated_at: '',
        created_at: ''
    },
    isLoading: false
}

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocations: (state, action: PayloadAction<Location>) => {
            state.location = action.payload
        },
        setIsLocationLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
});

export const { setLocations, setIsLocationLoading } = locationSlice.actions;
export default locationSlice.reducer;