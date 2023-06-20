import { ADD__TWEET__DATA, TWEET__ERROR, TWEET__REQUEST, TWEET__SUCCESS } from "./actionType.tweet";
import axios from "axios"

export const getFeedRequest = () => ({ type: TWEET__REQUEST })
export const getFeedSuccess = (payload) => ({ type: TWEET__SUCCESS, payload })
export const getFeedError = () => ({ type: TWEET__ERROR })
export const addTweetData = (payload) => ({ type: ADD__TWEET__DATA, payload })


export const getTweetDataFromAPI = () => (dispatch) => {
    dispatch(getFeedRequest())
    return axios.get("/tweet.json").then(res => {
        dispatch(getFeedSuccess(res.data))
    }).catch(err=>{
        dispatch(getFeedError())
    })
    
}

/* 
export const postTweetDataToAPI = (tweetData) => (dispatch) =>{
    dispatch(getFeedRequest())
    return axios.post("/tweet.json", tweetData).then(res=>{
        dispatch(addTweetData(res.data))
    }).catch(err=>{
        console.log(err);
    })
}
*/