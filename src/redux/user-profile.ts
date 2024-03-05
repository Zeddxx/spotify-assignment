import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserProfile } from "../types";

interface UserProfileState {
  data: IUserProfile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserProfileState = {
  data: null,
  isLoading: true,
  error: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfileData: (state, action: PayloadAction<IUserProfile>) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});


export const { setUserProfileData, setLoading, setError } = userProfileSlice.actions;
export default userProfileSlice.reducer;