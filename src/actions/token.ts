export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export interface SetAccessTokenAction {
    type: typeof SET_ACCESS_TOKEN
    payload: string
}

export type AuthActionTypes = SetAccessTokenAction;