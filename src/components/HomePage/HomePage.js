import React, { useEffect, useState } from "react"
import axios from "axios"
import "./homepage.css"
import { SavedCities } from "../SavedCities/SavedCities"


export const HomePage = () => {

    //API date format is yyyy-mm-dd

    const [data, setData] = useState({})
    const [location, setLocation] = useState("")
    const [radio, setRadio] = useState("Fahrenheit")


    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            const Url = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=63e8dfb25950499c905233234222405&q=${location}&format=json&num_of_days=5`
            axios.get(Url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
        }
    }

    const searchCity = (event) => {
        if (event === 'click') {
            const Url = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=63e8dfb25950499c905233234222405&q=${location}&format=json&num_of_days=5`
            axios.get(Url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
        }
    }

    const submitSearch = () => {
        const newSearch = {
            location: `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=63e8dfb25950499c905233234222405&q=${location}&format=json&num_of_days=5`,
            userId: parseInt(localStorage.getItem("sunny_customer"))
        }

        const fetchOptions = {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(newSearch)

        }

        return fetch("http://localhost:8088/savedCities", fetchOptions)


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


            <div className="container">

                <div className="top">

                    <div className="location">
                        <h2>{data.data ? data.data.request[0].query : ""}</h2>
                    </div>
                    <div className="currentTemp">
                        <h2>{getTempDisplay()}</h2>
                    </div>
                    <div className="description">
                        <h2>{data.data ? data.data.current_condition[0].weatherDesc[0].value : ""}</h2>
                    </div>

                    <div className="container">


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
                            <br></br>
                            <button onClick={submitSearch} className="saveCity">Save City</button>
                        </div>

                        <div />


                    </div>


                </div>

                <SavedCities />
            </div>


        </>
    )
}
