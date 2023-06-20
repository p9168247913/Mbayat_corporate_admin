import { ADD__TWEET__DATA, TWEET__ERROR, TWEET__REQUEST, TWEET__SUCCESS } from "./actionType.tweet";

const initialState = {
    isLoading: false,
    isError: false,
    twwetsData: []
}


export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case TWEET__REQUEST:
            return { ...state, isLoading: true }

        case TWEET__SUCCESS:
            return { ...state, isLoading: false, twwetsData: payload }

        case TWEET__ERROR:
            return { ...state, isLoading: false, isError: true }

        case ADD__TWEET__DATA:
            return { ...state, isLoading: false, twwetsData: payload, isError : false }

        default:
            return state;
    }
}