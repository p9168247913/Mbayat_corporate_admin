import { USER__ERROR, USER__REQUEST, USER__SUCCESS } from "./actionType.user";
import axios from "axios"

export const getUserRequest = () => ({ type: USER__REQUEST })
export const getUserSuccess = (payload) => ({ type: USER__SUCCESS, payload })
export const getUserError = () => ({ type: USER__ERROR })



export const getUserDataFromAPI = () => (dispatch) => {
    dispatch(getUserRequest())
    return axios.get("/users.json").then(res => {
        dispatch(getUserSuccess(res.data))
    }).catch(err=>{
        dispatch(getUserError())
    })
    
}