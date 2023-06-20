import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField'
import axios from 'axios';
import { Button } from '@mui/material';
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from '../../context/AuthContextProvider';
import DOB from '../../components/dob/DOB';
import "./createAccount.css";

const initailState = {
    isAuth: false,
    userName: "",
    userPhone: "",
    dob: {
        day: "",
        month: "",
        year: "",
    },
    data: []
}

const CreateAccount = () => {
    const [formData, setFormData] = useState(initailState);
    const [errors, setErrors] = useState({ userName: "", userPhone: "", dob: "" });
    const navigate = useNavigate()
    const { handelUserData } = useContext(AuthContext)
    const { twwetsData } = useSelector(state => state.tweet)


    const validateName = () => {
        if (!formData.userName) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                userName: "Name is required",
            }));
        } else if (!/^[a-zA-Z ]+$/.test(formData.userName)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                userName: "Name can only contain letters and spaces",
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                userName: "",
            }));
        }
    };

    const validateMobile = () => {
        if (!formData.userPhone) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                userPhone: "Mobile number is required",
            }));
        } else if (!/^[0-9]+$/.test(formData.userPhone)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                userPhone: "Mobile number can only contain digits",
            }));
        } else if (formData.userPhone.length !== 10) {
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

    const validateDOB = () => {
        const { day, month, year } = formData.dob;

        if (!day || !month || !year) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                dob: "All fields of Date of Birth are required",
            }));
        } else {
            const dob = new Date(`${month}/${day}/${year}`);
            const currentDate = new Date();

            if (dob > currentDate) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    dob: "Date of Birth cannot be in the future",
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    dob: "",
                }));
            }
        }
    };


    // Generate Person Image Automatically
    const generateUserImage = async () => {
        const response = await axios.get("https://randomuser.me/api/");
        const imageUrl = response.data.results[0].picture.large;
        return imageUrl
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        // validate all form fields before submitting
        validateName();
        validateMobile();
        validateDOB();
        generateUserImage().then(res => {
            // if there are no errors, submit the form data
            if ((!errors.userName && formData.userName) && (!errors.userPhone && formData.userPhone) && (!errors.dob && formData.dob)) {
                const rendomNumber = Math.floor(Math.random() * 9000) + 1000
                const userid = formData.userName.split(" ")[0] + rendomNumber
                handelUserData({ ...formData, AvatarImage: res, data : twwetsData, username :  userid})
                setFormData(initailState);
                navigate("/sign-in")
            }
        })
    };


    const handleInputChange = (event) => {
        if (!event.target) {
            setFormData({ ...formData, dob: event })
        } else {
            const { name, value } = event.target;
            setFormData({ ...formData, [name]: value })
        }

    };




    return (
        <section className='creaaccount__container'>
            <div className="userInfo__wrapper">
                <div className='cancel__icon'>
                    <RxCross2 />
                </div>
                <div>
                    <div className='all__info__fields'>
                        <div className='title__section'>
                            <p>Create your account</p>
                        </div>
                        <div className='user__info__field'>
                            <div>
                                <TextField name='userName' fullWidth id="outlined-basic" label="Name" variant="outlined" value={formData.userName} onChange={handleInputChange} />
                                {errors.userName && <label className='error'>{errors.userName}</label>}
                            </div>
                            <div>
                                <TextField name="userPhone" fullWidth id="outlined-basic" label="Phone" variant="outlined" value={formData.userPhone} onChange={handleInputChange} />
                                {errors.userPhone && <label className='error'>{errors.userPhone}</label>}
                            </div>

                            <DOB handleInputChange={handleInputChange} errors={errors} />

                            <Button onClick={handleSubmit} color='primary' sx={{ padding: "10px", bgcolor: 'black', borderRadius: "23px", fontSize: "18px", '&:hover': { bgcolor: 'black' } }} variant="contained">Next</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateAccount