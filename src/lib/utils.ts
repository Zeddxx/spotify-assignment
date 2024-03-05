import { UserProfile } from "../types";

export function generateCodeVerifier(length: number) {
    let text = '';
    // const possible = import.meta.env.APP_SECRET_KEY!;
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
}

export async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export async function fetchProfile(code: string): Promise<UserProfile> {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${code}`
        }
    })
    const data = await result.json()

    return data;
}