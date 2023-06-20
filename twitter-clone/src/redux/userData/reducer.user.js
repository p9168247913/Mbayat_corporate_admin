import { USER__ERROR, USER__REQUEST, USER__SUCCESS } from "./actionType.user";

const initialState = {
    isLoading: false,
    isError: false,
    usersData: []
}


export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case USER__REQUEST:
            return { ...state, isLoading: true }

        case USER__SUCCESS:
            return { ...state, isLoading: false, usersData: payload }

        case USER__ERROR:
            return { ...state, isLoading: false, isError: true }

        default:
            return state;
    }
}