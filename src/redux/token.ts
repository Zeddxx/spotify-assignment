import { PayloadAction, createSlice } from "@reduxjs/toolkit"

/**
 * @InitialState for the @tokens to store into my redux also into the @localStorage
 * @isToken i have used it but haven't used through out the project was some idea related to it.
 */
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
            // I have used a timeout function to @empty the localStorage after 1hr as the token is valid for one hour only.
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