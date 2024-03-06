import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    offset: number;
    type: string;
    isMenuOpen: boolean;
    view: string;
    selectedCountries: string[]
    isFilterOpen: boolean
}

const initialState: InitialState = {
    offset: 0,
    type: 'artist',
    isMenuOpen: true,
    view: 'grid',
    selectedCountries: [],
    isFilterOpen: false
}

const selectUtility = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
        setTrackTypes: (state, action: PayloadAction<string>) => {
            state.type = action.payload;
        },
        setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
            state.isMenuOpen = action.payload
        },
        setView: (state, action: PayloadAction<string>) => {
            state.view = action.payload
        },
        addCountry: (state, action: PayloadAction<string>) => {
            state.selectedCountries.push(action.payload)
        },
        removeCountry: (state, action: PayloadAction<string>) => {
            state.selectedCountries = state.selectedCountries.filter(country => country !== action.payload)
        },
        clearSelectedCountries: (state) => {
            state.selectedCountries = []
        },
        setFilterToggle: (state, action: PayloadAction<boolean>) => {
            state.isFilterOpen = action.payload
        }
    }
})

export const { setOffset, setTrackTypes, setIsMenuOpen, setView, addCountry, removeCountry, clearSelectedCountries, setFilterToggle } = selectUtility.actions
export default selectUtility.reducer;