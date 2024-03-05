import { combineReducers } from "@reduxjs/toolkit";
import tokenReducer from "./token"

const rootReducer = combineReducers({
    token: tokenReducer,
})

export type RootState = ReturnType<typeof rootReducer>