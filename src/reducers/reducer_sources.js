/**
 * @author Philip Van Raalte
 * @date 2017-07-15.
 */
import {GET_SOURCES} from '../actions';

export default function (state = {}, action) {
    switch (action.type){
        case GET_SOURCES:
            return action.payload.data;
        default:
            return state;
    }
}