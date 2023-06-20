import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import { BsTwitter } from "react-icons/bs"
import { FcGoogle } from "react-icons/fc"
import { AiFillApple } from "react-icons/ai"


import './signin.css'
import { RxCross2 } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContextProvider';


export default function SignIn() {
    const [mobileNumber, setMobileNumber] = useState("");
    const [errors, setErrors] = useState({ userPhone: "" });
    const navigate = useNavigate()
    const { userData, setUserData } = useContext(AuthContext)


    const validateMobile = () => {
        if (!mobileNumber) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                userPhone: "Mobile number is required",
            }));
        } else if (!/^[0-9]+$/.test(mobileNumber)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                userPhone: "Mobile number can only contain digits",
            }));
        } else if (mobileNumber.length !== 10) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                userPhone: "Mobile number should be 10 digits",
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                userPhone: "",
            }));
        }
    };

    const handelValidatidate = () => {
        validateMobile();
        // if there are no errors, submit the form data
        if (!errors.userPhone && mobileNumber) {
            const filndCurrentUser = userData.find(user => user.userPhone === mobileNumber)
            // const updatedUser = {...filndCurrentUser, isAuth : true}
            if (!filndCurrentUser) {
                alert("Mobile number do not match. Please sign up first!")
                navigate("/sign-up");
            } else {
                const updatedUser = userData.map(user => {
                    if (user.userPhone === filndCurrentUser.userPhone) {
                        return { ...user, isAuth: true }
                    } else {
                        return user
                    }
                })
                setUserData(updatedUser)
                navigate("/")
                setMobileNumber("")
            }
        }
    }


    return (
        <section className='signIn__container'>
            <div className='singIn__wrapper'>
                <div className='cancel__icon'>
                    <RxCross2 />
                </div>
                <div className="twitter-icon-container">
                    <BsTwitter className="twitter-icon" />
                </div>

                <div className='all__info__fields'>
                    <div className='title__section'>
                        <p>Sign in to Twitter</p>
                    </div>

                    <div className='btn__container__google_and_apple'>
                        <button variant="contained" className='bticon'>
                            <FcGoogle />
                            <span className="icon-text">Sign in with Google</span>
                        </button>
                        <button variant="contained" className='bticon'>
                            <AiFillApple />
                            <span className="icon-text">Sign in with Apple</span>
                        </button>
                    </div>

                    <div className="or__container">
                        <hr className="hrIS me-3" />
                        <p>or</p>
                        <hr className="hrIS ms-3" />
                    </div>

                    <TextField
                        label="Mobile Number"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="text"
                        className="email-field"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                    />
                    {errors.userPhone && <label className='error mt-1'>{errors.userPhone}</label>}

                    <button className='btn__next' onClick={handelValidatidate}>Next</button>

                    <button className='btnpassword' >
                        <span>Forgot password?</span>
                    </button>

                    <p className='text_center'>Don't have an account? <Link to="/sign-up">Sign up</Link></p>
                </div>

            </div>


        </section>
    )
}