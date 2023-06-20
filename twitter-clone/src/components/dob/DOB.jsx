import React, { useEffect, useState } from 'react'
import { InputLabel, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';

const DOB = ({ handleInputChange, errors }) => {
    const years = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
    const monthsName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");
    const [days, setDays] = useState([]);


    function handleMonthChange(event) {
        setMonth(event.target.value);
    }


    function handleYearChange(event) {
        setYear(event.target.value);
    }

    function handelDayChange(event) {
        setDay(event.target.value);
    }

    // This function updates the number of days based on the selected month and year
    function updateDays() {
        const monthIndex = monthsName.indexOf(month);
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);
        setDays(daysArray);
    }

    // Update the number of days whenever the month or year changes
    useEffect(() => {
        updateDays();
    }, [month, year]);


    useEffect(() => {
        handleInputChange({ "day" : day, "month" : month, "year" : year })
    }, [day, month, year])


    return (
        <>
            <div>
                <p className='dob__title'>Date of birth</p>
                <p className='some__desc'>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
            </div>

            <div className='dob__menu'>
                <div>
                    <InputLabel id="demo-simple-select-error-label">Month</InputLabel>
                    <Select
                        className='w-10'
                        labelId="demo-simple-select-error-label"
                        id="demo-simple-select-error"
                        label="Month"
                        value={month}
                        onChange={handleMonthChange}
                        name='month'
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {monthsName.map((monthName, index) => (
                            <MenuItem key={index} value={monthName}>{monthName}</MenuItem>
                        ))}
                    </Select>
                </div>
                <div>
                    <InputLabel id="demo-simple-select-error-label">Day</InputLabel>
                    <Select
                        className='w-5'
                        labelId="demo-simple-select-error-label"
                        id="demo-simple-select-error"
                        label="Day"
                        onChange={handelDayChange}
                        name='day'
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {days.map((day, index) => (
                            <MenuItem key={index} value={day} >{day}</MenuItem>
                        ))}
                    </Select>
                </div>
                <div>
                    <InputLabel id="demo-simple-select-error-label">Year</InputLabel>
                    <Select
                        className='w-7'
                        labelId="demo-simple-select-error-label"
                        id="demo-simple-select-error"
                        label="Year"
                        value={year}
                        onChange={handleYearChange}
                        name='year'
                    >
                        <MenuItem className="menu-items" value=""><em>None</em></MenuItem>
                        {years.map((year, index) => (
                            <MenuItem className="menu-items" value={year} key={index}>{year}</MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
            {errors.dob && <label className='error mt'>{errors.dob}</label>}

        </>
    )
}

export default DOB