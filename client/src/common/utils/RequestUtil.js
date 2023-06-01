const URL = process.env.NODE_ENV === 'production' ? "https://tools-api.gnmyt.dev/" : "http://localhost:7182/";

// Run a plain request with all default values
export const request = (path, method = "GET", body = {}, headers = {}) => {
    return fetch(URL + path, {headers, method, body: method !== "GET" ? JSON.stringify(body) : undefined});
}

// Run a GET request and get the json of the response
export const jsonRequest = async (path, headers = {}) => {
    try {
        return (await request(path, "GET", null, headers)).json();
    } catch (e) {
        return null;
    }
}