import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const userDataFromLS = JSON.parse(localStorage.getItem("usersData")) || [];
    const [userData, setUserData] = useState(userDataFromLS);
    const findCurrentUser = userData.find(user=>user.isAuth);


    const handelUserData = (newUser) => {
        setUserData([...userData, newUser])
    }

    const handelingLogout = () =>{
        const newUpdatedData = userData.map(singleUserData=>{
            if(singleUserData.isAuth){
                return {...findCurrentUser, isAuth : false}
            }else{
                return singleUserData
            }
        })
        setUserData(newUpdatedData)
    }



    const updateUserData = (data) =>{
        const updatedData = {...findCurrentUser, data : [data, ...findCurrentUser.data]}   
        const newUpdatedData = userData.map(singleUserData=>{
            if(singleUserData.isAuth){
                return updatedData
            }else{
                return singleUserData
            }
        })
        setUserData(newUpdatedData)
    }


    useEffect(() => {
        localStorage.setItem("usersData", JSON.stringify(userData))
    }, [userData])
    return (
        <AuthContext.Provider value={{ userData, handelUserData, setUserData, updateUserData, handelingLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider