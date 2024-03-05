import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    token: localStorage.getItem('token') || '',
    isToken: localStorage.getItem('token') ? true : false
}

const selectToken = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isToken = true;
            localStorage.setItem('token', action.payload);
            setTimeout(() => {
                state.token = '';
                state.isToken = false;
                localStorage.removeItem('token')
            }, 60 * 60 * 1000)
        },
        clearToken: (state) => {
            state.token = "";
            state.isToken = false;
            localStorage.removeItem('token');
        }
    }
})

export const { setToken, clearToken } = selectToken.actions
export default selectToken.reducer;