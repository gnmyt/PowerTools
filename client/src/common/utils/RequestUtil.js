const DEFAULT_URL = process.env.NODE_ENV === 'production' ? "https://tools-api.gnmyt.dev/" : "http://localhost:7182/";

const getURL = () => localStorage.getItem("url") || DEFAULT_URL;

// Run a plain request with all default values
export const request = (path, method = "GET", body = {}, headers = {}) => {
    return fetch(getURL() + path, {headers, method, body: method !== "GET" ? JSON.stringify(body) : undefined});
}

// Run a GET request and get the json of the response
export const jsonRequest = async (path, headers = {}) => {
    try {
        return (await request(path, "GET", null, headers)).json();
    } catch (e) {
        return null;
    }
}

// Run a POST request and get the json of the response
export const postRequest = async (path, body = {}, headers = {}) => {
    try {
        return (await request(path, "POST", body, {...headers, "Content-Type": "application/json"})).json();
    } catch (e) {
        return null;
    }
}