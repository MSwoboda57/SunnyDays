import React, { useState } from "react"
import axios from "axios"
import "./SearchPage.css"
import { useHistory } from "react-router-dom"


export const Searchpage = () => {

    //API date format is yyyy-mm-dd

    const [data, setData] = useState({})
    const [location, setLocation] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [radio, setRadio] = useState("Fahrenheit")

    const history = useHistory()

    const submitSearch = () => {
        const newSearch = {
            date: data.data.weather[0].date,
            location: data.data.request[0].query,
            averageTemp: getTempDisplay(),
            description: data.data.weather[0].hourly[4].weatherDesc[0].value,
            userId: parseInt(localStorage.getItem("sunny_customer"))

        }

        const fetchOptions = {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(newSearch)

        }

        return fetch("http://localhost:8088/savedSearches", fetchOptions)
            .then(() => {
                history.push("savedSearches")
            })

    }

    const getTempDisplay = () => {
        if (data.data && radio === "Celsius") {
            return (data.data.weather[0].avgtempC + "ºC")
        }
        if (data.data) {
            return (data.data.weather[0].avgtempF + "ºF")
        }

        return ""
    }

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            const Url = `http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=63e8dfb25950499c905233234222405&q=${location}&format=json&date=${startDate}&enddate=${endDate}`
            axios.get(Url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
        }
    }
    const searchStartDate = (event) => {
        if (event.key === 'Enter') {
            const Url = `http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=63e8dfb25950499c905233234222405&q=${location}&format=json&date=${startDate}&enddate=${endDate}`
            axios.get(Url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
        }
    }
    const searchEndDate = (event) => {
        if (event.key === 'Enter') {
            const Url = `http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=63e8dfb25950499c905233234222405&q=${location}&format=json&date=${startDate}&enddate=${endDate}`
            axios.get(Url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
        }
    }



    return (
        <>
            <h1 className="heading">Sunny Days</h1>


            <div className="search">
                <input
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    placeholder="Enter Location"
                    type="text" />


            </div>

            <div className="startDate">
                <input
                    value={startDate}
                    onChange={event => setStartDate(event.target.value)}
                    onKeyPress={searchStartDate}
                    placeholder="Enter start date"
                    type="text" />


            </div>

            <div className="endDate">
                <input
                    value={endDate}
                    onChange={event => setEndDate(event.target.value)}
                    onKeyPress={searchEndDate}
                    placeholder="Enter end date"
                    type="text" />


            </div>


            <div className="container">

                <div className="top">

                    <div className="date">
                        <h2>{data.data ? data.data.weather[0].date : ""}</h2>
                    </div>

                    <div className="location">
                        <h2>{data.data ? data.data.request[0].query : ""}</h2>
                    </div>


                    <div className="currentTemp">

                        <h2>{getTempDisplay()}</h2>

                    </div>


                    <div className="description">
                        <h2>{data.data ? data.data.weather[0].hourly[4].weatherDesc[0].value : ""}</h2>
                    </div>




                </div>
                <div className="degrees">
                    <div className="degreeLabel">{radio}</div>

                    <label>Fahrenheit : </label>
                    <input type="radio"
                        checked={radio === "Fahrenheit"}
                        value="Fahrenheit"
                        onChange={(e) => { setRadio(e.target.value) }} />
                    <br></br>
                    <label>Celsius : </label>
                    <input type="radio"
                        checked={radio === "Celsius"}
                        value="Celsius"
                        onChange={(e) => { setRadio(e.target.value) }} />

                </div>
                <br></br>
                <button onClick={submitSearch} className="saveButton">Save Search</button>



            </div>




        </>
    )
}