import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    offset: 0,
    type: 'artist'
}

const selectOffset = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
        setTrackTypes: (state, action: PayloadAction<string>) => {
            state.type = action.payload;
        }
    }
})

export const { setOffset, setTrackTypes } = selectOffset.actions
export default selectOffset.reducer;