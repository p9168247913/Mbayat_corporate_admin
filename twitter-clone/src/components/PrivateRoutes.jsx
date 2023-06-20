import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContextProvider';

const PrivateRoutes = ({children}) => {
    const { userData } = useContext(AuthContext);
    const filndCurrentUser = userData.find(user=>user.isAuth)

    if(!filndCurrentUser?.isAuth){
        return <Navigate to="/sign-in"/>
    }
    return children

 
}

export default PrivateRoutes