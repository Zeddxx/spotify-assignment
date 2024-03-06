import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    offset: number;
    type: string;
    isMenuOpen: boolean;
    view: string;
    selectedCountries: string[]
    isFilterOpen: boolean
    popularityMode: string
}

const initialState: InitialState = {
    offset: 0,
    type: 'artist',
    isMenuOpen: true,
    view: 'grid',
    selectedCountries: [],
    isFilterOpen: false,
    popularityMode: 'none'
}

/**
 * A redux state for utility functions such as to toggle the navbar, set grid view, set market, set popularity, set types of tracks etc.
 * @function setTrackTypes (type: string) --> will set the types for selected tracks to show those filtered tracks.
 * @function setIsMenuOpen (type: boolean) --> will toggle the menu on the basis of this menu option which will return boolean
 * @function setView (type: string) --> will set the view like in which type user wants the see the items like "Grid" | "List".
 * @function addCountry (country: string) --> will push the selected countries into the list of countries.
 */
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
        },
        setPopularity: (state, action: PayloadAction<string>) => {
            state.popularityMode = action.payload
        }
    }
})

export const { 
    setOffset,
    setTrackTypes,
    setIsMenuOpen,
    setView,
    addCountry,
    removeCountry,
    clearSelectedCountries,
    setFilterToggle,
    setPopularity
} = selectUtility.actions
export default selectUtility.reducer;