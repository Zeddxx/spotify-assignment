import { redirectToAuth, getAccessToken } from "../_auth/auth-login";
// import { UserProfile } from "../types";
import { fetchProfile } from "./utils";

// const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
const clientId = '3b04e348702d47f28c3fff0c6964e784';
const params = new URLSearchParams(window.location.search);
const code = params.get('code');

// if(!code) {
//     redirectToAuth(clientId);
// }else {
//     const accessToken = await getAccessToken(clientId, code);
//     const profile = await fetchProfile(accessToken);
//     // populateProfile(profile)
// }

export async function populateProfile() {
    try {
       if(!code) {
        redirectToAuth(clientId);
       }else {
        const accessToken = await getAccessToken(clientId, code);
        const profile = await fetchProfile(accessToken);
        return profile;
       }
    } catch (error) {
        console.log(error);
    }
}