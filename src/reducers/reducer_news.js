/**
 * @author Philip Van Raalte
 * @date 2017-07-08.
 */

import {GET_NEWS} from '../actions';

export default function (state = {}, action) {
    switch (action.type){
        case GET_NEWS:
            return action.payload.data;
        default:
            return state;
    }
}