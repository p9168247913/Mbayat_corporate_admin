import React, { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getTweetDataFromAPI } from "./redux/tweetData/action.tweet"
import { getUserDataFromAPI } from "./redux/userData/action.user"
import CreateAccount from "./pages/createaccount/CreateAccount"
import PrivateRoutes from "./components/PrivateRoutes"
import SignIn from "./pages/signIn/SignIn"
import Home from "./pages/home/Home"
import "./App.css"

function App() {
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getTweetDataFromAPI())
    dispatch(getUserDataFromAPI())
  }, [])

  return (

    <div>
      <Routes>
        <Route path="/" element={<PrivateRoutes><Home /></PrivateRoutes>} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<CreateAccount />} />
      </Routes>
    </div>
  )
}

export default App
