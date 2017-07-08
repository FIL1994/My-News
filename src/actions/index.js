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

//API Info
const ROOT_URL = "https://newsapi.org/v1/articles";
const API_KEY = "";
const SIG = `?apiKey=${API_KEY}`;

export function getNews() {
    const requestURL = `${ROOT_URL}${SIG}`;
    const request = axios.get(requestURL);
    return{
        type: GET_NEWS,
        payload: request
    };
}