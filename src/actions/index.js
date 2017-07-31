/**
 * Action Index
 *
 * @author Philip Van Raalte
 * @date 2017-07-08.
 *
 * These are the redux actions.
 * They send data from the application to the store.
 */

import axios from 'axios';

//action types
export const GET_NEWS = "get_news";
export const GET_SOURCES = "get_sources";

//API Info
const ROOT_URL = "https://newsapi.org/v1/";
const API_KEY = "";
const SIG = `?apiKey=${API_KEY}`;


//https://newsapi.org/v1/sources?language=en
export function getSources() {
    const requestURL = `${ROOT_URL}sources${SIG}&language=en`;
    const request = axios.get(requestURL);
    return{
        type: GET_SOURCES,
        payload: request
    };
}

//https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=
export function getArticles(source) {
    source = source || "techcrunch";
    const requestURL = `${ROOT_URL}articles${SIG}&source=${source}`;
    const request = axios.get(requestURL);
    return{
        type: GET_NEWS,
        payload: request
    };
}