import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import "./SavedCities.css"
import { axios } from "axios"


export const SavedCities = () => {
    const [cities, updateCities] = useState([])
    const history = useHistory()
    const [searchData, updateSearchData] = useState([])
    const [savedCities, setSavedCities] = useState()
    const [cityData, setCityData] = useState([])

    const api = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=63e8dfb25950499c905233234222405&q=${location}&format=json&num_of_days=5`
    const location = ""

    useEffect(
        () => {
            fetch("http://localhost:8088/savedCities")
                .then(res => res.json())
                .then((data) => {
                    updateCities(data)
                })
        },
        []
    )

    // useEffect(
    //     () => {
    //         Promise.all(
    //             cities.map(city => fetch(city.city)
    //                 .then(res => res.json())
    //                 .then(getSavedCities())
    //             )
    //         )
    //             .then(updateSearchData)
    //     },
    //     [cities]
    // )
    const deleteCity = (id) => {
        fetch(`http://localhost:8088/savedCities/${id}`, {
            method: "DELETE"
        })
    }

    return (
        <>


            {
                cities.map(
                    (city) => {
                        console.log(city.city)

                        return <div className="savedCities" key={`city--${city.userId}`}>
                            <p className={`cityCards`}>

                                <div className="savedCityLocation">{city.city ? city.city : ""}</div>

                            </p>
                            <button className="deleteButton" onClick={() => {
                                deleteCity(city.id)
                                window.location.reload(false);
                            }}>Delete</button>

                        </div>

                    }

                )
            }

        </>
    )
}